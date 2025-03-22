import React ,{useContext,useEffect,useState} from 'react'
import './../../styles/project.css'
import add from '../../components/assets/add.png'
import ProjectTemplate from './projectTemplate'
import { AuthContext } from '../Authentication/authContext.js'
import ProjectCreateForm from './projectCreateForm.js'
import {Link} from 'react-router-dom';
import {getProject} from './support.js'
import { Element } from 'react-scroll'
import { isCacheValid } from '../utils/TimeStamp.js'



const Project = () => {  
  const { isLoggedIn } = useContext(AuthContext);
  const [showCreateForm,setShowCreateForm]=useState(false); 
  const [scroll,setScroll]=useState(true)
  const [projects,setProjects]=useState([])
  
  const handleGet = async () => {
    try {
        // Retrieve cached data and check if it's valid
        const storedProjects = JSON.parse(localStorage.getItem("projects"));

        if (storedProjects && isCacheValid("projects")) {
            setProjects(storedProjects); // Use cached data
            return;
        }

        // If cache is expired or not available, fetch from API
        const result = await getProject();

        if (result.success) {
            localStorage.setItem("projects", JSON.stringify(result.data)); // Save data
            localStorage.setItem("projects_timestamp", Date.now()); // Store timestamp
            setProjects(result.data); // Update state
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};

  

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

  const handleUpdateProject = (updatedProject) => {
    setProjects(updatedProject);
    setShowCreateForm(false)
  };

    useEffect(() => {
      handleGet();  
    },[]);

  return (
    <Element name='works'>
    <section id='works'>
        <h2 className='worksTitle'>My Projects</h2>
        <span className='workDesc'>I enjoy building user-friendly, interactive, and functional applications using technologies like Java and 
          MERN Stack. My projects often involve real-world problem-solving, API integrations, database management,and responsive UI design.
          Each project has helped me refine my coding, debugging, and collaboration skills, preparing me to work effectively in a professional 
          development environment. I am always looking to improve my projects by incorporating best coding practices, performance optimization, 
          and modern frameworks.</span>
        {isLoggedIn?(
                <>
                  <div className='create'>
                      <button className='btn' onClick={handleCreateClick}><img src={add} className='btnImg'/></button>
                  </div>

                  <div  id={'createProject'}>
                  {isLoggedIn && showCreateForm && (
                    <div>
                      <ProjectCreateForm
                          handleUpdateProject={handleUpdateProject} 
                      />
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
            overview={project.overview}
            features={project.features}
            frontend={project.frontend}
            backend={project.backend}
            database={project.database}
            demo={project.demo}
            challenges={project.challenges}
            deployment={project.deployment}
            handleUpdateProject={handleUpdateProject} 
          />
        ))}
        </div>




        
    </section>
  </Element>
  )
}

export default Project