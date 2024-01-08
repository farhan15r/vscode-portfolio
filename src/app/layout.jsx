import "@/styles/globals.css";
import "@/styles/themes.css";
import Layout from "@/components/Layout";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <Layout>{children}</Layout>
        </body>
      </html>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Farhan Ramadhan",
  };
}
