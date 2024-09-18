import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


export const useTabFromUrlParams = () => {
  const [currentTab, setCurrentTab] = useState("")
  const { search } = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(search)
    const tabFromUrlParams = urlParams.get("tab")
    if (tabFromUrlParams) {
      setCurrentTab(tabFromUrlParams)
    }
  }, [search])

  return currentTab
}
