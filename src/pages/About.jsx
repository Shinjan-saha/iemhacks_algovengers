import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import loginIcon from '../images/signIn-icon.svg'
import './about.css'

export default function About() {
    const navigate= useNavigate();
  return (
    <div className='about-container'>
        <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
        
        <div className="nav-btn-container">
          <button className="about-login-btn">
            <img src={loginIcon} alt="login" className="login-icon" />
            <span className="loginSpan" onClick={()=>{
                navigate('/login')
            }}>Login</span>
          </button>
        </div>
      </nav>
      <main className="about-main">
        <div className="intro about-boxes">
            <h2 className='about-heading heading'>About Us</h2>
            <p className="short-intro ptext">
                Welcome to RagFreeCampus, your platform for fostering a safe and respectful educational environment. We understand that a harmonious academic journey is pivotal for students' growth and well-being. Our initiative is driven by the conviction that every student deserves a campus free from the menace of ragging.
            </p>
        </div>
        <div className="mission about-boxes">
            <h2 className="mission-heading heading">Our Mission</h2>
            <p className="mission-info ptext">
                At RagFreeCampus, our mission is crystal clear - to put an end to ragging and harassment within educational institutions. We are committed to creating an atmosphere where students can focus on learning, personal development, and building lifelong friendships without fear or intimidation. We firmly believe that education should empower, not endanger, and we strive to make this belief a reality for every student.
            </p>
        </div>
        <div className="whatWeDo about-boxes">
            <h2 className="whatWeDo-heading heading">What We Do?</h2>
            <p className="whatWeDo-text ptext">
                Our platform serves as a bridge between students and their institutions, ensuring a direct channel to address ragging complaints. We provide an easy-to-use interface for students to lodge complaints about any ragging incidents they have witnessed or experienced. In the unfortunate event that a college is unable to resolve a case, our platform empowers victims to escalate their complaint to higher authorities. We firmly advocate for transparency, accountability, and prompt action throughout this process.
            </p>
        </div>
        <div className="ourTeam about-boxes">
            <h2 className="team-heading heading">Our Team</h2>
            <p className="team-text ptext">
                RagFreeCampus is driven by a passionate team of individuals who are deeply committed to eradicating ragging from educational institutions. Our team members come from diverse backgrounds, uniting their skills and expertise to create an impactful solution that benefits students across the nation.
            </p>
        </div>
        <div className="contact about-boxes">
            <h2 className="contact-heading heading">Contact Us</h2>
            <p className="contact-text ptext">
                Got questions, suggestions, or feedback? We'd love to hear from you. Reach out to us at <a href="mailto:algovengers@gmail.com">algovengers@gmail.com</a> . Your input helps us continually improve and refine our platform.
            </p>
            <p className="thankyou-text ptext">
                Thank you for being a part of the movement to end ragging and create a safer, more nurturing academic environment for all students. Together, we can make a difference!
            </p>
        </div>
      </main>
      <footer className="footer">
        <div className="copyright-text">
            <h3 className="copyright">Copyright &copy; all right reserved</h3>
        </div>
      <div className="footer-content">
            <div className="team-members">
                <h4>Our Team</h4>
                <ul className="team-list">
                    <li className="member"><a rel='noreferrer' href='https://www.linkedin.com/in/afeef-uddin-2ab567247' target='_blank'>Afeef Uddin</a></li>
                    <li className="member"><a rel='noreferrer' href='https://www.linkedin.com/in/subharthihazra/' target='_blank'>Subharthi Hazra</a></li>
                    <li className="member"><a rel='noreferrer' href='https://www.linkedin.com/in/aftabalam07/' target='_blank'>Aftab Alam</a></li>
                    <li className="member"><a rel='noreferrer' href='https://www.linkedin.com/in/shinjan-saha-404064248' target='_blank'>Shinjan Saha</a></li>
                </ul>
            </div>
            <div className="contact-options">
                <h4>Contact Us</h4>
                <ul className="contact-list">
                    <li><a href="mailto:algovengers@gmail.com" className='contact-mail-link'>algovengers@gmail.com</a></li>
                </ul>
            </div>
            <div className="credits">
                <h4>Images Credits</h4>
                <ul className="credit-list">
                    <li>Image by <a rel='noreferrer' target='_blank' href="https://www.freepik.com/free-vector/stop-bullying-concept_9005185.htm#query=ragging%20people&position=0&from_view=search&track=ais">Freepik</a></li>
                    <li>Image by <a rel='noreferrer' target='_blank' href="https://www.freepik.com/free-vector/hand-drawn-football-fans-illustration_33757884.htm?query=revolution">Freepik</a></li>
                </ul>
            </div>
        </div>
      </footer>
    </div>
  )
}