import * as React from 'react'
import { Image } from '@fluentui/react-components'

import { FC } from 'react'

interface FlagInfo {
    countrycode: string
    width?: number
    height?: number
}

export const FlagIcon: FC<FlagInfo> = ({
    countrycode,
    width = 20,
    height = 20,
}) => {
    return (
        <Image
            src={`https://flagcdn.com/${countrycode}.svg`}
            style={{ height: height + 'px', width: width + 'px' }}
        />
    )
}
