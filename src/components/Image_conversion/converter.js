export default function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      resolve(reader.result);  // Resolve with the base64 data
    };
    
    reader.onerror = (error) => {
      reject(error);  // Reject if there's an error during file reading
    };
  });
}
