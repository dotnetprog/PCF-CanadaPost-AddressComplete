import * as React from 'react'
import { Option } from '@fluentui/react-components'
import { FlagIcon } from './FlagIcon'

export interface CountryPickerOptionProps {
    flagISO: string
    text: string
}

export const CountryPickerOption: React.FC<CountryPickerOptionProps> = (
    props: CountryPickerOptionProps
): JSX.Element => {
    return (
        <Option value={props.flagISO} text={props.text} checkIcon={null}>
            <FlagIcon
                countrycode={props.flagISO.toString().toLowerCase()}
                width={25}
            />
            {props.text}
        </Option>
    )
}
