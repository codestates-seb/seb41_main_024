import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import basicTheme from '../theme/basic';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={basicTheme}>
        <div className="max-w-2xl min-w-[390px] mx-auto">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
