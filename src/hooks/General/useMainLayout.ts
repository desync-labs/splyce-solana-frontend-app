import { useCallback, useEffect, useState, MouseEvent } from 'react'
import useSharedContext from '@/context/shared'

const useMainLayout = () => {
  const { isMobile } = useSharedContext()

  const [openMobile, setOpenMobile] = useState<boolean>(false)
  // const [scroll, setScroll] = useState<number>(0)
  //
  // const drawerRef = useRef<HTMLDivElement | null>(null)
  //
  // const toggleDrawer = useCallback(() => {
  //   setOpen(!open)
  // }, [open, setOpen])
  //
  // const scrollHandler = useCallback(() => {
  //   setScroll(window.scrollY)
  // }, [setScroll])

  // useEffect(() => {
  //   const clientHeight =
  //     drawerRef?.current?.querySelector('.MuiPaper-root')?.clientHeight
  //   if (
  //     BigNumber(clientHeight as number).isLessThan(580) ||
  //     isTablet ||
  //     isMobile
  //   ) {
  //     setOpen(false)
  //     setShowToggleDrawerBtn(false)
  //   } else {
  //     setShowToggleDrawerBtn(true)
  //     setOpen(true)
  //   }
  // }, [isTablet, isMobile, width, height, setOpen, setShowToggleDrawerBtn])
  //
  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return () => {
  //     document.removeEventListener('scroll', scrollHandler)
  //   }
  // }, [scrollHandler])

  useEffect(() => {
    if (isMobile) {
      const inputs = document.querySelectorAll('input[type="number"]')
      for (let i = inputs.length; i--; ) {
        inputs[i].setAttribute('pattern', '\\d*')
      }
    }
  }, [isMobile])

  const mainBlockClickHandler = useCallback(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false)
    }
  }, [isMobile, openMobile, setOpenMobile])

  const openMobileMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      event.preventDefault()

      setOpenMobile(true)
    },
    [setOpenMobile]
  )

  return {
    openMobile,
    mainBlockClickHandler,
    openMobileMenu,
    setOpenMobile,
  }
}

export default useMainLayout
