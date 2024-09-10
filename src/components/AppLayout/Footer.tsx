import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

import TelegramSrc from 'assets/svg/socials/telegram.svg'
import TwitterSrc from 'assets/svg/socials/twitter.svg'
import LinkedInSrc from 'assets/svg/socials/linkedln.svg'

const FooterWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  height: 60px;
  background: #1f2632;
  border-top: 1px solid #3a4f6a;
  padding: 0 40px;
`

const LinksWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;

  a {
    font-size: 14px;
    font-weight: 500;
    color: #7b96b5;
    opacity: 1;
    display: flex;
    justify-content: start;
    padding: 0;

    &:hover {
      opacity: 0.8;
    }
  }
`

const SocialLinksWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0;

  & a {
    height: 20px;
  }

  & img {
    height: 20px;
    width: 20px;
  }
`

const Footer = () => {
  return (
    <FooterWrapper component="footer">
      <LinksWrapper>
        <a href={'https://splyce.finance'} rel="noreferrer" target={'_blank'}>
          splyce.fi
        </a>
        <a href={'https://docs.fathom.fi'} rel="noreferrer" target={'_blank'}>
          Docs
        </a>
        <a
          href={'https://docs.fathom.fi/privacy-policy'}
          rel="noreferrer"
          target={'_blank'}
        >
          Privacy Policy
        </a>
        <a
          href={'https://docs.fathom.fi/terms-of-service'}
          rel="noreferrer"
          target={'_blank'}
        >
          Terms of Service
        </a>
        <a
          href={'https://docs.fathom.fi/fxd-deployments'}
          target={'_blank'}
          rel="noreferrer"
        >
          spUSD
        </a>
        <a
          href={'https://docs.fathom.fi/fthm-deployments'}
          target={'_blank'}
          rel="noreferrer"
        >
          SPLY
        </a>
      </LinksWrapper>
      <SocialLinksWrapper>
        <a href={'https://t.me/fathom_fi'} rel="noreferrer" target={'_blank'}>
          <Image
            src={TelegramSrc as string}
            width={20}
            height={20}
            alt={'telegram'}
          />
        </a>
        <a
          href={'https://twitter.com/Fathom_fi'}
          rel="noreferrer"
          target={'_blank'}
        >
          <Image
            src={TwitterSrc as string}
            width={20}
            height={20}
            alt={'twitter'}
          />
        </a>
        <a
          href={'https://www.linkedin.com/company/fathom-protocol/'}
          rel="noreferrer"
          target={'_blank'}
        >
          <Image
            src={LinkedInSrc as string}
            width={20}
            height={20}
            alt={'linked-in'}
          />
        </a>
      </SocialLinksWrapper>
    </FooterWrapper>
  )
}

export default Footer
