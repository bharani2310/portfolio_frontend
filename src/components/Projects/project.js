import React from 'react'
import './../../styles/project.css'
// import Portfolio1 from './../assets/portfolio-1.png'
// import Portfolio2 from './../assets/portfolio-2.png'
// import Portfolio3 from './../assets/portfolio-3.png'
// import Portfolio4 from './../assets/portfolio-4.png'
// import Portfolio5 from './../assets/portfolio-5.png'
// import Portfolio6 from './../assets/portfolio-6.png'
import ProjectTemplate from './projectTemplate'



const Project = () => {  
  return (
    <section id='works'>
        <h2 className='worksTitle'>My Projects</h2>
        <span className='workDesc'>I'm a skilled and professionate web developer with experience in creating visually appealing websites.I'm a skilled and professionate web developer with experience in creating visually appealing websites.I'm a skilled and professionate web developer with experience in creating visually appealing websites.</span>
        <div className='worksImgs'>
          <ProjectTemplate/>
        </div>
    </section>
  )
}

export default Project