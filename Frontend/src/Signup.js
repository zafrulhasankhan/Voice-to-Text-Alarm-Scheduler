import React from "react"
import { Card, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { facebookProvider, githubProvider, googleProvider } from './config/authMethods';
import socialMediaAuth from './service/auth';
import axios from './config/axios';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import './css/style.css';



export default function Signup() {

  const history = useHistory()

  const handleOnclick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res?.providerData[0].email);
    axios.post('/register', {
      name: res?.providerData[0]?.displayName,
      email: res?.providerData[0]?.email,
      profile_photo: res?.providerData[0]?.photoURL
    }).then((result) => {
      console.log("result" + result.data.length);
      // if (result.data.length) {
        axios.get(`/check-phone-num/${res?.providerData[0]?.email}`)
          .then((result2) => {
            console.log(result2.data);
            if (result2.data.phone_No) {
              history.push("/");
            }
            else{
              history.push("/add-phone");
            }
          })
        
      // }
      // else {
      //   history.push("/signup")
      // }

    }).catch((err) => console.log(err))



  }


  return (
    <>

      <Container className="text-center p-20" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Card className=" h-600 card text-center bg-white">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <a className="button button--social-login button--google" onClick={() => handleOnclick(googleProvider)}><FaGoogle className="icon fa fa-google" />Login with Google</a>
            <a className="button button--social-login button--github" onClick={() => handleOnclick(githubProvider)}><FaGithub className="icon fa fa-github" />Login with GitHub</a>
            <a className="button button--social-login button--facebook" onClick={() => handleOnclick(facebookProvider)}><FaFacebookF className="icon fa fa-facebook" />Login with Facebook</a>

          </Card.Body>
        </Card>
        <br></br>
      </Container>
    </>
  )
}
