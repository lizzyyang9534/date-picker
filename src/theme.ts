import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#d73a42',
      600: '#db3d44',
      700: '#b92f36',
    },
    brandGray: {
      500: '#eee', // This color might be too light to see clearly, so I use #ccc as text color instead
      600: '#e9e9e9',
      700: '#ccc',
    },
  },
});
export default theme;
