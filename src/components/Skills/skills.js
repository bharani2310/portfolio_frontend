import React,{useContext, useEffect, useState} from 'react';
import './../../styles/skill.css';
import Template from './template.js';
import add from './../../components/assets/add.png'
import { AuthContext } from './../Authentication/authContext.js'
import SkillCreateForm from './skillcreateform.js';
import { getSkill,transformData } from './support.js';

const Skills = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showCreateForm,setShowCreateForm]=useState(false);
  const [skills, setSkills] = useState([])
  const [scroll,setScroll]=useState(true)

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

  const handleSkill = async() => {
    try {
      const result=await getSkill();
      if(result.success){
        const data = result.data.map(transformData);
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSkills(sortedData);
      }
    } catch (error) {
      
    }
  }



    useEffect(() => {
      handleSkill();  
    },[]);

  return (
    <section id='skills'>
      <span className='skillTitle'>About</span>
      <span className='skillDesc'>
        I'm a skilled and passionate web developer with experience in creating visually appealing websites.
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
            <SkillCreateForm/>
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
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
