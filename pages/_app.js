import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import { Navbar } from '../components/Navbar'
import "@fortawesome/fontawesome-svg-core/styles.css";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const config = {
  }
  return (
    <DAppProvider config={config}>
      <Navbar />
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
