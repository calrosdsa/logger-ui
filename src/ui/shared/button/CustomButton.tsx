import { Button, ButtonOwnProps, ButtonProps } from "@mui/material"

interface Props extends ButtonProps {
}

export const CustomButton = (props:Props) =>{

    return (
        <Button {...props} 
        />
    )
}