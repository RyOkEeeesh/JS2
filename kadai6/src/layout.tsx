import { env } from "../env";

export default function Layout({ children }: { children: React.ReactNode }) {
  const reloadScript = `
    const eventSource = new EventSource('/reload-stream');
    eventSource.onmessage = (event) => {
      if (event.data === 'reload') {
        window.location.reload();
      }
    };
    // エラー（サーバー停止時など）が起きたら数秒後に再接続を試みる設定
    eventSource.onerror = () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };
  `;

  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={`/${env.out.css}`} />
        <title>JS23 課題6</title>
        <script type="module" src={`/${env.out.js}`} defer />
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{ __html: reloadScript }}
        />
      </body>
    </html>
  );
}