import { BASE_URL } from "../utils/config";

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
            console.log("Failed to fetch")
        }
        return result;
    } catch (error) {
        console.log("error :",error)
    }
}

export async function getProject(){
    try {
        console.log("Start")
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