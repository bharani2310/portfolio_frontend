import React, { useState,useRef,useEffect } from 'react'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css'
import convertToBase64 from './../Image_conversion/converter.js'
import {BASE_URL} from '../utils/config.js'
import './../../styles/skillCreateForm.css'
import { toast } from 'react-toastify';
import { transformData } from './support.js';

const SkillUpdateForm = ({skill,onClose ,handleUpdateSkill}) => {

  const form = useRef();
  const [pic,setPic]=useState(null)
  const [check,setCheck]=useState(false)
  const[spinner,setSpinner]=useState(false)
  const endDateRef = useRef(null);
  const id=skill.id

  const cachedSkill = JSON.parse(localStorage.getItem("experience"));
  const [skillData, setSkillData] = useState(skill);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePic = async(e)=>{
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setPic(base64);
      console.log("Converted Base64:", base64);
    } catch (error) {
      console.error("Error converting file to Base64:", error);
    }
  }


  const handleCheck = () => {
    setCheck((prevCheck) => {
      const newCheck = !prevCheck; 
      return newCheck;
    });
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSpinner(true);
    
    const data = {
      pic,
      company: formData.company,
      role: formData.role,
      start: formData.start,
      end: check ? "Present" : formData.end,
      description: formData.description,
    };
  
  
    try {
      const response = await fetch(`${BASE_URL}/updateSkill/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.success) {
        toast.success("Updated Successfully");
        onClose();
        const Data = Array.isArray(result?.data) ? result.data.map(transformData) : [transformData(result?.data)];
        const newData=Data[0]
        let experience = JSON.parse(localStorage.getItem("experience")) || [];
  
        const index = experience.findIndex((skill) => skill._id === id);
  
        if (index !== -1) {
          experience[index] = { ...experience[index], ...newData };
        } else {
          experience.push(result.data);
        }
  
        localStorage.setItem("experience", JSON.stringify(experience));
        handleUpdateSkill((experience)); 
        setSkillData((prev) => ({ ...prev, ...result.data }));
  
      } else {
        toast.error("Oops...Try Again");
      }
    } catch (error) {
      console.log("error :", error);
    }
  
    setSpinner(false);
  };
  

  const [formData, setFormData] = useState({
    company: skill.company,
    role: skill.role,
    start:skill.start,
    end:skill.end,
    description: skill.description,
  });



  useEffect(() => {
    // setPic(skill.pic || ''); // Set the initial pic

    flatpickr("#startDate", {
      dateFormat: "F Y",
      altInput: true,
      altFormat: "F Y",
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, start: dateStr }));
      },
    });
    flatpickr("#endDate", {
      dateFormat: "F Y",
      altInput: true,
      altFormat: "F Y",
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, end: dateStr }));
      },
    });
  }, [formData,check,pic]);


  useEffect(() => {
    setPic(skill.pic || "");  // Set initial pic  
  }, []);
  


    // useEffect(() => {
    //   if (!check && endDateRef.current) {
    //     flatpickr(endDateRef.current, {
    //       dateFormat: "F Y",
    //       altInput: true,
    //       altFormat: "F Y",
    //       onChange: (selectedDates, dateStr) => {
    //         setFormData((prev) => ({ ...prev, end: dateStr }));
    //       },
    //     });
    //   }
    // }, [check]);
  
  return (
     <section id='contactPage'>
            <div id='contact'>
                {spinner && (
                  <div className="loader-overlay">
                    <span className="loader"></span>
                  </div>
                )}

                <form className='contactForm' ref={form}>
                    <div className="centered-div">
                      <div className="image">
                      <label htmlFor="pic" className="custom-file-input">Choose Photo</label>
                      <input
                        type="file"
                        id="pic"
                        name="pic"
                        onChange={handlePic}
                      />
                      {pic && <img src={pic} alt="Preview" onChange={handleChange} value={formData.pic || ''} className="img" width={100} height={100}/>}
                      </div>
                    </div>


                
                    <input type='text' className='name' value={formData.company || ''} placeholder='Company name' name='company' onChange={handleChange} required/>
                    <input type='text' className='name' placeholder='Role' value={formData.role || ''} name='role' onChange={handleChange} required/>
                    <textarea placeholder='Experience' rows={5} name='description' className='msg' value={formData.description || ''} onChange={handleChange} required/>
                    <div>
                    <label>
                      <input type="checkbox" id="myCheckbox" onClick={handleCheck}/> I'm currently working here...
                    </label>
                        <div>
                          <label htmlFor="startDate" className="dateLabel">Start Date:</label>
                          <input type="month" id="startDate" value={formData.start || ''} onChange={handleChange} name="start" required className="dateInput"/>
                        </div>

                          <label htmlFor="endDate" className="endDate">End Date:</label>

                        {check && (
                          <div>
                            <input  type="text"  className="name"  placeholder="Present"  id="present"  value="Present"  readOnly/>
                          </div>
                        )}
                        {!check && 
                        (<div>
                            <input type="month" id="endDate" name="end" value={formData.end || ''} required ref={endDateRef} className="dateInput" onChange={handleChange}/>
                          </div>
                        )}
                    </div>
                    <button type='submit' value='send' className='submitBtn' onClick={handleUpdate}>Update</button>
    
                </form> 
            </div>
        </section>
  )
}

export default SkillUpdateForm