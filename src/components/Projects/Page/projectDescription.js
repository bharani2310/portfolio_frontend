import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getSingleProject } from '../support';
import './../../../styles/projectDescription.css'


const ProjectDescription = () => {

    const { id } = useParams();
    const [data, setData] = useState({
        id: "",
        pic: "",
        project: "",
        description: "",
        url: "",
        overview: "",
        features: "",
        frontend: "",
        backend: "",
        database: "",
        demo: "",
        challenges: "",
        deployment: ""
      });
      const [spinner,setSpinner]=useState(false)

    const handleGet = async() => {
        setSpinner(true)
        try {
          const result = await getSingleProject(id);
          if(result.success){
             console.log("Single Project",result.data.frontend)
             setData(result.data)
          }
        } catch (error) {
    
        }
        setSpinner(false)
      }

    useEffect(() => {
        handleGet();  
    },[]);

    return (
        <div className='project-Desc'>
            {spinner && (
                  <div className="loader-overlay">
                    <span className="loader"></span>
                  </div>
                )}
            {data.pic && <img className='project-img' src={data.pic}/>}

            {data.project && <h1 className='main-heading'>{data.project}</h1>}

            {data.demo && 
                <div className="video-container">
                    <iframe src={data.demo} allow="autoplay"  allowFullScreen  title="Google Drive Video" className='video'></iframe>
                </div>}
                        
            {data.description && (
                <>
                    <h2>Project Description :</h2>
                    <p>{data.description}</p>
                </>
            )}

            {data.overview && (
                <>
                    <h2>Project Overview :</h2>
                    <p>{data.overview}</p>
                </>
            )}

            {data.features?.length > 0 && (
                <>
                    <h2>Project Features :</h2>
                    <p>{data.features}</p>
                </>
            )}

            {(data.frontend || data.backend || data.database) && (
                <>
                    <h2>Tech Stack :</h2>
                    <ul>
                        {data.frontend && <li>Frontend : {data.frontend}</li>}
                        {data.backend && <li>Backend : {data.backend}</li>}
                        {data.database && <li>Database : {data.database}</li>}
                    </ul>
                </>
            )}

            {data.challenges && (
                <>
                    <h2 style={{'margin-top':'2rem'}}>Challenges :</h2>
                    <p>{data.challenges}</p>
                </>
            )}

            {data.deployment && (
                <>
                    <h2>Deployment :</h2>
                    <p>{data.deployment}</p>
                </>
            )}
        </div>

    )
}

export default ProjectDescription