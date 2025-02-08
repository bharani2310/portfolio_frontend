import { BASE_URL } from "../utils/config";

export async function verify(credential){
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(credential) 
        });
        const result=await response.json();
        return result
    } catch (error) {

    }
}