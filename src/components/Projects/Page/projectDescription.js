import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getSingleProject } from '../support';
import './../../../styles/projectDescription.css'
import { useNavigate,Link } from "react-router-dom";

const ProjectDescription = () => {

    const { id } = useParams();
    const navigate = useNavigate();
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

      const handleGet = async () => {
        setSpinner(true);
        try {
            const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
            const foundProject = storedProjects.find(proj => proj._id === id);
            if (foundProject) {
                setData(foundProject); // Use stored data
            } else {
                const result = await getSingleProject(id);
                if (result.success) {
                    localStorage.setItem("projects", JSON.stringify([...storedProjects, result.data]));
                    setData(result.data); // Update state
                }
            }
        } catch (error) {
            console.error("Error fetching project:", error);
        } finally {
            setSpinner(false); // Ensure spinner stops
        }
    };
    
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
            <div className='style-btn'>
                <button className='btn' onClick={() => navigate(-1)}>Back</button>
                {data?.url && <Link to={data?.url} className='btn'>Live</Link>}
            </div>
        </div>

    )
}

export default ProjectDescription