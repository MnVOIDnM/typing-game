import "./globals.css";
import AppProvider from "./provider";

export const metadata = {
  title: "タイピングゲーム",
  description: "タイピングの練習ができるサイトです。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
