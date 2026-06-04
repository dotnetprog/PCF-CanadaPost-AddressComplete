import * as React from 'react'
import { Country } from '../services/CountryManager'
import {
    makeStyles,
    useId,
    Combobox,
    OptionOnSelectData,
    SelectionEvents,
} from '@fluentui/react-components'
import { FlagIcon } from './FlagIcon'
import { useCountrySelectors } from '../hooks/useCountrySelectors.hook'
import { CountryPickerOption } from './CountryPickerOption'

const useStyles = makeStyles({
    root: {
        // Stack the label above the field with a gap
        display: 'grid',
        justifyItems: 'start',
        gap: '20px',
    },
    field: {
        display: 'grid',
        justifyItems: 'start',
        gap: '2px',
    },
    selectedPreview: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    selectedText: {
        fontSize: '14px',
    },
    inline: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    comboWrapper: {
        flex: 1,
        minWidth: 0,
    },
})

export interface CountryListComboBoxProps {
    defaultvalue?: Country
    onCountrySelect: (value?: Country) => void
}
function filterCountry(c: Country, searchTerm: string) {
    return searchTerm !== ''
        ? c.Name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
}
export const CountryListComboBox: React.FC<CountryListComboBoxProps> = (
    props
) => {
    const { CountriesList, getCountryByCode } = useCountrySelectors()
    const [filter, setFilter] = React.useState('')
    const comboId = useId()
    const styles = useStyles()
    const [selectedCountry, setSelectedCountry] = React.useState<
        Country | undefined
    >(props.defaultvalue)
    const onOptionSelect = React.useCallback(
        (event: SelectionEvents, data: OptionOnSelectData) => {
            const found = data.optionValue
                ? getCountryByCode(data.optionValue)
                : undefined
            setSelectedCountry(found)
            setFilter('')
            props.onCountrySelect(found)
        },
        []
    )
    const captureUserInputHandler = React.useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            const target = event.target as HTMLInputElement
            setFilter(target.value)
        },
        []
    )
    return (
        <div className={styles.root}>
            <div className={styles.field}>
                <div className={styles.inline}>
                    {selectedCountry && (
                        <div className={styles.selectedPreview}>
                            <FlagIcon
                                countrycode={selectedCountry.ISOCode.toString().toLowerCase()}
                                width={25}
                            />
                        </div>
                    )}
                    <div className={styles.comboWrapper}>
                        <Combobox
                            id={`${comboId}-combo`}
                            defaultValue={props.defaultvalue?.Name}
                            onOptionSelect={onOptionSelect}
                            onInput={captureUserInputHandler}
                            style={{
                                maxWidth: 100,
                                minWidth: 50,
                                border: 'none',
                            }}
                            input={{
                                style: {
                                    maxWidth: 75,
                                    minWidth: 50,
                                    border: 'none',
                                },
                            }}>
                            {CountriesList.filter((c) =>
                                filterCountry(c, filter)
                            ).map((country, idx) => {
                                return (
                                    <CountryPickerOption
                                        flagISO={country.ISOCode}
                                        text={country.Name}
                                        key={country.ISOCode}
                                    />
                                )
                            })}
                        </Combobox>
                    </div>
                </div>
            </div>
        </div>
    )
}
