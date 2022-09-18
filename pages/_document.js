import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charset="UTF-8" />
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />

          <link rel="icon" href="/layout/favicon.ico" />

          {/* Site name and keywords */}
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="title" />
          <meta name="keywords" content="keywords" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
