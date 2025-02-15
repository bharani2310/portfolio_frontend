import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export async function createProject(data){
    try {
        const response=await fetch(`${BASE_URL}/createProject`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(data)
        });
        const result= await response.json();
        if(!result.success){
            toast.error("Failed to create.Missing some fields")
        }
        return result;
    } catch (error) {
        toast.error(error)
    }
}

export async function getProject(){
    try {
        const response=await fetch(`${BASE_URL}/getProject/all`,{
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

export async function getSingleProject(id){
    try {
        const response=await fetch(`${BASE_URL}/getProject/${id}`,{
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

export async function updateProject(id,data){
    try {
        const response=await fetch(`${BASE_URL}/updateProject/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(data)
        });
        const result= await response.json();
        return result
    } catch (error) {
        console.log("error :",error)
    }
}

export async function deleteProject(id){
    try {
          const response = await fetch(`${BASE_URL}/deleteProject/${id}`, {
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