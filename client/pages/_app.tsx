import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider  } from '@mui/material/styles';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  )
}
