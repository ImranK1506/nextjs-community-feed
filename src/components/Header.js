import styles from '@/styles/Home.module.css'
import Head from 'next/head';

function Header() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>Community Feed</title>
        <meta name='description' content="Community feed build with React" />
      </Head>
      <div className={styles['header-wrapper']}>
        <h1 className={styles['header-title']}>Community feed</h1>
      </div>
    </>
  )
}

export default Header;
