import React from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import AppContent from './src/components/AppContent';

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
