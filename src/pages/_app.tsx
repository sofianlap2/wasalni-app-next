import '../../styles/globals.css'
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { store } from '../redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  )
}

export default MyApp
