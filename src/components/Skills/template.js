import React , {useContext, useState} from 'react';
import './../../styles/template.css'
import { AuthContext } from './../Authentication/authContext.js'
import deletebtn from './../../components/assets/bin.png'
import edit from './../../components/assets/pencil.png'
import SkillUpdateForm from './skillupdateform.js';
import { BASE_URL } from '../utils/config.js';
import { toast } from 'react-toastify';

const Template = ({id, pic, company,role, duration, description,handleUpdateSkill }) => {

  const updatedString = duration.replace('Invalid Date', 'Present');
  const { isLoggedIn } = useContext(AuthContext);
  const [showUpdateForm,setShowUpdateForm]=useState(false)
  const [spinner,setSpinner]=useState(false)
  const str = duration.split('-').map((item) => item.trim());
  const start=str[0]
  const end=str[1]
  
  const array={
    id,pic,company,role,start,end,description
  }


  const [scroll,setScroll]=useState(true)

  function calculateDuration(start, end) {
    const startDate = new Date(start);
    let endDate = new Date();
    if(end==='Present' || end==='Invalid Date'){
       endDate = new Date();
    }
    else{
       endDate = new Date(end);
    }

    

  
    const totalMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
  
    if (totalMonths < 12) {
      return `${totalMonths} months`;
    } else {
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} years and ${months} months`;
    }
  }

  const yearDuration=calculateDuration(start,end);

  const scrollDown = (id) => {
    if (scroll) {
      const updateDiv = document.getElementById(id);
      if (updateDiv) {
        updateDiv.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Aligns the div to the top of the viewport
        });
      } else {
        console.error('Div with id "update" not found.',id);
      }
    }
    setScroll(!scroll);
  };

  const handleEdit = (id) =>{
    setShowUpdateForm(!showUpdateForm)
    scrollDown(id)
  }

  const handleDelete = async() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    setSpinner(true)
    if(confirmDelete){
      try {
        const response = await fetch(`${BASE_URL}/deleteSkill/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json' 
          },
        });
        const result = await response.json();
        if (!response.ok) {
          return toast.error(result.message);
        }
        toast.success("Deleted Successfully...")
        
        let experience = JSON.parse(localStorage.getItem("experience")) || [];

        // Filter out the skill with the matching ID
        experience = experience.filter((skill) => skill._id !== id);

        // Update local storage
        localStorage.setItem("experience", JSON.stringify(experience));

        // Update state
        handleUpdateSkill(experience);
        
      } catch (error) {
        toast.error('Oops. Try Again');
      }
    }
    setSpinner(false)
  }

  return (
    <section>
        <div className='skillBar'>
              {spinner && (
                  <div className="loader-overlay">
                    <span className="loader"></span>
                  </div>
                )}
          <img className='skillBarImg' src={pic} alt={company} />
          <div className='skillBarText'>
            <h2><span style={{color:'yellow'}}>{company}</span> - {role}</h2>
            <h5>{updatedString} - {yearDuration}</h5>
            <p>{description}</p>
          </div>
        <div>
            {isLoggedIn?(
              <>
             <button
                className="btn"
                onClick={() => handleEdit(`update-${id}`)} // Pass `update-${id}` to the function
              >
              <img src={edit} className="btnImg" />
            </button>

                <button className='btn' onClick={handleDelete}><img src={deletebtn}  className='btnImg'/></button>
              </>
            ):null}
        </div>
        </div>

        <div id={`update-${id}`}>
        {isLoggedIn && showUpdateForm && (
        <SkillUpdateForm 
          skill={array} 
          onClose={() => {
            setShowUpdateForm(false);
            setScroll(!scroll); 
          }} 
          handleUpdateSkill={handleUpdateSkill}
        />
      )}

        </div>
    </section>
    
    
  );
};

export default Template;
