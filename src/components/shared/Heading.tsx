import { Typography } from "@mui/material"

export const Heading = ({ text }: any) => {
    return (
        <Typography variant={'h1'} fontWeight={700} margin={'1em 0'}
        fontSize={'34px'}
        >{text}</Typography> 
    )
}