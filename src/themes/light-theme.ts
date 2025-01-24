import { createTheme } from '@mui/material/styles';

export const ligthTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#FFFFFF'
        },
        text: {
            primary: '#101418',
            secondary: '#FFFFFF'
        }
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    borderRadius: '10px',
                    fontSize: 18
                    // '&:hover': {
                    //     backgroundColor: '#1F618D !important',
                    //     color: '#FFFFFF'
                    // }
                }
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: '#154360 !important',
                        color: '#FFFFFF !important',
                        textTransform: 'capitalize',
                        borderRadius: '10px',
                        fontSize: 18,
                        '&:hover': {
                            backgroundColor: '#1F618D !important',
                            color: '#FFFFFF'
                        }
                    }
                }
            ]
        },

        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& label': {
                        color: 'rgba(0, 0, 0, 0.6)'
                    }
                }
            }
        },

        MuiAppBar: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === 'primary' && {
                        backgroundColor: '#FFFFFF'
                    })
                })
            }
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#101418'
                }
            }
        }
    }
});
