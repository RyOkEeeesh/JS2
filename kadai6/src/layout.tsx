export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/style.css" />
        <title>JS23 課題6</title>
        <script type="module" src="/script.js" defer />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}