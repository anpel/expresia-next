import Layout from '../../components/layout'
// import { getPostData } from '../../lib/posts'
// import { getAllPostIds, getPostData } from '../../lib/posts'
import { getAllPostIds, getPostData } from '../../lib/expresia'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  console.log(postData[0]);
  return (
    <Layout>
      <Head>
        <title>{postData[0].title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData[0].title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData[0].date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData[0].content }} />
      </article>
    </Layout>
  )
}