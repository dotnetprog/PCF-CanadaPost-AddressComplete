import * as React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { makeStyles, Portal, useId } from '@fluentui/react-components'
import { SearchRegular } from '@fluentui/react-icons/svg/search'
import { addressDetailData } from '../model/addressDetailData'
import { addressSuggestionData } from '../model/addressSuggestionData'
import { Country } from '../services/CountryManager'
import { useCountrySelectors } from '../hooks/useCountrySelectors.hook'
import { useAddressSuggestions } from '../hooks/useAddressSuggestions.hook'
import { useClickOutside } from '../hooks/useClickOutside.hook'
import { useDropdownPosition } from '../hooks/useDropdownPosition.hook'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation.hook'
import { useCanadaPostService } from './CanadapostApiServiceProvider'
import { ClearButton } from './ClearButton'
import { CountryListComboBox } from './CountryListComboBox'
import { CustomTextbox } from './CustomTextbox'
import { SuggestionOption } from './SuggestionOption'

// --- Styles

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

// --- Types

export interface IAddressCompleteSearchFieldProps {
    placeholderTerm: string
    onSelectedAddress: (selectedAddress?: addressDetailData) => void
}

// --- Component

export const AddressCompleteSearchField: React.FC<
    IAddressCompleteSearchFieldProps
> = ({ placeholderTerm, onSelectedAddress }) => {
    const classes = useStyles()
    const id = useId()

    // --- Services & selectors

    const addressService = useCanadaPostService()
    const { defaultCountry } = useCountrySelectors()

    // --- State & refs

    const [query, setQuery] = useState<string | undefined>('')
    const [country, setCountry] = useState<Country | undefined>(defaultCountry)
    const [selectedSuggestion, setSelectedSuggestion] = useState<
        addressSuggestionData | undefined
    >(undefined)
    const [open, setOpen] = useState(false)

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    // --- Handlers
    // Declared before hooks that depend on them to avoid circular references.

    const clearTextField = useCallback(() => {
        setQuery('')
        setSelectedSuggestion(undefined)
    }, [])

    // activeIndex is reset to -1 by the open/close effect below whenever
    // query or suggestions change, so it does not need to be reset here.
    const select = useCallback((value: addressSuggestionData) => {
        setQuery(value.Text)
        setSelectedSuggestion(value)
        inputRef.current?.focus()
    }, [])

    // --- Derived values

    const { data: suggestions } = useAddressSuggestions(
        query,
        country?.ISOCode,
        selectedSuggestion
    )
    const suggestionCount = suggestions?.length ?? 0
    const dropdownStyle = useDropdownPosition(inputRef, open)
    const { activeIndex, setActiveIndex, handleKeyDown, itemsRef } =
        useKeyboardNavigation({
            open,
            suggestions,
            onClose: () => setOpen(false),
            onSelect: select,
        })

    // --- Effects

    useClickOutside([wrapperRef, dropdownRef], () => setOpen(false))

    // Open/close dropdown based on query and suggestion results.
    // Also resets activeIndex to -1 after every selection or query change.
    useEffect(() => {
        if (!query) {
            setOpen(false)
            setActiveIndex(-1)
            return
        }
        setOpen(suggestionCount > 0)
        setActiveIndex(-1)
    }, [query, suggestions])

    // Retrieve full address detail when a final suggestion is selected
    useEffect(() => {
        if (!selectedSuggestion || selectedSuggestion.Next !== 'Retrieve')
            return

        const doRetrieve = async () => {
            const detail = await addressService.retrieveAddressDetail(
                selectedSuggestion.Id
            )
            onSelectedAddress(detail)
            clearTextField()
        }
        doRetrieve()
    }, [selectedSuggestion, addressService, onSelectedAddress, clearTextField])

    // --- Render

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
