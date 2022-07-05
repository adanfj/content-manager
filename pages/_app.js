import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from '../components/NavBar';
import { CookiesProvider } from 'react-cookie';
/*import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'*/
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {

  return (
    <CookiesProvider>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </CookiesProvider>
  )
}

export default MyApp
/*
<Provider store={configureStore({
      reducer: { counter: counterReducer },
    })}>
    </Provider>*/