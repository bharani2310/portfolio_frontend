import React,{useContext} from 'react'
import '../../styles/tech.css'
import { AuthContext } from './../Authentication/authContext.js'
import add from '../assets/add.png'

const Tech = () => {
    const { isLoggedIn } = useContext(AuthContext);
    
  return (
    <section id='tech'>
        <div className='div_tech'>
        

        <div className='exp'>
            <h1>Skills</h1>
            {isLoggedIn?(
                <>
                    <button className='butn' ><img src={add} className='btnImg'/></button>
                </>
            ):null}
        </div>
           
        </div>
        <div className='div_tech'>
            <h2>Frontend</h2>
            <h2>Backend</h2>
            <h2>Database</h2>
            <h2>Programming Languages</h2>
            <h2>Tools</h2>
            <h2>Deployment</h2>
        </div>
    </section>
  )
}

export default Tech
