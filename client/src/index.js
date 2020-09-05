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
      light: '#ADCDF0',
      main: '#094183',
      dark: '#4074B2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFA478',
      main: '#E77052',
      dark: '#ff5722',
      contrastText: '#000',
    },
  },

  background: '#F4F5F7',

  typography: {
    fontFamily: 'Nunito, Roboto, sans-serif',
    button: {
      fontWeight: '600',
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
