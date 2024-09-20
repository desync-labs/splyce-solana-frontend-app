import { FC } from 'react'
import { Box, styled } from '@mui/material'
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form'
import BigNumber from 'bignumber.js'

import { getTokenLogoURL } from '@/utils/tokenLogo'
import { formatNumber } from '@/utils/format'
import { IVault } from '@/utils/TempData'
import { FlexBox } from '@/components/Base/Boxes/StyledBoxes'
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
} from '@/components/Base/Form/StyledForm'
import { BaseInfoIcon } from '@/components/Base/Icons/StyledIcons'

const ManageVaultForm = styled('form')`
  padding-bottom: 0;
`

type VaultDepositFormProps = {
  vaultItemData: IVault
  control: Control<
    {
      deposit: string
      sharedToken: string
    },
    any
  >
  setMax: () => void
  handleSubmit: UseFormHandleSubmit<
    {
      deposit: string
      sharedToken: string
    },
    undefined
  >
  onSubmit: (values: Record<string, any>) => Promise<void>
  isDetailPage?: boolean
}

const DepositVaultForm: FC<VaultDepositFormProps> = ({
  vaultItemData,
  control,
  setMax,
  handleSubmit,
  onSubmit,
  isDetailPage = false,
}) => {
  const { token } = vaultItemData

  return (
    <BaseDialogFormWrapper
      sx={{
        background: isDetailPage ? '#3A4F6A' : '#314156',
        padding: isDetailPage ? '22px 16px' : '16px',
      }}
    >
      <ManageVaultForm
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Controller
          control={control}
          name="deposit"
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <BaseFormInputWrapper>
              <BaseFormLabelRow>
                <BaseFormInputLabel>Deposit {token?.name}</BaseFormInputLabel>
                <FlexBox sx={{ width: 'auto', justifyContent: 'flex-end' }}>
                  <BaseFormWalletBalance>
                    Balance: 111 {token?.name}
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
                  </>
                }
                value={value}
                type="number"
                onChange={onChange}
              />
              <BaseFormInputUsdIndicator>{`$${formatNumber(
                BigNumber(value || 0)
                  .multipliedBy(1)
                  .dividedBy(10 ** 18)
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
          name="sharedToken"
          rules={{
            max: 100,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <BaseFormInputWrapper>
                <BaseFormLabelRow>
                  <BaseFormInputLabel>Receive shares token</BaseFormInputLabel>
                </BaseFormLabelRow>
                <BaseFormTextField
                  error={!!error}
                  id="outlined-helperText"
                  className={isDetailPage ? 'lightBorder' : ''}
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
                            Maximum available share token is 100.
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
      </ManageVaultForm>
    </BaseDialogFormWrapper>
  )
}

export default DepositVaultForm
