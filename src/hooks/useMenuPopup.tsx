import { useEffect, useRef, useState } from 'react'

export default function useMenuPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (e: Event) => {
    if (
      !popupRef.current?.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return { buttonRef, popupRef, isOpen, setIsOpen }
}
