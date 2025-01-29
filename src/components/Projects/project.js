import React from 'react'
import './../../styles/project.css'
import Portfolio1 from './../assets/portfolio-1.png'
import Portfolio2 from './../assets/portfolio-2.png'
import Portfolio3 from './../assets/portfolio-3.png'
import Portfolio4 from './../assets/portfolio-4.png'
import Portfolio5 from './../assets/portfolio-5.png'
import Portfolio6 from './../assets/portfolio-6.png'



const Project = () => {  
  return (
    <section id='works'>
        <h2 className='worksTitle'>My Projects</h2>
        <span className='workDesc'>I'm a skilled and professionate web developer with experience in creating visually appealing websites.I'm a skilled and professionate web developer with experience in creating visually appealing websites.I'm a skilled and professionate web developer with experience in creating visually appealing websites.</span>
        <div className='worksImgs'>
            <img src={Portfolio1} alt='Portfolio1' className='worksImg'></img>
            <img src={Portfolio2} alt='Portfolio2' className='worksImg'></img>
            <img src={Portfolio3} alt='Portfolio3' className='worksImg'></img>
            <img src={Portfolio4} alt='Portfolio4' className='worksImg'></img>
            <img src={Portfolio5} alt='Portfolio5' className='worksImg'></img>
            <img src={Portfolio6} alt='Portfolio6' className='worksImg'></img>
        </div>
    </section>
  )
}

export default Project