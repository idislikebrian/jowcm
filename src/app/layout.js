import "./globals.css";

export const metadata = {
  title: "Journaling Outdoors Would Cure Me",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="ibm-sans">{children}</body>
    </html>
  );
}
