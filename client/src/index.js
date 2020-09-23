import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, ReactReduxContext} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {history} from './store';
import configureStore from './store';
import App from './components/App';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import './index.css';

const store = configureStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#74a2e4',
      main: '#4074b2',
      dark: '#004982',
      contrastText: '#fff',
    },
    secondary: {
      light: '#B2C1EB',
      main: '#7283BF',
      dark: '#394789',
      contrastText: '#fff',
    },
    success: {
      light: '#A1D172',
      main: '#74B716',
      dark: '#265704',
    },
    info: {
      light: '#5EEBD9',
      main: '#00B8BF',
      dark: '#004E6E',
    },
    warning: {
      light: '#F9D9A3',
      main: '#ECAE65',
      dark: '#A96832',
      contrastText: '#000',
    },
    danger: {
      light: '#F1927E',
      main: '#D32C2C',
      dark: '#97162C',
    },
  },

  background: '#F4F5F7',

  typography: {
    fontFamily: 'Nunito, sans-serif',
    button: {
      fontWeight: '600',
    },
    body1: {
      fontFamily: 'Lato, san-serif',
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
    },
  },
});

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
