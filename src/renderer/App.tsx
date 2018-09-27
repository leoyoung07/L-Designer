import React from 'react';
import ReactDOM from 'react-dom';
import DesignPanel from './DesignPanel';

const appRoot = document.getElementById('app');

appRoot!.className = 'app';

ReactDOM.render(
  <DesignPanel panelWidth={500} panelHeight={500}/>,
  appRoot
);
