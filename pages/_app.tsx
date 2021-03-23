/* eslint-disable react/jsx-props-no-spreading */
import { SearchProvider } from '../store/search'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  )
}

export default MyApp
