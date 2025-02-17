import React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280

export function useResponsive() {
 const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
 const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)
 const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)
 const [isLargeDesktop, setIsLargeDesktop] = React.useState<boolean | undefined>(undefined)

 React.useEffect(() => {
   const mobileMql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
   const tabletMql = window.matchMedia(
     `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`
   )
   const desktopMql = window.matchMedia(
     `(min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`
   )
   const largeDesktopMql = window.matchMedia(
     `(min-width: ${DESKTOP_BREAKPOINT}px)`
   )

   const onChange = () => {
     const width = window.innerWidth
     setIsMobile(width < MOBILE_BREAKPOINT)
     setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
     setIsDesktop(width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT)
     setIsLargeDesktop(width >= DESKTOP_BREAKPOINT)
   }

   mobileMql.addEventListener("change", onChange)
   tabletMql.addEventListener("change", onChange)
   desktopMql.addEventListener("change", onChange)
   largeDesktopMql.addEventListener("change", onChange)

   onChange()

   return () => {
     mobileMql.removeEventListener("change", onChange)
     tabletMql.removeEventListener("change", onChange)
     desktopMql.removeEventListener("change", onChange)
     largeDesktopMql.removeEventListener("change", onChange)
   }
 }, [])

 return {
   isMobile: !!isMobile,
   isTablet: !!isTablet, 
   isDesktop: !!isDesktop,
   isLargeDesktop: !!isLargeDesktop
 }
}

export function useIsLargeDesktop() {
 const { isLargeDesktop } = useResponsive()
 return isLargeDesktop
}