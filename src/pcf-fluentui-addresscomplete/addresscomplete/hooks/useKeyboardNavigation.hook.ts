import { useState, useRef, useEffect, useCallback } from 'react'
import { addressSuggestionData } from '../model/addressSuggestionData'

export interface IUseKeyboardNavigationOptions {
    open: boolean
    suggestions: addressSuggestionData[] | undefined
    onClose: () => void
    onSelect: (item: addressSuggestionData) => void
}

export interface IUseKeyboardNavigationResult {
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export function useKeyboardNavigation({
    open,
    suggestions,
    onClose,
    onSelect,
}: IUseKeyboardNavigationOptions): IUseKeyboardNavigationResult {
    const [activeIndex, setActiveIndex] = useState(-1)
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    const suggestionCount = suggestions?.length ?? 0

    // Scroll the active suggestion into view on keyboard navigation
    useEffect(() => {
        if (activeIndex < 0) return
        const el = itemsRef.current[activeIndex]
        el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }, [activeIndex])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!open) return
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActiveIndex((i) => Math.min(i + 1, suggestionCount - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActiveIndex((i) => Math.max(i - 1, 0))
            } else if (e.key === 'Enter') {
                e.preventDefault()
                if (activeIndex >= 0 && activeIndex < suggestionCount) {
                    onSelect(suggestions![activeIndex])
                }
            } else if (e.key === 'Escape') {
                onClose()
            }
        },
        [open, activeIndex, suggestionCount, suggestions, onSelect, onClose]
    )

    return { activeIndex, setActiveIndex, handleKeyDown, itemsRef }
}
