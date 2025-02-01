import React from 'react';
import Portfolio6 from './../assets/portfolio-6.png';
import './../../styles/ProjectTemplate.css'; 

const ProjectTemplate = () => {
  return (
    <div className="card">
      <img src={Portfolio6} alt="Project Preview" className="card-img" />
      <div className="card-body">
        <h3 className="card-title">Card Title</h3>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <button className="card-btn">Click to View</button>
      </div>
    </div>
  );
};

export default ProjectTemplate;
