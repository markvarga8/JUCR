import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="en" className="min-h-screen bg-[#F2F3F3]">
    <Head>
      <Script
        id="theme-js"
        type="text/javascript"
        src="/static/js/theme.js"
        strategy="beforeInteractive"
      />
    </Head>
    <body className="min-h-screen">
      <Main />
      <NextScript />
    </body>
  </Html>
);
export default Document;
