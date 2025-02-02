import React,{useRef,useState,useEffect} from 'react'
import convertToBase64 from '../Image_conversion/converter';
import { updateProject } from './support';

const ProjectUpdateForm = ({project,onClose}) => {

  console.log("pppppp",project)

  const form = useRef();
  const [pic,setPic]=useState(null)
  

    const [formData, setFormData] = useState({
      project: project.project,
      description: project.description,
      url:project.url,
      overview:project.overview,
      features:project.features,
      frontend:project.frontend,
      backend:project.backend,
      database:project.database,
      demo:project.demo,
      challenges:project.challenges,
      deployment:project.deployment
    });
  

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
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
    
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
          demo:formData.demo,
          challenges:formData.challenges,
          deployment:formData.deployment
        };
        console.log("Update",data)
    
      try {
            const result=await updateProject(project.id,data);
            if(result.success){
              alert('Updated Successfully')
              window.location.reload()
            }
            } catch (error) {
                window.alert("Oops try again...")
          }  
          window.location.reload();
      }

      useEffect(() => {
          setPic(project.pic || "");  // Set initial pic  
        }, []);
  
  return (
    <section>
            <div>
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


                
                    <input type='text' className='name' value={formData.project || ''} placeholder='Project name' name='project' onChange={handleChange} required/>
                    <textarea placeholder='Description' rows={5} name='description' className='msg' value={formData.description || ''} onChange={handleChange} required/>
                    <input type='text' className='name' value={formData.url || ''} placeholder='Project URL (Optional)' name='url' onChange={handleChange} />

                    <textarea placeholder='Project Overview' value={formData.overview || ''} rows={5} name='long_description' className='msg' onChange={handleChange} />
                    <textarea placeholder='Project Features' rows={5} value={formData.features || ''} name='features' className='msg' onChange={handleChange} />
                    <input type='text' className='name' placeholder='Frontend' value={formData.frontend || ''} name='frontend' onChange={handleChange} />
                    <input type='text' className='name' placeholder='Backend' value={formData.backend || ''} name='backend' onChange={handleChange} />
                    <input type='text' className='name' placeholder='Database' value={formData.database || ''} name='database' onChange={handleChange} />
                    <input type='text' className='name' placeholder='Demo Link' value={formData.demo || ''} name='demo' onChange={handleChange} />
                    <textarea placeholder='Challenges' rows={5} name='challenges' value={formData.challenges || ''} className='msg' onChange={handleChange} />
                    <textarea placeholder='Deployment and Hosting' rows={5} name='deployment' value={formData.deployment || ''} className='msg' onChange={handleChange} />

                    <div>
                      <button  className='submitBtn' onClick={onClose}>Cancel</button>
                      <button type='submit' value='send' className='submitBtn' onClick={handleUpdate}>Update</button>
                    </div>
                    
    
                </form> 
            </div>
        </section>
  )
}

export default ProjectUpdateForm