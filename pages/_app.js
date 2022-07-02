import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from '../components/NavBar';
/*import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'*/
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {

  return (
    <NavBar>
      <Component {...pageProps} />
    </NavBar>
  )
}

export default MyApp
/*
<Provider store={configureStore({
      reducer: { counter: counterReducer },
    })}>
    </Provider>*/