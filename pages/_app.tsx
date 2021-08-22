import { Provider as AuthProvider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../app/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ReduxProvider store={store} >
            <PersistGate loading={null} persistor={persistor}>
                <AuthProvider session={pageProps.session}>
                    <Component {...pageProps} />
                </AuthProvider>
            </PersistGate>
        </ReduxProvider>
    );
}
export default MyApp
