import React, { useState,useContext } from 'react'
import './../../styles/navbar.css';
import logo from './../assets/logo.png'
import {Link} from 'react-scroll'
import contactImg from './../assets/contact.png'
import menu from './../assets/menu.png'
import logout from './../assets/power-off.png'
import { AuthContext } from './../Authentication/authContext.js'


const Navbar = () => {
  const [showMenu,setShowMenu]=useState(false)
  const { isLoggedIn , handleLogout } = useContext(AuthContext);
  

  const handleNavigate = () => {
    window.open("https://drive.google.com/file/d/1RQhqsm6LKzSdJXSXPsXi9QiWSXt-51Vw/view?usp=drive_link", "_blank"); 
  };

  console.log("nav page :",isLoggedIn)

  return (
     <nav className='navbar'>
        <img src={logo} alt="logo"/>
        <div className='menu'>
            <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className='menuListItem'>Home</Link>
            <Link activeClass='active' to='skills' spy={true} smooth={true} offset={-70} duration={500} className='menuListItem'>About</Link>
            <Link activeClass='active' to='works' spy={true} smooth={true} offset={-50}  duration={500} className='menuListItem'>Projects</Link>       
            <Link activeClass='active' to='contactPage' spy={true} smooth={true} offset={-30}  duration={500} className='menuListItem'>Contact Me</Link> 
        </div>


        <button className='menuBtn' onClick={handleNavigate}>
            <img src={contactImg} alt="" className='menuImg' />Resume
        </button>

        {isLoggedIn?(
          <>
            <button className='menuBtn' onClick={handleLogout}>
            <img src={logout} alt="" className='menuImg' />Logout
            </button>
          </>
        ):null}


        <img src={menu} alt="Menu" className='mobMenu' onClick={()=>setShowMenu(!showMenu)}/>
        <div className='navMenu' style={{display : showMenu?'flex':'none'}}>
            <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className='listItem' onClick={()=>setShowMenu(false)}>Home</Link>
            <Link activeClass='active' to='skills' spy={true} smooth={true} offset={-70} duration={500} className='listItem' onClick={()=>setShowMenu(false)}>About</Link>
            <Link activeClass='active' to='works' spy={true} smooth={true} offset={-60}  duration={500} className='listItem' onClick={()=>setShowMenu(false)}>Projects</Link>       
            <Link activeClass='active' to='contactPage' spy={true} smooth={true} offset={-50}  duration={500} className='listItem' onClick={()=>setShowMenu(false)}>Contact Me</Link> 
            <Link className='listItem' onClick={() => {handleNavigate();setShowMenu(false);}}>Resume</Link> 
            {isLoggedIn && (
                <Link className='listItem' onClick={handleLogout}>Logout</Link>
            )}
        </div>

     </nav>
  )
}

export default Navbar;
