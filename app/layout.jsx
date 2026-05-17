export const metadata = {
  title: "Jump Program",
  description: "Science-based vertical jump and athletic performance program",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#e8e0d5", minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
