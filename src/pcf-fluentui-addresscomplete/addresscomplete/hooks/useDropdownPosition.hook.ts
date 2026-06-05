import { useState, useEffect, RefObject } from 'react'

/**
 * Computes and keeps up-to-date the absolute position of a dropdown
 * anchored below the element referenced by `anchorRef`.
 * Returns an empty object when `open` is false.
 */
export function useDropdownPosition(
    anchorRef: RefObject<HTMLElement | null>,
    open: boolean
): React.CSSProperties {
    const [style, setStyle] = useState<React.CSSProperties>({})

    useEffect(() => {
        if (!open) return

        function updatePosition() {
            const el = anchorRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            setStyle({
                position: 'absolute',
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            })
        }

        updatePosition()
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition, true)
        return () => {
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition, true)
        }
    }, [open, anchorRef])

    return style
}
