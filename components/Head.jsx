import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Farhan Ramadhan is a back end developer"
      />
      <meta
        name="keywords"
        content="Farhan Ramadhan, farhan15r, farhan, backend portfolio, farhan back end developer, farhan developer, farhan bangkit academy, farhan ramadhan portfolio, vscode-portfolio"
      />
      <meta property="og:title" content="Farhan Ramadhan's Portfolio" />
      <meta
        property="og:description"
        content="A Backend developer"
      />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://vscode-portfolio.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Nitin Ranganath',
};
