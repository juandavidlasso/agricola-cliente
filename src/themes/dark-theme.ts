import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#101418'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF'
        }
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === 'primary' && {
                        backgroundColor: '#17202A',
                        backgroundImage: 'none'
                    })
                })
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    borderRadius: '10px',
                    fontSize: 18
                    // '&:hover': {
                    //     backgroundColor: '#979A9A !important',
                    //     color: '#101418'
                    // }
                }
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: '#FFFFFF !important',
                        color: '#000000 !important',
                        textTransform: 'capitalize',
                        borderRadius: '10px',
                        fontSize: 18,
                        '&:hover': {
                            backgroundColor: '#979A9A !important',
                            color: '#101418'
                        }
                    }
                }
            ]
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF'
                }
            }
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#17202A'
                }
            }
        }
    }
});
