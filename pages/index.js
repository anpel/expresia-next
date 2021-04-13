import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/expresia'
import Link from 'next/link'
import Date from '../components/date'

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   console.log(allPostsData);
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export async function getStaticProps() {
  // const allPostsData = await fetch(
  //   "https://motionlessalarmeddevil.xpr.cloud/elementAjax/ApiTests/ArticleListing", {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  // }).then((response) => response.json());

  const allPostsData = await getSortedPostsData()

  return {
    props: {
      allPostsData
    },
  };
};


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, this is a <strong>POC of decoupled Expresia</strong>. We use Expresia as a data layer and nextjs as a frontend layer.</p>
        <p>
          (This is a sample website - check our platform at{' '}
          <a href="https://www.expression.cloud/">our expression.cloud website</a>.)
        </p>
      </section>

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>List of articles</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}