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
        if(!result.success){
            console.log("Failed to fetch data")
        }
        return result
    } catch (error) {

    }
}

export async function UploadImage(file, callback) {

  if (!file) {
    return alert("Please select an image to upload.");
  }

  try {
    const reader = new FileReader();
    reader.onloadend = async () => {
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
        return alert(result.message || 'Error uploading image');
      }

      alert("Image Uploaded Successfully");
      if (callback) callback(); // Optional callback for success actions
      console.log('Uploaded Image:', result);
      return result;
    };

    reader.readAsDataURL(file);
  } catch (error) {
    alert("Oops. Try Again");
    console.error('Error Uploading Image:', error);
    throw error;
  }
}
