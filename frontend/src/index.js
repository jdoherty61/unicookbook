//boiler plate file - essentially renders all the react components as DOM elements
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { AppRegistry } from 'react-native';


// AppRegistry.registerComponent('App', () => App);

// AppRegistry.runApplication('App', {
//   initialProps: {},
//   rootTag: document.getElementById('root')
// });

//This is root of the application. Will render all components below it in the DOM. Allow for react development

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
