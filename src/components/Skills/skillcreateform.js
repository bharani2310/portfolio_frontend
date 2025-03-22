import React, { useState,useRef,useEffect } from 'react'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css'
import convertToBase64 from './../Image_conversion/converter.js'
import {BASE_URL} from '../utils/config.js'
import './../../styles/skillCreateForm.css'
import { ToastContainer, toast } from 'react-toastify';
import { transformData } from './support.js';

const SkillCreateForm = ({handleUpdateSkill}) => {

  const form = useRef();
  const [pic,setPic]=useState('')
  const [check,setCheck]=useState(false)
  const [spinner,setSpinner]=useState(false)
  const endDateRef = useRef(null);

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
  

  const handleCreate = async (e) => {
    e.preventDefault()
    setSpinner(true)
    const data = {
      pic,
      company: formData.company,
      role: formData.role,
      start:formData.start,
      end:check ? "Present" : formData.end,
      description: formData.description,
    };

     try {
        const response=await fetch(`${BASE_URL}/createSkill/newSkill`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(data)
        });
        const result= await response.json();
        if(result.success){
          toast.success('Created Successfully')

          // const newData = result?.data;

          const Data = Array.isArray(result?.data) ? result.data.map(transformData) : [transformData(result?.data)];

          const newData=Data[0]


          // Get existing data from localStorage
          const existingData = JSON.parse(localStorage.getItem("experience")) || [];

          // Push new data
          existingData.push(newData);

          const sortedData = existingData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          // Save updated data back to localStorage
          localStorage.setItem("experience", JSON.stringify(sortedData));
          handleUpdateSkill(sortedData)

        }
        else{
          toast.error('Oops...Try Again')
        }
    } catch (error) {
        console.log("error :",error)
    }
    setSpinner(false)

  }

  const [formData, setFormData] = useState({
    pic: "",
    company: "",
    role: "",
    start:"",
    end:"",
    description: "",
  });


  useEffect(() => {

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
                      {pic && <img src={pic} alt="Preview" className="img" width={100} height={100}/>}
                      </div>
                    </div>


                
                    <input type='text' className='name' placeholder='Company name' name='company' onChange={handleChange} required/>
                    <input type='text' className='name' placeholder='Role' name='role' onChange={handleChange} required/>
                    <textarea placeholder='Experience' rows={5} name='description' className='msg' onChange={handleChange} required/>
                    <div className='current'>
                    <label>
                      <input type="checkbox" id="myCheckbox" onClick={handleCheck}/> I'm currently working here...
                    </label>
                    </div>
                    <div>
                        <div>
                          <label htmlFor="startDate" className="dateLabel">Start Date:</label>
                          <input type="month" id="startDate"  name="start" required className="dateInput"/>
                        </div>
                        <label htmlFor="endDate" className="dateLabel">End Date:</label>

                        {check && (
                          <div>
                            <input  type="text"  className="name"  placeholder="Present"  id="present"  value="Present"  readOnly/>
                          </div>
                        )}
                        {!check && 
                        (<div>
                            <input type="month" id="endDate" name="end" required ref={endDateRef} className="dateInput" onChange={handleChange}/>
                          </div>
                        )}
                        </div>

                    <button type='submit' value='send' className='submitBtn' onClick={handleCreate}>Create</button>
    
                </form> 
            </div>
        </section>
  )
}

export default SkillCreateForm