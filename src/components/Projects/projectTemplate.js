import React,{useContext} from 'react';
import Portfolio6 from './../assets/portfolio-6.png';
import './../../styles/ProjectTemplate.css'; 
import { AuthContext } from '../Authentication/authContext.js'
import deletebtn from '../assets/bin.png'
import edit from '../assets/pencil.png'



const ProjectTemplate = ({id, pic, project, description,url }) => {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <div className="card">
      <div className="image-container">
        <img src={pic} alt="Project Preview" className="card-img" />
        {isLoggedIn && (
          <div className="bottom-buttons">
            <button className="btn">
              <img src={edit} className="btnImg" alt="Edit" />
            </button>
            <button className="btn">
              <img src={deletebtn} className="btnImg" alt="Delete" />
            </button>
          </div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{project}</h3>
        <p className="card-text">
          {description}
        </p>
        <div className='button-container'>
        <button className="card-btn">Learn more</button>
        <button className="card-btn">Live</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
