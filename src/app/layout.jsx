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
    description: "Farhan Ramadhan is a back end developer",
    keywords:
      "Farhan Ramadhan, farhan15r, farhan, backend portfolio, farhan back end developer, farhan developer, farhan bangkit academy, farhan ramadhan portfolio, vscode-portfolio",
    ogTitle: "Farhan Ramadhan's Portfolio",
    ogDescription: "A Backend developer",
    ogImage: "https://imgur.com/4zi5KkQ.png",
    ogUrl: "https://www.farhan15r.live",
    twitterCard: "summary_large_image",
  };
}
