import React,{useState,useRef} from 'react'
import convertToBase64 from '../Image_conversion/converter.js'
import {createProject} from './support.js'
import '../../styles/projectCreateForm.css'
import { toast } from 'react-toastify'



const ProjectCreateForm = () => {
    const form = useRef();
    
    const [pic,setPic]=useState('')
    const [spinner,setSpinner]=useState(false)
    

    const [formData, setFormData] = useState({
        pic: "",
        project: "",
        description: "",
        url:"",
        overview:"",
        features:"",
        frontend:"",
        backend:"",
        database:"",
        demo:"",
        challenges:"",
        deployment:""
      });
      console.log("form",formData)

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
            console.log("Converted :", pic);
          } catch (error) {
            console.error("Error converting file to Base64:", error);
          }
        }

         const handleCreate = async (e) => {
            e.preventDefault()
            setSpinner(true)
            const updatedUrl = formData.demo.replace("view?usp=drive_link", "preview");
            const data = {
              pic,
              project: formData.project,
              description: formData.description,
              url:formData.url,
              overview:formData.overview,
              features:formData.features,
              frontend:formData.frontend,
              backend:formData.backend,
              database:formData.database,
              demo:updatedUrl,
              challenges:formData.challenges,
              deployment:formData.deployment
            };
            console.log("final Data",data)
            try {
                  const result=await createProject(data);
                  if(result.success){
                    toast.success("Created Successfully...")
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                } catch (error) {
                  toast.error("Oops try again...")
                }
            
           setSpinner(false)
        
          }
      

  return (
            <section>
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


            
                <input type='text' className='name' placeholder='Project name' name='project' onChange={handleChange} required/>
                <textarea placeholder='One Line Description' rows={5} name='description' className='msg' onChange={handleChange} required/>
                <input type='text' className='name' placeholder='Project Live URL (Optional)' name='url' onChange={handleChange}/>
                <textarea placeholder='Project Overview' rows={5} name='overview' className='msg' onChange={handleChange} />
                <textarea placeholder='Project Features' rows={5} name='features' className='msg' onChange={handleChange} />
                <input type='text' className='name' placeholder='Frontend' name='frontend' onChange={handleChange} />
                <input type='text' className='name' placeholder='Backend' name='backend' onChange={handleChange} />
                <input type='text' className='name' placeholder='Database' name='database' onChange={handleChange} />

                <input type='text' className='name' placeholder='Demo Link' name='demo' onChange={handleChange} />
                <textarea placeholder='Challenges' rows={5} name='challenges' className='msg' onChange={handleChange} />
                <textarea placeholder='Deployment and Hosting' rows={5} name='deployment' className='msg' onChange={handleChange} />




                <button type='submit' value='send' className='submitBtn' onClick={handleCreate}>Create</button>

            </form> 
        </section>
  )
}

export default ProjectCreateForm