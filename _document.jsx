import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="description" content="Outbound Automation System — Formation B2B par Antoine Beliaeff" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230F6E56'/><text y='.9em' font-size='65' x='15' fill='white' font-family='sans-serif' font-weight='bold'>OA</text></svg>" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
