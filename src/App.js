import React, {useContext, useEffect} from 'react';

import logo from "./logo.svg";
import "./App.css";

import Series from "./containers/Series";
import Auth from './containers/Auth';
import { AuthContext } from './context/auth-context';


function App() {
  const authContext = useContext(AuthContext);
  
  useEffect(()=>{
    authContext.checkAuth();
  },[])

  let content = <Auth/>
  if(authContext.isAuth){
    content = (
        <div className="App">
          <Series />
        </div>
      );
  }
  return  content;
}

export default App;
