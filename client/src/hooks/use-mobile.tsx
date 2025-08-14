import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : undefined
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout
    const throttledOnChange = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(onChange, 150)
    }
    
    mql.addEventListener("change", throttledOnChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => {
      mql.removeEventListener("change", throttledOnChange)
      clearTimeout(timeoutId)
    }
  }, [])

  return !!isMobile
}
