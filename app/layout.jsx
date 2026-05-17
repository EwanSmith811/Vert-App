export const metadata = {
  title: "Jump Program",
  description: "Science-based vertical jump and athletic performance program",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=2" />
      </head>
      <body style={{ margin: 0, background: "#0a0a0a", color: "#e8e0d5", minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
