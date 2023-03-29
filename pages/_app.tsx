import React, { Fragment, useEffect, FC } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../utils/theme/theme';
import { Provider } from 'react-redux';
import store from '../store/store';
import { SessionProvider } from "next-auth/react"

import Layout from '../components/layout/Layout';
import { PersistGate } from 'redux-persist/integration/react';

import { persistStore } from 'redux-persist';

import "../styles/styles.scss";

let persistor = persistStore(store);

const MyApp: FC<any> = ({ Component, pageProps: { session, ...pageProps } }) => {


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Head>
              <title>HR</title>
              <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width'
              />
            </Head>
            <ThemeProvider theme={theme}>
              <StyledEngineProvider injectFirst>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Layout
                  // type your page title and page description.
                  title='Template - Next.js and Material-UI with Header and Footer'
                  description='This is a Template using Next.js and Material-UI with Header and Footer.'
                >
                  <Component {...pageProps} />
                </Layout>
              </StyledEngineProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Fragment>
    </SessionProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
