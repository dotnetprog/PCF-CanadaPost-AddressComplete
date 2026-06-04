import * as React from 'react'
import { makeStyles } from '@fluentui/react-components'
import { HomeFilled } from '@fluentui/react-icons/svg/home'
import { BuildingFilled } from '@fluentui/react-icons/svg/building'
import { addressSuggestionData } from '../model/addressSuggestionData'

const useStyles = makeStyles({
    icon: {
        marginRight: '15px',
        verticalAlign: 'middle',
    },
    description: {
        color: 'grey',
        marginLeft: '6px',
    },
})

export interface ISuggestionOptionProps {
    item: addressSuggestionData
    idx: number
    isActive: boolean
    itemRef: (el: HTMLDivElement | null) => void
    onSelect: (item: addressSuggestionData) => void
    onHover: (idx: number) => void
    activeClass: string
    inactiveClass: string
}

function highlightText(text: string, highlight: string): React.ReactNode {
    if (!highlight) return text

    const ranges = highlight.split(',').map((r) => {
        const [start, end] = r.split('-').map(Number)
        return { start, end }
    })

    const parts: React.ReactNode[] = []
    let cursor = 0

    for (const { start, end } of ranges) {
        if (cursor < start) {
            parts.push(text.slice(cursor, start))
        }
        parts.push(<strong key={start}>{text.slice(start, end + 1)}</strong>)
        cursor = end + 1
    }

    if (cursor < text.length) {
        parts.push(text.slice(cursor))
    }

    return parts
}

export const SuggestionOption: React.FC<ISuggestionOptionProps> = ({
    item,
    idx,
    isActive,
    itemRef,
    onSelect,
    onHover,
    activeClass,
    inactiveClass,
}) => {
    const styles = useStyles()
    const iconStyle = { marginRight: '15px', verticalAlign: 'middle' }
    const icon =
        item.Next === 'Find' ? (
            <BuildingFilled style={iconStyle} />
        ) : (
            <HomeFilled style={iconStyle} />
        )
    return (
        <div
            ref={itemRef}
            role="option"
            aria-selected={isActive}
            onMouseDown={(ev) => {
                // prevent blur before click
                ev.preventDefault()
                onSelect(item)
            }}
            onMouseEnter={() => onHover(idx)}
            className={isActive ? activeClass : inactiveClass}>
            {icon}
            {highlightText(item.Text, item.Highlight)}
            {item.Description && (
                <small className={styles.description}>{item.Description}</small>
            )}
        </div>
    )
}
