import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UrlList from './urlList'
import UrlListStore from '../store/urlNetListStore'
import UrlItemStore from '../store/urlNetItemStore'

const urlListPageStore = new UrlListStore()

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>google search page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <img src='./images/google_logo.svg'/>
        </div>
        <div className={styles.grid}>
          <input className="search"/>
          <style jsx>{`
            .search {
              width: 500px;
              height: 40px;
              padding: 0 40px;
              border-radius: 20px;
              border: 1px solid #333;
            }
          `}</style>
        </div>
        <UrlList urlListPageStore={urlListPageStore} />
      </main>
    </div>
  )
}
