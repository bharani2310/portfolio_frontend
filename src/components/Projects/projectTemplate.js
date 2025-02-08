import React, { useContext, useState } from 'react';
import './../../styles/ProjectTemplate.css';
import { AuthContext } from '../Authentication/authContext.js';
import deletebtn from '../assets/bin.png';
import edit from '../assets/pencil.png';
import ProjectUpdateForm from './projectUpdateForm.js';
import {Link} from 'react-router-dom';
import { deleteProject } from './support.js';

const ProjectTemplate = ({ id, pic, project, description, url ,overview,features,frontend,backend,database,demo,challenges,deployment}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const data = {
    id,
    pic,
    project,
    description,
    url,
    overview,
    features,
    frontend,
    backend,
    database,
    demo,
    challenges,
    deployment
  };

  const handleEdit = () => {
    setShowUpdateForm(true);
    document.body.classList.add('modal-open'); // Prevent scrolling & apply blur
  };

  const handleClose = () => {
    setShowUpdateForm(false);
    document.body.classList.remove('modal-open'); // Remove blur
  };

  const handleDelete = async() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Project?");
    if(confirmDelete){
      try {
        const result= await deleteProject(id);
        if(result.success){
          window.alert("Deleted Successfully...")
          window.location.reload();
        }
      } catch (error) {
        window.alert("Oops try again...")
      }
    }
    
  }

  return (
    <>
      <div className={`page-content ${showUpdateForm ? 'blurred' : ''}`}>
        <section>
          <div className="card">
            <div className="image-container">
              <img src={pic} alt="Project Preview" className="card-img" />
              {isLoggedIn && (
                <div className="bottom-buttons">
                  <button className="btn" onClick={handleEdit}>
                    <img src={edit} className="btnImg" alt="Edit" />
                  </button>
                  <button className="btn" onClick={handleDelete}>
                    <img src={deletebtn} className="btnImg" alt="Delete" />
                  </button>
                </div>
              )}
            </div>

            <div className="card-body">
              <h3 className="card-title">{project}</h3>
              <p className="card-text">{description}</p>
              <div className="button-container">
                <Link to={`/project/${id}`} className='card-btn'>Learn more</Link>
                <Link to={``} className='card-btn'>Live</Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showUpdateForm && (
        <div className="modal-overlay">
          <div className="modal">
            <ProjectUpdateForm project={data} onClose={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectTemplate;
