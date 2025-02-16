import React, { useRef ,useContext, useState} from 'react'
import './../../styles/contact.css'
import LinkedInIcon from './../assets/linkedin.png'
import GithubIcon from './../assets/github.png'
import InstagramIcon from './../assets/instagram.png'
import YouTubeIcon from './../assets/youtube.png'
import LeetcodeIcon from './../assets/leetcode.svg'
import emailjs from '@emailjs/browser';
import { AuthContext } from './../Authentication/authContext.js'
import { scroller,Element } from 'react-scroll';
import {verify} from './support.js'
import { toast } from 'react-toastify'


const Contact = () => {
  const form = useRef();


  const { handleLogin} = useContext(AuthContext);
  const [spinner,setSpinner]=useState(false)
  

  const sendEmail = async(e) => {
    e.preventDefault();
    setSpinner(true)
    const role = form.current['your_name']?.value || ''; 
    const email = form.current['your_email']?.value || '';
    const password = form.current['message']?.value || '';

    const credential={
      role:role,
      email:email,
      password:password,
    }

    const result = await verify(credential)

    if (result.success) {
      toast.success("Welcome Admin")
      handleLogin(role);
      scroller.scrollTo('intro', {
        duration: 500,
        smooth: 'easeInOutQuad',
        offset: -50, 
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } 

    else {
      emailjs
      .sendForm('service_if1vqxc', 'template_0thnvnn', form.current, {
        publicKey: 'UPC92wmRDEi2G6onn',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
          alert("Email has been sent.")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    }
    setSpinner(false)

  };

  const handleNavigate=(str)=>{
    if(str==='ln'){
      window.open("https://www.linkedin.com/in/bharanidharan-t-c-7a9ab1225/", "_blank"); 
    }
    else if(str==='gh'){
      window.open("https://github.com/bharani2310", "_blank"); 
    }
    else if(str==='lc'){
      window.open("https://leetcode.com/u/bharanidharan0909/", "_blank"); 
    }
    else if(str==='ig'){
      window.open("https://instagram.com/bharanidharan2310", "_blank"); 
    }
  }

  return (
    <Element name='contactPage-section'>
    <section id='contactPage'>
    {spinner && (
          <div className="loader-overlay">
            <span className="loader"></span>
          </div>
      )}
        <div id='contact'>
            <h1 className='contactPageTitle'>Contact Me</h1>
            <span className='contactDesc'>Please fill the form below to discuss any work opportunities.</span>
            <form className='contactForm' ref={form} onSubmit={sendEmail}>
                <input type='text' className='name' placeholder='Your name' name='your_name' required/>
                <input type='email' className='email' placeholder='Your email' name='your_email' required/>
                <textarea placeholder='Your message' rows={5} name='message' className='msg' required/>
                <button type='submit' value='send' className='submitBtn' >Submit</button>
                <div className='links'>
                    <img title='LinkedIn' src={LinkedInIcon} alt='LinkedInIcon' style={{ cursor: "pointer" }} className='link' onClick={() => handleNavigate("ln")}></img>
                    <img title='Github' src={GithubIcon} alt='GithubIcon' style={{ cursor: "pointer" }} className='link' onClick={() => handleNavigate("gh")}></img>
                    <img title='Leetcode' src={LeetcodeIcon} alt='LeetcodeIcon' style={{ cursor: "pointer" }}  className='link' onClick={() => handleNavigate("lc")}></img>
                    <img title='Instagram' src={InstagramIcon} alt='InstagramIcon' style={{ cursor: "pointer" }} className='link' onClick={() => handleNavigate("ig")}></img>
                </div>

            </form> 
        </div>
    </section>
    </Element>
  )
}

export default Contact