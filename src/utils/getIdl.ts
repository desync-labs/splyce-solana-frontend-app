import { Idl } from "@coral-xyz/anchor";
import { defaultNetWork } from "@/utils/network";
import vaultIdl from "@/idls/tokenized_vault.json";
import strategyIdl from "@/idls/strategy_program.json";
import faucetIdl from "@/idls/faucet.json";
import {
  faucetProgramIds,
  strategyProgramIds,
  vaultProgramIds,
} from "@/utils/addresses";

export enum IdlTypes {
  VAULT = "Vault",
  STRATEGY = "Strategy",
  FAUCET = "Faucet",
}

export const getIdl = (typeIdl: IdlTypes): Idl => {
  switch (typeIdl) {
    case IdlTypes.VAULT:
      return { ...vaultIdl, address: vaultProgramIds[defaultNetWork] };
    case IdlTypes.STRATEGY:
      return { ...strategyIdl, address: strategyProgramIds[defaultNetWork] };
    case IdlTypes.FAUCET:
      return { ...faucetIdl, address: faucetProgramIds[defaultNetWork] };
  }
};
