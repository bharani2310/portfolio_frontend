import { BASE_URL } from "../utils/config"



export async function createSkill(data){
    try {
        const response = await fetch(`${BASE_URL}/createSkill/newSkill`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(data),
        });
        const result = await response.json();
        if(!result.success){
            console.log("Failed to fetch")
        }
        return result;
    } catch (error) {
        console.log("error :",error)
    }
}

export async function getSkill(){
    try {
        const response=await fetch(`${BASE_URL}/getSkill/all`,{
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


export const transformData = (data) => {
    const { _id,pic, company, role, start, end ,description,createdAt} = data;
  
    const options = { year: 'numeric', month: 'long' };
    const startDate = new Date(start).toLocaleDateString(undefined, options);
    const endDate = new Date(end).toLocaleDateString(undefined, options);
    const dur=`${startDate} - ${endDate}`

    

    return {
      _id,
      pic, 
      company,
      role: role.charAt(0).toUpperCase() + role.slice(1), 
      duration: dur,
      description:description,
      createdAt
    };
  };