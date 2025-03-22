
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export async function createTechSkill(data,handleUpdateSkill){
    try {
        const response = await fetch(`${BASE_URL}/createTech/newTech`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(data),
        });
        const result = await response.json();
        if(!result.success){
            toast.error("Failed to Create")
        }
        else{
           toast.success("Created Successfully")
           const newTech=result?.data
           const existingTech = JSON.parse(localStorage.getItem("tech")) || [];
           existingTech.push(newTech);
           localStorage.setItem("tech", JSON.stringify(existingTech));
           handleUpdateSkill(existingTech)
        }
        return result;
    } catch (error) {
        console.log("error :",error)
    }
}

export async function getTech(){
    try {
        const response=await fetch(`${BASE_URL}/getTech/all`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
            }
        });
        const result= await response.json();
        if(!result.success){
            console.log('Failed to fetch');
        }
        return result;
    } catch (error) {
        console.log("error :",error)
    }
}

export async function updateTech(id,data,handleUpdateSkill){
    try {
        const response=await fetch(`${BASE_URL}/updateTech/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(data)
        });
        const result= await response.json();
        if(!result.success){
            toast.error("Failed to Update")
        }
        else{
            toast.success("Updated Successfully")
            let tech = JSON.parse(localStorage.getItem("tech")) || [];
  
            const index = tech.findIndex((tech) => tech._id === id);
    
            if (index !== -1) {
                tech[index] = { ...tech[index], ...result.data };
            } else {
                tech.push(result.data);
            }
    
            localStorage.setItem("tech", JSON.stringify(tech));
            handleUpdateSkill((tech));     
            }
            return result
    } catch (error) {
        console.log("error :",error)
    }
}

export async function deleteTech(id,handleUpdateSkill){
    try {
        const response = await fetch(`${BASE_URL}/deleteTech/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json' 
          },
        });
        const result = await response.json();
        if(result?.success){
            let tech = JSON.parse(localStorage.getItem("tech")) || [];

            // Filter out the skill with the matching ID
            tech = tech.filter((tech) => tech._id !== id);

            // Update local storage
            localStorage.setItem("tech", JSON.stringify(tech));

            // Update state
            handleUpdateSkill(tech);
        }
        return result
        
      } catch (error) {

      }
}