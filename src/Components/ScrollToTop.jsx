// Components/ScrollToTop.jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top smoothly when location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // You can also use 'instant' for immediate scroll
    })
  }, [location.pathname])

  return children || null
}

export default ScrollToTop
