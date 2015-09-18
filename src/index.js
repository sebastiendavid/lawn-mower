import Configuration from './conf/Configuration';
import GrassGrid from './grass/GrassGrid';
import React from 'react';

document.addEventListener('DOMContentLoaded', () => {
  React.render((
    <div id="content">
      <Configuration />
      <GrassGrid />
    </div>
  ), document.body);
});
