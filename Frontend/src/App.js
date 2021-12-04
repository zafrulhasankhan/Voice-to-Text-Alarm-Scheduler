
import './App.css';
import { facebookProvider, githubProvider, googleProvider } from './config/authMethods';
import socialMediaAuth from './service/auth';
import { useState } from 'react';
import Dictaphone from './Dictaphone';
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Remainder from './Remainder';
import Topbar from './Topbar/Topbar';
import AddPhone from './AddPhone';
function App() {
  const [data, setdata] = useState([]);

  const handleOnclick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res);
    setdata(res?.providerData[0]);
  }

  return (
    <div className="App">
      <Router>
      <AuthProvider>
          <Topbar />
        </AuthProvider>
      {/* <h1>React Socialite Login</h1>
      <button onClick={()=>handleOnclick(facebookProvider)}>facebook</button><br/>
      <button onClick={()=>handleOnclick(githubProvider)}>github</button><br/>
      <button onClick={()=>handleOnclick(googleProvider)}>google</button><br/>
      <h1>Name:{data.displayName}</h1>
      <h1>Email:{data.email}</h1>
      <img src={data.photoURL} /> */}
      <AuthProvider>
       
          <Switch>
            <Route path="/login" component={Signup} />
            <Route path="/voice-text" component={Dictaphone} />
            <Route path="/" exact component={Remainder} />
            <Route path="/add-phone" exact component={AddPhone} />

          </Switch>
 
      </AuthProvider>
</Router>
    </div>
  );
}

export default App;
