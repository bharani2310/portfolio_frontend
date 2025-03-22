import { toast } from 'react-toastify';
import { BASE_URL } from './../utils/config';

export async function getImage(name){

    try {
        const response = await fetch(`${BASE_URL}/getImage?name=${encodeURIComponent(name)}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        });
        const result=await response.json();
        localStorage.setItem("profile-pic", JSON.stringify(result?.data?.image));
        if(!result.success){
            console.log("Failed to fetch data")
        }
        return result
    } catch (error) {

    }
}

export async function UploadImage(file, callback) {
  if (!file) {
    toast.error("Please select an image to upload.");
    return;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;

        const data = {
          name: "Profile-Pic",
          image: base64Image,
        };

        const response = await fetch(`${BASE_URL}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message || 'Error uploading image');
          reject(result);
          return;
        }

        // Store the uploaded image in local storage
        localStorage.setItem("profile-pic", JSON.stringify(result?.data?.image));

        if (callback) callback(); // Execute success callback if provided
        resolve(result);
      } catch (error) {
        toast.error("Failed to upload image.");
        reject(error);
      }
    };

    reader.onerror = (error) => {
      toast.error("Error reading file.");
      reject(error);
    };

    reader.readAsDataURL(file); // Start reading file
  });
}
