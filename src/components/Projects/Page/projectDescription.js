import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getSingleProject } from '../support';

const ProjectDescription = () => {

    const { id } = useParams();

    const handleGet = async() => {
        try {
          const result = await getSingleProject(id);
          if(result.success){
             console.log("Single Project",result.data)
          }
        } catch (error) {
    
        }
      }

    useEffect(() => {
        handleGet();  
    },[]);

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default ProjectDescription