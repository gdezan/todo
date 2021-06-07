import { extendTheme } from '@chakra-ui/react';
import { Theme } from '@emotion/react';

const extendedTheme: Theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
        backgroundColor: 'gray.50',
      },
    },
  },
};

const theme = extendTheme(extendedTheme);

export default theme;
