import { Input, InputProps } from '@fluentui/react-components'
import * as React from 'react'
export type CustomTextboxProps = Partial<Omit<InputProps, 'children'>>

export const CustomTextbox = React.forwardRef<
    HTMLInputElement,
    React.PropsWithChildren<CustomTextboxProps>
>(function CustomTextbox({ children, ...props }, ref) {
    return (
        <div style={{ width: '100%', position: 'relative', display: 'flex' }}>
            <Input {...(props as InputProps)} ref={ref} />
            {children}
        </div>
    )
})
