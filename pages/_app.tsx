import { useCallback, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Theme, ThemeProvider } from '@mui/material';
import { client } from '@graphql/client';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, ligthTheme } from '@themes/index';
import '../styles/globals.css';
import { persistor, store } from '@store/store';
import { ThemeProps } from '@interfaces/theme';
import { InformationProvider } from 'src/context/cultivos/information/InformationContext';
import { PluviometroProvider } from 'src/context/lluvias/PluviometroContext';
import { CultivosProvider } from 'src/context/cultivos/CultivosContext';
import Alert from '@components/Alert';
import { MaquinariaProvider } from 'src/context/maquinaria/MaquinariaContext';

export default function App({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<Theme>(ligthTheme);

    const toogleTheme = useCallback((theme: ThemeProps) => {
        setTheme(theme === 'light' ? ligthTheme : darkTheme);
    }, []);

    useEffect(() => {
        const theme = sessionStorage.getItem('theme') || 'light';
        setTheme(theme === 'light' ? ligthTheme : darkTheme);
    }, [theme]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={client}>
                    <InformationProvider>
                        <CultivosProvider>
                            <PluviometroProvider>
                                <MaquinariaProvider>
                                    <ThemeProvider theme={theme}>
                                        <CssBaseline />
                                        <Alert />
                                        <Component {...pageProps} toogleTheme={toogleTheme} />
                                    </ThemeProvider>
                                </MaquinariaProvider>
                            </PluviometroProvider>
                        </CultivosProvider>
                    </InformationProvider>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    );
}
