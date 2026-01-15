import { env } from "../env";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={`/${env.out.css}`} />
        <title>{env.title ?? 'Document'}</title>
        <script type="module" src={`/${env.out.js}`} defer />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}