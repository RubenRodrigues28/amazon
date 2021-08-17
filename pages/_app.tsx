import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { Provider as AuthProvider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';

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
