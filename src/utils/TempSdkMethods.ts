import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import { Wallet } from '@solana/wallet-adapter-react'
import { defaultEndpoint } from '@/utils/network'
import vaultIdl from '@/idls/tokenized_vault.json'
import strategyIdl from '@/idls/strategy_program.json'
import faucetIdl from '@/idls/faucet.json'

export const getUserTokenBalance = async (
  publicKey: PublicKey,
  tokenMintAddress: string
) => {
  if (!tokenMintAddress || !publicKey) {
    return
  }

  const connection = new Connection(defaultEndpoint)
  const tokenMintPublicKey = new PublicKey(tokenMintAddress)

  try {
    // Associated Token Accounts
    const accounts = await connection.getTokenAccountsByOwner(publicKey, {
      mint: tokenMintPublicKey,
    })

    if (accounts.value.length > 0) {
      const associatedTokenAccountPubKey = accounts.value[0].pubkey
      const tokenAccountInfo = await getAccount(
        connection,
        associatedTokenAccountPubKey,
        'processed'
      )

      return tokenAccountInfo.amount.toString()
    } else {
      return 0
    }
  } catch (error) {
    console.error('Error getting token balance:', error)
    return 0
  }
}

export const depositTokens = async (
  userPublicKey: PublicKey,
  amount: string,
  wallet: Wallet,
  tokenPubKey: PublicKey,
  shareTokenPubKey: PublicKey,
  vaultIndex: number
) => {
  if (!userPublicKey || !wallet) {
    return
  }

  const provider = new AnchorProvider(
    new Connection(defaultEndpoint, 'confirmed'),
    wallet.adapter,
    {
      preflightCommitment: 'confirmed',
    }
  )

  const vaultProgram = new Program(vaultIdl, provider)

  const vaultPDA = await PublicKey.findProgramAddressSync(
    [
      Buffer.from('vault'),
      Buffer.from(
        new Uint8Array(new BigUint64Array([BigInt(vaultIndex)]).buffer)
      ),
    ],
    vaultProgram.programId
  )[0]

  const userTokenAccount = await findOrCreateTokenAccountByOwner(
    userPublicKey,
    tokenPubKey,
    wallet
  )

  const userSharesAccount = await findOrCreateTokenAccountByOwner(
    userPublicKey,
    shareTokenPubKey,
    wallet
  )

  try {
    const tx = new Transaction().add(
      await vaultProgram.methods
        .deposit(new BN(amount))
        .accounts({
          vault: vaultPDA,
          user: userPublicKey,
          userTokenAccount: userTokenAccount,
          userSharesAccount: userSharesAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction()
    )

    // Send Tx
    return await provider.sendAndConfirm(tx)
  } catch (err) {
    console.error('Error deposit tx:', err)
  }
}

export const withdrawTokens = async (
  userPublicKey: PublicKey,
  amount: string,
  wallet: Wallet,
  tokenPubKey: PublicKey,
  shareTokenPubKey: PublicKey,
  vaultIndex: number
) => {
  if (!userPublicKey || !wallet) {
    return
  }

  const provider = new AnchorProvider(
    new Connection(defaultEndpoint, 'confirmed'),
    wallet.adapter,
    {
      preflightCommitment: 'confirmed',
    }
  )

  const vaultProgram = new Program(vaultIdl, provider)
  const strategyProgram = new Program(strategyIdl, provider)

  const vaultPDA = await PublicKey.findProgramAddressSync(
    [
      Buffer.from('vault'),
      Buffer.from(
        new Uint8Array(new BigUint64Array([BigInt(vaultIndex)]).buffer)
      ),
    ],
    vaultProgram.programId
  )[0]

  const strategyPDA = await PublicKey.findProgramAddressSync(
    [vaultPDA.toBuffer(), Buffer.from(new Uint8Array([0]))],
    strategyProgram.programId
  )[0]

  const userTokenAccount = await findOrCreateTokenAccountByOwner(
    userPublicKey,
    tokenPubKey,
    wallet
  )

  const userSharesAccount = await findOrCreateTokenAccountByOwner(
    userPublicKey,
    shareTokenPubKey,
    wallet
  )

  const strategyTokenAccount = await PublicKey.findProgramAddressSync(
    [Buffer.from('underlying'), strategyPDA.toBuffer()],
    strategyProgram.programId
  )[0]

  const remainingAccountsMap = {
    accountsMap: [
      {
        strategyAcc: new BN(0),
        strategyTokenAccount: new BN(1),
        remainingAccountsToStrategies: [new BN(0)],
      },
    ],
  }

  try {
    const tx = new Transaction().add(
      await vaultProgram.methods
        .withdraw(new BN(amount), new BN(10000), remainingAccountsMap)
        .accounts({
          vault: vaultPDA,
          user: userPublicKey,
          userTokenAccount: userTokenAccount,
          userSharesAccount: userSharesAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          strategyProgram: strategyProgram.programId,
        })
        .remainingAccounts([
          {
            pubkey: strategyPDA,
            isWritable: true,
            isSigner: false,
          },
          { pubkey: strategyTokenAccount, isWritable: true, isSigner: false },
        ])
        .instruction()
    )

    // Send Tx
    const signature = await provider.sendAndConfirm(tx)
    console.log('Withdraw tx successes:', signature)
    return signature
  } catch (err) {
    console.error('Error deposit tx:', err)
  }
}

export const findOrCreateTokenAccountByOwner = async (
  userPubKey: PublicKey,
  tokenMintPublicKey: PublicKey,
  wallet: Wallet
) => {
  const connection = new Connection(defaultEndpoint)
  try {
    // Associated Token Accounts
    const accounts = await connection.getTokenAccountsByOwner(userPubKey, {
      mint: tokenMintPublicKey,
    })

    if (accounts.value.length > 0) {
      return accounts.value[0].pubkey
    } else {
      return await createTokenAccount(userPubKey, tokenMintPublicKey, wallet)
    }
  } catch (error) {
    console.error('Error getting token account:', error)
    return
  }
}

export const createTokenAccount = async (
  userPubKey: PublicKey,
  tokenMintPublicKey: PublicKey,
  wallet: Wallet
) => {
  try {
    const connection = new Connection(defaultEndpoint)
    const provider = new AnchorProvider(connection, wallet.adapter, {
      preflightCommitment: 'confirmed',
    })

    const associatedTokenAddress = await getAssociatedTokenAddress(
      tokenMintPublicKey,
      userPubKey
    )

    const accountInfo = await connection.getParsedAccountInfo(
      associatedTokenAddress
    )
    if (accountInfo.value !== null) {
      console.log(
        `Token Account already exist: ${associatedTokenAddress.toBase58()}`
      )
      return associatedTokenAddress
    }

    // Create new token account
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        userPubKey, // Payer
        associatedTokenAddress,
        userPubKey, // token account owner
        tokenMintPublicKey
      )
    )

    const latestBlockhash = await connection.getLatestBlockhash()
    transaction.recentBlockhash = latestBlockhash.blockhash

    transaction.feePayer = userPubKey

    // Sign transaction
    const signedTransaction = await provider.sendAndConfirm(transaction)

    console.log(`Token account created: ${signedTransaction}`)
    return associatedTokenAddress
  } catch (error) {
    console.error('Error creation new token account:', error)
  }
}

export const previewRedeem = async (shareBalance: string, vaultId: string) => {
  // todo: implement preview redeem from program
  return shareBalance
}

export const previewDeposit = async (tokenAmount: string, vaultId: string) => {
  // todo: implement preview deposit from program
  return tokenAmount
}

export const previewWithdraw = async (tokenAmount: string, vaultId: string) => {
  // todo: implement preview withdraw from program
  return tokenAmount
}

export const getTransactionBlock = async (signature: string) => {
  const connection = new Connection(defaultEndpoint)

  try {
    const transaction = await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    })
    if (!transaction) {
      return
    }
    return transaction.slot
  } catch (error) {
    console.error('Error getting transaction block:', error)
    return
  }
}

export const faucetTestToken = async (
  userPubKey: PublicKey,
  tokenPubKey: PublicKey,
  wallet: Wallet
) => {
  if (!userPubKey || !wallet || !tokenPubKey) {
    return
  }

  const connection = new Connection(defaultEndpoint)
  const provider = new AnchorProvider(connection, wallet.adapter, {
    preflightCommitment: 'confirmed',
  })

  const faucetProgram = new Program(faucetIdl, provider)

  const faucetData = new PublicKey(
    'GhHAUWzijk3e3pUTJbwAFjU3v51hkrpujnEhhnxtp8Q7'
  )

  const faucetTokenAccount = new PublicKey(
    'EjQxPWRJPvLFcPj4LomBwCpWxKYuig8jggVFhUq1qYQv'
  )

  const userTokenAccount = await findOrCreateTokenAccountByOwner(
    userPubKey,
    tokenPubKey,
    wallet
  )

  try {
    const tx = new Transaction().add(
      await faucetProgram.methods
        .sendTokens()
        .accounts({
          faucetData: faucetData,
          tokenAccount: faucetTokenAccount,
          recipient: userTokenAccount,
          signer: userPubKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction()
    )

    // Send Tx
    return await provider.sendAndConfirm(tx)
  } catch (err) {
    console.error('Error deposit tx:', err)
  }
}

export const getTfVaultPeriods = async (wallet: Wallet, vaultIndex: number) => {
  const provider = new AnchorProvider(
    new Connection(defaultEndpoint, 'confirmed'),
    wallet.adapter,
    {
      preflightCommitment: 'confirmed',
    }
  )

  const vaultProgram = new Program(vaultIdl, provider)
  const strategyProgram = new Program(strategyIdl, provider)

  const vaultPDA = await PublicKey.findProgramAddressSync(
    [
      Buffer.from('vault'),
      Buffer.from(
        new Uint8Array(new BigUint64Array([BigInt(vaultIndex)]).buffer)
      ),
    ],
    vaultProgram.programId
  )[0]

  const strategyPDA = await PublicKey.findProgramAddressSync(
    [vaultPDA.toBuffer(), Buffer.from(new Uint8Array([0]))],
    strategyProgram.programId
  )[0]

  const strategyAccount =
    await strategyProgram.account.tradeFintechStrategy.fetch(strategyPDA)
  const depositPeriodEnds = strategyAccount.depositPeriodEnds
  const lockPeriodEnds = strategyAccount.lockPeriodEnds

  return {
    depositPeriodEnds,
    lockPeriodEnds,
  }
}
