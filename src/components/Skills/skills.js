import React,{useContext, useEffect, useState} from 'react';
import './../../styles/skill.css';
import Template from './template.js';
import add from './../../components/assets/add.png'
import { AuthContext } from './../Authentication/authContext.js'
import SkillCreateForm from './skillcreateform.js';
import { getSkill,transformData } from './support.js';
import { Element } from 'react-scroll';
import { isCacheValid } from '../utils/TimeStamp.js'

const Skills = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showCreateForm,setShowCreateForm]=useState(false);
  const [skills, setSkills] = useState([])
  const [scroll,setScroll]=useState(true)
  const [spinner,setSpinner]=useState(false)

  const handleCreateClick = () => {
    setShowCreateForm(!showCreateForm)
    if(scroll){
      const updateDiv = document.getElementById('create');
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

  const handleSkill = async () => {
    setSpinner(true);

    try {
        const cachedSkills = JSON.parse(localStorage.getItem("experience"));

        if (cachedSkills && isCacheValid("experience")) {
            setSkills(cachedSkills); // Use cached data
            setSpinner(false);
            return;
        }

        const result = await getSkill();

        if (result.success) {
            const data = result.data.map(transformData);
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setSkills(sortedData);
            localStorage.setItem("experience", JSON.stringify(sortedData));
            localStorage.setItem("experience_timestamp", Date.now()); // Store timestamp
        }
    } catch (error) {
        console.error("Error fetching skills:", error);
    }

    setSpinner(false);
};

  

  const handleUpdateSkill = (updatedSkill) => {
    setSkills(updatedSkill);
    setShowCreateForm(false)
  };
  


    useEffect(() => {
      handleSkill();  
    },[]);

  return (
    <Element name='skills-section'>
    <section id='skills'>
      {spinner && (
          <div className="loader-overlay">
            <span className="loader"></span>
          </div>
      )}
      <span className='skillTitle'>About</span>
      <span className='skillDesc'>
          Currently holding a Bachelor degree in Computer Science and Engineering and my expertise 
          includes Java, python and other modern web technologies.Beyond my technical skills, I am
          a proactive learner, having completed certifications in Java (NPTEL - IIT Kharagpur) and 
          SQL (HackerRank).I am eager to contribute my skills and problem-solving abilities to 
          innovative projects, collaborating with teams to deliver impactful software solutions.
      </span>
      {isLoggedIn?(
                <>
                  <div className='create'>
                      <button className='btn' onClick={handleCreateClick}><img src={add} className='btnImg'/></button>
                  </div>
                </>
      ):null}

      <div  id='create'>
        {isLoggedIn && showCreateForm && (
          <div>
            <SkillCreateForm 
            handleUpdateSkill={handleUpdateSkill} 
            />
          </div>
        )}
      </div>

     
      <div className='skillBars'>
        {skills.map((skill, index) => (
          <Template
            key={index}
            id={skill._id}
            pic={skill.pic}
            company={skill.company}
            role={skill.role}
            duration={skill.duration}
            description={skill.description}
            handleUpdateSkill={handleUpdateSkill} 
          />
        ))}
      </div>
    </section>
  </Element>
  );
};

export default Skills;
