import { useEffect, RefObject } from 'react'

/**
 * Calls `callback` when a mousedown event occurs outside all provided refs.
 */
export function useClickOutside(
    refs: RefObject<HTMLElement | null>[],
    callback: () => void
): void {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node
            const clickedInside = refs.some((ref) =>
                ref.current?.contains(target)
            )
            if (!clickedInside) {
                callback()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [refs, callback])
}
