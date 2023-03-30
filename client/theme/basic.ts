import { createTheme } from '@mui/material/styles';
import { notoSansKR } from './fontFamily/notoSansKR';

const basicTheme = createTheme({
  typography: {
    fontFamily: [
      notoSansKR.style.fontFamily,
      '-apple-system',
      'Apple SD Gothic Neo',
      'Malgun Gothic',
      'sans-serif',
      'ArialUnicodeMs',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#63A8DA',
      contrastText: '#fff',
    },
  },
});

export default basicTheme;
