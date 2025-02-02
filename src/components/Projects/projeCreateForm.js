import React,{useState,useRef} from 'react'
import convertToBase64 from '../Image_conversion/converter.js'
import {createProject} from './support.js'
import '../../styles/projectCreateForm.css'



const ProjectCreateForm = () => {
    const form = useRef();
    
    const [pic,setPic]=useState('')
    

    const [formData, setFormData] = useState({
        pic: "",
        project: "",
        description: "",
        url:""
      });
      console.log("form",formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handlePic = async(e)=>{
          const file = e.target.files[0];
          if (!file) {
            alert("Please select a file.");
            return;
          }
      
          try {
            const base64 = await convertToBase64(file);
            setPic(base64);
            console.log("Converted Base64:", base64);
            console.log("Converted :", pic);
          } catch (error) {
            console.error("Error converting file to Base64:", error);
          }
        }

         const handleCreate = async (e) => {
            e.preventDefault()
            const data = {
              pic,
              project: formData.project,
              description: formData.description,
              url:formData.url
            };
            console.log("final Data",data)
            try {
                  const result=await createProject(data);
                  if(result.success){
                    window.alert("Created Successfully...")
                    window.location.reload();
                  }
                } catch (error) {
                  window.alert("Oops try again...")
                }
            
        
        
          }
      

  return (
            <section>
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


            
                <input type='text' className='name' placeholder='Project name' name='project' onChange={handleChange} required/>
                <textarea placeholder='Project Description' rows={5} name='description' className='msg' onChange={handleChange} required/>
                <input type='text' className='name' placeholder='Project Live URL (Optional)' name='url' onChange={handleChange}/>


                <button type='submit' value='send' className='submitBtn' onClick={handleCreate}>Create</button>

            </form> 
        </section>
  )
}

export default ProjectCreateForm