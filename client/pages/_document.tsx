import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="logos/favicon-32x32.png"
          />
          <link rel="apple-touch-icon" href="logos/apple-touch-icon-152.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="logos/favicon-16x16.png"
          />
          <link rel="image_src" href="logos/apple-touch-icon-152.png" />
          <meta
            name="description"
            content="Negther는 실시간 위치를 파악하여 주변 이웃들과 공동구매를 할 수 있는 플랫폼 서비스 입니다. Ngether와 함께라면 합리적인 가격으로 소량구매 할 수 있습니다."
          />
          <meta property="og:title" content="Ngether" key="title" />
          <meta
            property="og:description"
            content="Negther는 실시간 위치를 파악하여 주변 이웃들과 공동구매를 할 수 있는 플랫폼 서비스 입니다. Ngether와 함께라면 합리적인 가격으로 소량구매 할 수 있습니다."
          />
          <meta
            property="og:image"
            content="https://github.com/codestates-seb/seb41_main_024/blob/dev/client/public/logos/favicon-logo.png?raw=true"
          />
        </Head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP}&libraries=services,clusterer,drawing`}
          // strategy="beforeInteractive"
          id="kakaoScript"
        ></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        materialSheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>,
  };
};
