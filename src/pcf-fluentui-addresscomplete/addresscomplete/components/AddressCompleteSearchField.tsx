import { addressDetailData } from '../model/addressDetailData'
import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { SearchRegular } from '@fluentui/react-icons/svg/search'
import { DismissRegular } from '@fluentui/react-icons/svg/dismiss'
import { useCountrySelectors } from '../hooks/useCountrySelectors.hook'
import { Country } from '../services/CountryManager'
import { addressSuggestionData } from '../model/addressSuggestionData'
import { useAddressSuggestions } from '../hooks/useAddressSuggestions.hook'
import {
    Button,
    ButtonProps,
    makeStyles,
    Portal,
    useId,
} from '@fluentui/react-components'
import { CountryListComboBox } from './CountryListComboBox'
import { CustomTextbox } from './CustomTextbox'
import { SuggestionOption } from './SuggestionOption'
import { useCanadaPostService } from './CanadapostApiServiceProvider'
const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
        display: 'flex',
    },
    input: {
        width: '100%',
    },
    dropdown: {
        position: 'absolute',
        zIndex: 9999,
        left: 0,
        right: 0,
        background: 'white',
        border: '1px solid rgba(0,0,0,0.12)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        maxHeight: '220px',
        overflowY: 'auto',
    },
    item: {
        cursor: 'pointer',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '12px',
        paddingLeft: '12px',
    },
    itemActive: {
        cursor: 'pointer',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingRight: '12px',
        paddingLeft: '12px',
        backgroundColor: 'rgba(0,120,212,0.08)',
    },
})
const ClearButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            {...props}
            appearance="transparent"
            size="small"
            icon={<DismissRegular />}></Button>
    )
}
export interface IAddressCompleteSearchFieldProps {
    placeholderTerm: string
    onSelectedAddress: (selectedAddress?: addressDetailData) => void
}

export const AddressCompleteSearchField: React.FC<
    IAddressCompleteSearchFieldProps
> = ({ placeholderTerm, onSelectedAddress }) => {
    const { defaultCountry } = useCountrySelectors()
    const addressService = useCanadaPostService()
    const [query, setQuery] = useState<string | undefined>('')
    const [country, setCountry] = useState<Country | undefined>(defaultCountry)
    const [selectedSuggestion, setSelectedSuggestion] = useState<
        addressSuggestionData | undefined
    >(undefined)
    const { data: suggestions } = useAddressSuggestions(
        query,
        country?.ISOCode,
        selectedSuggestion
    )
    const suggestionCount = suggestions?.length ?? 0
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
    const id = useId()
    useEffect(() => {
        if (!selectedSuggestion || selectedSuggestion.Next !== 'Retrieve') {
            return
        }
        const doRetrieve = async () => {
            const detail = await addressService.retrieveAddressDetail(
                selectedSuggestion.Id
            )
            onSelectedAddress(detail)
            clearTextField()
        }
        doRetrieve()
    }, [selectedSuggestion])
    useEffect(() => {
        if (!query) {
            setOpen(false)
            setActiveIndex(-1)
            return
        }

        setOpen(suggestionCount > 0)
        setActiveIndex(-1)
    }, [query, suggestions])
    const clearTextField = React.useCallback(() => {
        setQuery('')
        setSelectedSuggestion(undefined)
    }, [])
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node
            const clickedInsideWrapper = wrapperRef.current?.contains(target)
            const clickedInsideDropdown = dropdownRef.current?.contains(target)
            if (!clickedInsideWrapper && !clickedInsideDropdown) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!open) return
        console.log(e.key)
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => Math.min(i + 1, suggestionCount - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (activeIndex >= 0 && activeIndex < suggestionCount) {
                select(suggestions![activeIndex])
            }
        } else if (e.key === 'Escape') {
            setOpen(false)
        }
    }
    function select(value: addressSuggestionData) {
        setQuery(value.Text)
        setSelectedSuggestion(value)
        setActiveIndex(-1)
        // move focus back to input
        inputRef.current?.focus()
    }
    // keep the active item visible when navigating
    useEffect(() => {
        if (activeIndex >= 0) {
            const el = itemsRef.current[activeIndex]
            if (el && typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }
        }
    }, [activeIndex])
    // compute and set dropdown position when open or input moves/resizes
    useEffect(() => {
        if (!open) return

        function updatePosition() {
            const el = inputRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            setDropdownStyle({
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
    }, [open, suggestions])
    const classes = useStyles()
    return (
        <div ref={wrapperRef} className={classes.root}>
            <CountryListComboBox
                defaultvalue={defaultCountry}
                onCountrySelect={setCountry}
            />
            <CustomTextbox
                contentBefore={<SearchRegular />}
                contentAfter={
                    query && query.length > 0 ? (
                        <ClearButton onClick={clearTextField} />
                    ) : undefined
                }
                placeholder={placeholderTerm}
                value={query}
                id={id}
                onChange={(e, d) => setQuery(d.value)}
                onKeyDown={handleKeyDown}
                className={classes.input}
                ref={(el: HTMLInputElement | null) => {
                    inputRef.current = el
                }}
                aria-label="Address">
                {open && (
                    <Portal>
                        <div
                            ref={dropdownRef}
                            role="listbox"
                            aria-label="Address suggestions"
                            className={classes.dropdown}
                            style={dropdownStyle}>
                            {suggestions?.map((item, idx) => (
                                <SuggestionOption
                                    key={idx}
                                    item={item}
                                    idx={idx}
                                    isActive={activeIndex === idx}
                                    itemRef={(el) =>
                                        (itemsRef.current[idx] = el)
                                    }
                                    onSelect={select}
                                    onHover={setActiveIndex}
                                    activeClass={classes.itemActive}
                                    inactiveClass={classes.item}
                                />
                            ))}
                        </div>
                    </Portal>
                )}
            </CustomTextbox>
        </div>
    )
}
