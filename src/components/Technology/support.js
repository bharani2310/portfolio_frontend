
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export async function createTechSkill(data){
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

export async function updateTech(id,data){
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
        }
        return result
    } catch (error) {
        console.log("error :",error)
    }
}

export async function deleteTech(id){
    try {
        const response = await fetch(`${BASE_URL}/deleteTech/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json' 
          },
        });
        const result = await response.json();
        return result
        
      } catch (error) {

      }
}