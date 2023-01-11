import { createTheme } from '@mui/material/styles';
import nsTotf from '../public/fonts/NotoSans-Thin.otf';
import nsTwoff from '../public/fonts/NotoSans-Thin.woff';
import nsTwoff2 from '../public/fonts/NotoSans-Thin.woff2';
import nsLotf from '../public/fonts/NotoSans-Light.otf';
import nsLwoff from '../public/fonts/NotoSans-Light.woff';
import nsLwoff2 from '../public/fonts/NotoSans-Light.woff2';
import nsDLotf from '../public/fonts/NotoSans-DemiLight.otf';
import nsDLwoff from '../public/fonts/NotoSans-DemiLight.woff';
import nsDLwoff2 from '../public/fonts/NotoSans-DemiLight.woff2';
import nsRotf from '../public/fonts/NotoSans-Regular.otf';
import nsRwoff from '../public/fonts/NotoSans-Regular.woff';
import nsRwoff2 from '../public/fonts/NotoSans-Regular.woff2';
import nsMotf from '../public/fonts/NotoSans-Medium.otf';
import nsMwoff from '../public/fonts/NotoSans-Medium.woff';
import nsMwoff2 from '../public/fonts/NotoSans-Medium.woff2';
import nsBlotf from '../public/fonts/NotoSans-Black.otf';
import nsBlwoff from '../public/fonts/NotoSans-Black.woff';
import nsBlwoff2 from '../public/fonts/NotoSans-Black.woff2';
import nsBotf from '../public/fonts/NotoSans-Bold.otf';
import nsBwoff from '../public/fonts/NotoSans-Bold.woff';
import nsBwoff2 from '../public/fonts/NotoSans-Bold.woff2';

const basicTheme = createTheme({
  palette: {
    primary: {
      main: '#63A8DA',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans Korean',
      '-apple-system',
      'Apple SD Gothic Neo',
      'Malgun Gothic',
      'sans-serif',
      'ArialUnicodeMs',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 100;
          font-style: normal;
          src:
            local('NotoSans-Regular'),
            url(${nsTotf}) format('opentype'),
            url(${nsTwoff}) format('woff'),
            url(${nsTwoff2}) format('woff2');
        }
        
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 200;
          font-style: normal;
          src:
            local('NotoSans-Light'),
            url(${nsLotf}) format('opentype'),
            url(${nsLwoff}) format('woff'),
            url(${nsLwoff2}) format('woff2');
        }
        
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 300;
          font-style: normal;
          src:
            local('NotoSans-DemiLight'),
            url(${nsDLotf}) format('opentype'),
            url(${nsDLwoff}) format('woff'),
            url(${nsDLwoff2}) format('woff2');
        }
        
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 400;
          font-style: normal;
          src: 
          local('NotoSans-Regular'),
          url(${nsRotf}) format('opentype'),
          url(${nsRwoff}) format('woff'),
          url(${nsRwoff2}) format('woff2');
        }
        
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 500;
          font-style: normal;
          src: 
          local('NotoSans-Medium'),
          url(${nsMotf}) format('opentype'),
          url(${nsMwoff}) format('woff'),
          url(${nsMwoff2}) format('woff2');
        }
        
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 700;
          font-style: normal;
          src:
          local('NotoSans-Black'),
          url(${nsBlotf}) format('opentype'),
          url(${nsBlwoff}) format('woff'),
          url(${nsBlwoff2}) format('woff2');
        }
        
        @font-face {
          font-family: 'Noto Sans Korean';
          font-weight: 900;
          font-style: normal;
          src:
          local('NotoSans-Black'),
          url(${nsBotf}) format('opentype'),
          url(${nsBwoff}) format('woff'),
          url(${nsBwoff2}) format('woff2');
        }
      `,
    },
  },
});

export default basicTheme;
