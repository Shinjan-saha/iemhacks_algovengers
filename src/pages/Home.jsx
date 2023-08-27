import React from "react";
import {useNavigate} from 'react-router-dom'
import "./home.css";
import logo from "../images/logo.png";
import homeImg from "../images/raggin-img-1.jpg";
import signInIcon from '../images/signIn-icon.svg'

export default function Home() {
  const navigate =useNavigate();
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
		<div className="nav-btn-container">
			<button className="signIn-btn" onClick={()=>{
        navigate("/signup");
      }}>
			<img src={signInIcon} alt="" className="signin-icon" />
			<span className="signInSpan">SignUp</span>
			</button>
		</div>
      </div>
      <main className="main">
        <div className="text-container">
          <div className="slogans-container">
            <h1>Educate, Elevate, <span>Eradicate Ragging.</span></h1>
            <h1>Say no to Ragging.</h1>
			<p  className="para">Ragging incidents are often underreported due to fear of retaliation, social stigma, and a lack of awareness about reporting mechanisms.</p>
			<p className="para">Lets stand together against <span className="highlight">Ragging!</span></p>
			<h3>Join us in this journey solving this problem!!</h3>
          </div>

          <div className="btn-container">
            <button className="btn login-btn" onClick={()=>{
              navigate('/login')
            }}>Login</button>
			<button className="btn aboutUs-btn" onClick={()=>{
        navigate('/about')
      }}>About Us</button>
          </div>
        </div>
        <div className="img-container">
          <img src={homeImg} alt="" className="home-image" />
        </div>
      </main>
    </div>
  );
}