import * as React from 'react'
import { Button, ButtonProps } from '@fluentui/react-components'
import { DismissRegular } from '@fluentui/react-icons/svg/dismiss'

export const ClearButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            {...props}
            appearance="transparent"
            size="small"
            icon={<DismissRegular />}
        />
    )
}
