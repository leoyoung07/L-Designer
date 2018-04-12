import React from 'react';
import ReactDom from 'react-dom';
import DesignPanel from './DesignPanel';

ReactDom.render(
  <DesignPanel panelWidth={500} panelHeight={500} />,
  document.getElementById('root')
);
