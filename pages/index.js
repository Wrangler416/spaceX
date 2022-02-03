import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import logo from '../public/spacex.png'


export default function Home({launches}) {

  console.log('launches', launches)

  return (
   
    <div className={styles.container}>
      <Head>
        <title>SpaceX Launches</title>
        <meta name="description" content="Space X Recent Launches" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@200&family=Quicksand:wght@300;500&family=Urbanist:wght@100&display=swap" rel="stylesheet"/> 
      </Head>

      <main className={styles.main}>
         <div><Image src={logo}></Image></div>
        <p className={styles.description}>
          Latest launches from SpaceX API 
          <br></br>
        </p>

        <div className={styles.grid}>

           {launches.map(launch => {
              return (
                <a key={launch.id}href={launch.links.video_link} className={styles.card}>
                <h2>{launch.mission_name}</h2>
                <p><strong>Launch Time:</strong>{ new Date(launch.launch_date_local).toLocaleDateString("en-US")}</p>
                <p>{launch.launch_site.site_name_long}</p>
              </a>
              )
              })}
         </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Kara Temple 
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps(){
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  })

  const {data}= await client.query({
    query: gql`
    {
      launchesPast(limit: 10) {
        id
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
        links {
          article_link
          video_link
        }
        rocket {
          rocket_name
         
      }
    }
    }
    `
  })

  return {
    props: {
      launches: data.launchesPast
    }
  }
}