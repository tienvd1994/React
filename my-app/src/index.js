import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'
import './index.css'
import './App.css'
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider>
    <Routes />
  </Provider>
  ,
  document.getElementById('root')
);