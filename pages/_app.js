import './styles.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
        weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin'] 
    })
 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return(

    <main className={poppins.className}>
        <Component {...pageProps} />
    </main>

  )
}