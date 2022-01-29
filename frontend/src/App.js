import { useState } from 'react';
import './App.css';

import Axios from 'axios';

function App() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [regUserName, setRegUserName] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");


  const handleSignIn = () =>{
    // console.log(userName, password);
    Axios.post('http://localhost:5000/signin',{
      userName,
      password
    }).then((response)=> {
      // console.log(response);
      if(response.data.message){
        setLoginStatus(response.data.message);
      } else{
        // setLoginStatus(response.data[0].userName);
        setLoginStatus("you are now logged in with userName :"+response.data[0].userName);
      }
    });
    
  }

  const handleSignUp = () =>{
    Axios.post('http://localhost:5000/register',{
      regUserName, //key and value are same hence write only once
      regPassword
    }).then((response)=>{
      // console.log(response);
      if(response.data.message)
      setRegisterStatus("Registration failed");
      else
      setRegisterStatus("Registered");
    });
  }


  return (
    <div className='app'>

      <div className='sign_in'>
        <h2>Login :</h2>
        <label htmlFor=""> username : </label>
        <input type="text" name="username" value={userName} placeholder='Enter username' onChange={(e)=> setUserName(e.target.value)} />
        <label htmlFor=""> password : </label>
        <input type="password" name="password" value={password} placeholder='Enter password' onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={handleSignIn} className='button' type='submit' > Sign In </button>
        <h3> {loginStatus}  </h3>
      </div>

      <div className='sign_up'>
        <h2>Sign Up :</h2>
        <label htmlFor=""> preffered username : </label>
        <input type="text" name="regusername" value={regUserName} placeholder='Enter username' onChange={(e)=> setRegUserName(e.target.value)}/>
        <label htmlFor=""> password (min 6 characters) : </label>
        <input type="password" name="regpassword" value={regPassword} placeholder='Enter password' onChange={(e)=> setRegPassword(e.target.value)} />
        <button onClick={handleSignUp} className='button' type='submit' > Sign Up </button>
        <h3> {registerStatus} </h3>
      </div>

    </div>
  );
}

export default App;
