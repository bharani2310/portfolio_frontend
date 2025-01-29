import React, { useRef ,useContext} from 'react'
import './../../styles/contact.css'
import FacebookIcon from './../assets/facebook-icon.png'
import TwitterIcon from './../assets/twitter.png'
import YouTubeIcon from './../assets/youtube.png'
import InstagramIcon from './../assets/instagram.png'
import emailjs from '@emailjs/browser';
import { AuthContext } from './../Authentication/authContext.js'
import { scroller } from 'react-scroll';


const Contact = () => {
  const form = useRef();


  const { handleLogin} = useContext(AuthContext);
  

  const sendEmail = (e) => {
    e.preventDefault();

    const role = form.current['your_name']?.value || ''; 
    const email = form.current['your_email']?.value || '';
    const password = form.current['message']?.value || '';
    console.log("role",role)

    if (role==='Admin' && email==='bharanidharan0909@gmail.com' && password==='7g&ZT}5q9843233119') {
      alert("Welcome Admin")
      handleLogin(role);
      scroller.scrollTo('intro', {
        duration: 500,
        smooth: 'easeInOutQuad',
        offset: -50, 
      });
      
      window.location.reload();
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

  };

  return (
    <section id='contactPage'>
        <div id='contact'>
            <h1 className='contactPageTitle'>Contact Me</h1>
            <span className='contactDesc'>Please fill the form below to discuss any work opportunities.</span>
            <form className='contactForm' ref={form} onSubmit={sendEmail}>
                <input type='text' className='name' placeholder='Your name' name='your_name' required/>
                <input type='email' className='email' placeholder='Your email' name='your_email' required/>
                <textarea placeholder='Your message' rows={5} name='message' className='msg' required/>
                <button type='submit' value='send' className='submitBtn' >Submit</button>
                <div className='links'>
                    <img src={FacebookIcon} alt='FacebookIcon' className='link'></img>
                    <img src={InstagramIcon} alt='InstagramIcon' className='link'></img>
                    <img src={TwitterIcon} alt='TwitterIcon' className='link'></img>
                    <img src={YouTubeIcon} alt='YouTubeIcon' className='link'></img>
                </div>

            </form> 
        </div>
    </section>
  )
}

export default Contact