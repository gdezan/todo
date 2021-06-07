import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { store } from './store';
import theme from './theme';

import Main from './views/Main';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
