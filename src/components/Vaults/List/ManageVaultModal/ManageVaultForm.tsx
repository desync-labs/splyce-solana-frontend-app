import { FC, memo } from 'react'
import { Box, styled } from '@mui/material'
import BigNumber from 'bignumber.js'
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form'

import { FormType } from '@/hooks/Vaults/useVaultManageDeposit'
import { getTokenLogoURL } from '@/utils/tokenLogo'
import { formatNumber } from '@/utils/format'
import { IVault, IVaultPosition } from '@/utils/TempData'

import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
import { BaseInfoIcon } from '@/components/Base/Icons/StyledIcons'
import {
  BaseDialogFormWrapper,
  BaseFormInputErrorWrapper,
  BaseFormInputLabel,
  BaseFormInputLogo,
  BaseFormInputUsdIndicator,
  BaseFormInputWrapper,
  BaseFormLabelRow,
  BaseFormSetMaxButton,
  BaseFormTextField,
  BaseFormWalletBalance,
} from 'components/Base/Form/StyledForm'

const ManageVaultFormStyled = styled('form')`
  padding-bottom: 0;
`

type VaultManageFormProps = {
  vaultItemData: IVault
  vaultPosition: IVaultPosition
  balanceToken: string
  walletBalance: string
  control: Control<
    {
      formToken: string
      formSharedToken: string
    },
    any
  >
  formType: FormType
  setMax: () => void
  handleSubmit: UseFormHandleSubmit<
    {
      formToken: string
      formSharedToken: string
    },
    undefined
  >
  onSubmit: (values: Record<string, any>) => Promise<void>
}

const ManageVaultForm: FC<VaultManageFormProps> = ({
  vaultItemData,
  walletBalance,
  control,
  formType,
  setMax,
  handleSubmit,
  onSubmit,
  dataTestIdPrefix,
}) => {
  const { token } = vaultItemData
  const fxdPrice = 1

  return (
    <BaseDialogFormWrapper>
      <ManageVaultFormStyled
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Controller
          control={control}
          name="formToken"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <BaseFormInputWrapper>
              <BaseFormLabelRow>
                <BaseFormInputLabel>
                  {formType === FormType.DEPOSIT
                    ? `Deposit ${token?.name}`
                    : `Withdraw ${token?.name}`}
                </BaseFormInputLabel>
                <FlexBox sx={{ width: 'auto', justifyContent: 'flex-end' }}>
                  <BaseFormWalletBalance>
                    {formType === FormType.DEPOSIT
                      ? 'Balance: ' +
                        formatNumber(BigNumber(walletBalance).toNumber()) +
                        ' ' +
                        token?.name
                      : 'Vault Available: ' +
                        formatNumber(22) +
                        ' ' +
                        token?.name}
                  </BaseFormWalletBalance>
                </FlexBox>
              </BaseFormLabelRow>
              <BaseFormTextField
                error={!!error}
                id="outlined-helperText"
                placeholder={'0'}
                helperText={
                  <>
                    {error && error.type === 'required' && (
                      <BaseFormInputErrorWrapper>
                        <BaseInfoIcon
                          sx={{
                            float: 'left',
                            width: '14px',
                            height: '14px',
                            marginRight: '0',
                          }}
                        />
                        <Box
                          component={'span'}
                          sx={{ fontSize: '12px', paddingLeft: '6px' }}
                        >
                          This field is required
                        </Box>
                      </BaseFormInputErrorWrapper>
                    )}
                    {error && error.type === 'min' && (
                      <BaseFormInputErrorWrapper>
                        <BaseInfoIcon
                          sx={{
                            float: 'left',
                            width: '14px',
                            height: '14px',
                            marginRight: '0',
                          }}
                        />
                        <Box
                          component={'span'}
                          sx={{ fontSize: '12px', paddingLeft: '6px' }}
                        >
                          This field should be positive.
                        </Box>
                      </BaseFormInputErrorWrapper>
                    )}
                  </>
                }
                value={value}
                type="number"
                onChange={onChange}
              />
              <BaseFormInputUsdIndicator>{`$${formatNumber(
                BigNumber(value || 0)
                  .multipliedBy(fxdPrice)
                  .toNumber()
              )}`}</BaseFormInputUsdIndicator>
              <BaseFormInputLogo
                className={'extendedInput'}
                src={getTokenLogoURL(token?.name)}
                alt={token?.name}
              />
              <BaseFormSetMaxButton onClick={() => setMax()}>
                Max
              </BaseFormSetMaxButton>
            </BaseFormInputWrapper>
          )}
        />
        <Controller
          control={control}
          name="formSharedToken"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <BaseFormInputWrapper>
                <BaseFormLabelRow>
                  <BaseFormInputLabel>
                    {formType === FormType.DEPOSIT
                      ? 'Receive shares token'
                      : 'Burn Shares token'}
                  </BaseFormInputLabel>
                </BaseFormLabelRow>
                <BaseFormTextField
                  error={!!error}
                  id="outlined-helperText"
                  helperText={
                    <>
                      {error && error.type === 'max' && (
                        <BaseFormInputErrorWrapper>
                          <BaseInfoIcon
                            sx={{
                              float: 'left',
                              width: '14px',
                              height: '14px',
                              marginRight: '0',
                            }}
                          />
                          <Box
                            component={'span'}
                            sx={{ fontSize: '12px', paddingLeft: '6px' }}
                          >
                            Maximum available share token is 10 .
                          </Box>
                        </BaseFormInputErrorWrapper>
                      )}
                    </>
                  }
                  value={value}
                  type="number"
                  placeholder={'0'}
                  onChange={onChange}
                  disabled
                />
                <BaseFormInputLogo src={getTokenLogoURL('FXD')} />
              </BaseFormInputWrapper>
            )
          }}
        />
      </ManageVaultFormStyled>
    </BaseDialogFormWrapper>
  )
}

export default memo(ManageVaultForm)
