import React ,{useContext,useEffect,useState} from 'react'
import './../../styles/project.css'
import add from '../../components/assets/add.png'
import ProjectTemplate from './projectTemplate'
import { AuthContext } from '../Authentication/authContext.js'
import ProjectCreateForm from './projeCreateForm.js'
import {Link} from 'react-router-dom';
import {getProject} from './support.js'



const Project = () => {  
  const { isLoggedIn } = useContext(AuthContext);
  const [showCreateForm,setShowCreateForm]=useState(false); 
  const [scroll,setScroll]=useState(true)
  const [projects,setProjects]=useState([])
  
  const handleGet = async() => {
    try {
      const result = await getProject();
      if(result.success){
        setProjects(result.data)
        // console.log("Project",project)
      }
    } catch (error) {

    }
  }

  const handleCreateClick = () => {
    setShowCreateForm(!showCreateForm)
    if(scroll){
      const updateDiv = document.getElementById('createProject');
      if (updateDiv) {
          updateDiv.scrollIntoView({
              behavior: 'smooth',
              block: 'start', 
          });
      } else {
          console.error('Div with id "update" not found.');
      }
    }
    setScroll(!scroll)
  }

    useEffect(() => {
      handleGet();  
    },[]);

  return (
    <section id='works'>
        <h2 className='worksTitle'>My Projects</h2>
        <span className='workDesc'>I'm a skilled and professionate web developer with experience in creating visually appealing websites.I'm a skilled and professionate web developer with experience in creating visually appealing websites.I'm a skilled and professionate web developer with experience in creating visually appealing websites.</span>
        {isLoggedIn?(
                <>
                  <div className='create'>
                      <button className='btn' onClick={handleCreateClick}><img src={add} className='btnImg'/></button>
                  </div>

                  <div  id={'createProject'}>
                  {isLoggedIn && showCreateForm && (
                    <div>
                      <ProjectCreateForm/>
                    </div>
                  )}
                  </div>
                </>
      ):null}





        <div className='worksImgs'>
        {projects.map((project, index) => (
          <ProjectTemplate
            key={index}
            id={project._id}
            pic={project.pic}
            project={project.project}
            description={project.description}
            url={project.url}
          />
        ))}
        </div>

        {/* <Link to = {`project=`}>Book Now</Link> */}



        
    </section>
  )
}

export default Project