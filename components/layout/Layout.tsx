import { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import useStyles from "./layout.style";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  ogImage?: string;
  url?: string;
}
const Layout: FC<Props> = ({ children, title, description, ogImage, url }) => {

  const classes = useStyles();
  // website Url
  const pageUrl =
    'https://nextjs-and-material-ui-template-with-header-and-footer.vercel.app/';
  // when you share this page on facebook you'll see this image
  const ogImg = 'https://i.imgur.com/1H2TK2B.png';

  return (
    <>
      <Head>
        <title>{title ? title : 'Base7 HR platform'}</title>
        <meta
          name='description'
          key='description'
          content={
            description ? description : 'Lorem ipsum dolor sit amet, consect'
          }
        />
        <meta
          property='og:title'
          content={title ? title : 'Lorem ipsum dolor sit amet, consect'}
          key='og:title'
        />
        <meta property='og:url' content={url ? url : pageUrl} key='og:url' />
        <meta
          property='og:image'
          content={ogImage ? ogImage : ogImg}
          key='og:image'
        />
        <meta
          property='og:description'
          content={
            description ? description : 'Lorem ipsum dolor sit amet, consect'
          }
          key='og:description'
        />
      </Head>
      <Header />
      <main className={classes.mastcontent}>{children}</main>
      <Footer />
      <style jsx global>
        {`
          html,
          body {
            background: #f9f9f9;
            overflow-x: hidden;
            padding: 0;
          }
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
