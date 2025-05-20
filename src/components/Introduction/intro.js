import React,{useState ,useEffect,useContext } from 'react'
import './../../styles/intro.css'
import btnImg from './../assets/hireme.png'
import edit from './../../components/assets/pencil.png'
import load from './../assets/load.gif'
import { Link } from 'react-scroll'
import convertToBase64 from './../Image_conversion/converter.js'
import {UploadImage,getImage} from './support.js'
import { AuthContext } from './../Authentication/authContext.js'
import { scroller,Element } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/loader.css'
import { isCacheValid } from '../utils/TimeStamp.js'

const Intro = () => {

  const [image, setImage] = useState(''); 
  const [file, setFile] = useState(null);
  const [profile,setProfile]=useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const [showEditForm,setShowEditForm]=useState(false)
  const [loading,setLoading]=useState(false)
  const [spinner,setSpinner]=useState(false)


  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      if (selectedFile) {
        const baseImage = await convertToBase64(selectedFile); // Wait for base64 result
        setImage(baseImage);  // Set the base64 image for preview
        setFile(selectedFile); // Update file state for upload
      }
    } catch (error) {
      console.error("Error converting file:", error);  // Log any errors that occur during conversion
    }
  };
  


//   const handleGet = async (name) => {
//     try {
//         const cachedImage = JSON.parse(localStorage.getItem("profile-pic"));

//         if (cachedImage && isCacheValid("profile-pic")) {
//             setProfile(cachedImage);
//             return;
//         }

//         const result = await getImage(name);
//         if (result && result.data) {
//             setProfile(result.data.image);
//             localStorage.setItem("profile-pic", JSON.stringify(result.data.image));
//             localStorage.setItem("profile-pic_timestamp", Date.now()); 
//         }
//     } catch (error) {
//         console.error("Error fetching image:", error);
//     }
// };

const handleGet = async (name) => {
  try {
    const cachedImage = JSON.parse(localStorage.getItem("portfolioData"));
    if (cachedImage) {
      const image = cachedImage?.data?.images[0]?.image;
      if (image) {
        setProfile(image);
      }
    }
  } catch (error) {
    console.error("Error loading image from cache:", error);
  }
};



  

  const handleEdit = async() =>{
    setShowEditForm(!showEditForm)
    // console.log("show",showEditForm)
  }
  
  
  const handleUpload = async () => {
    setSpinner(true); 
  
    try {
      await UploadImage(file);
  
      toast.success("Image Uploaded Successfully");

      const result = await getImage("Profile-Pic");
  
      if (result && result.data) {
        setProfile(result.data.image);
        localStorage.setItem("profile-pic", JSON.stringify(result?.data?.image)); 
      }
  
      setImage('');
      setFile(null); 
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setSpinner(false); 
    }
  };
  

  const move =()=>{
    scroller.scrollTo('contactPage', {
      duration: 500,
      smooth: 'easeInOutQuad',
      offset: -50, 
    });
  }


  useEffect(() => {
    handleGet("Profile-Pic");  
  },[]);

  const btnName = isLoggedIn ? "Change" : "Collaborate";

 

  return (
    <Element name='intro'>
    <section id="intro">
      <ToastContainer/>
        <div className='introContent'>
            <span className='hello'>Hello,</span>
            <span className='introText'>I'm <span className='introName'>Bharanidharan</span><br/>Full Stack Developer</span>
            <div className='para-div'>
              <p className='introPara'>I am a passionate and detail-oriented Software Developer with a strong foundation in Java, Web Development, and Database Management.</p>
            </div>
            {isLoggedIn && 
            <div>
            <label htmlFor="photo" className="custom-file-input">Choose Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />
          </div>}
            <div>
            {isLoggedIn ? (
            image ? (
              <>
                <button className="btn" onClick={handleUpload}>{btnName}</button>
                {spinner && (
                <div className="loader-overlay">
                  <span className="loader"></span>
                </div>
              )}

              </>
            ) : null
          ) : (
            <button className="btn" onClick={move}>
              <img src={btnImg} alt="hire me" className="btnImg" />
              {btnName}
            </button>
          )}


            </div>
        </div> 
        {/* {image ? <img className='bg' src={image} alt='' /> : <img className ='bg' src={profile} alt='' />} */}

        {!loading ? (
          image ? <img className="bg" src={image} alt="profile" /> 
                  : <img src={profile ? profile : load} className={profile?"bg":"bg2"} alt="fallback" />
        ) : (
          <img src={load} className="bg2" alt="loading" />
        )}




        
    </section>
  </Element>
  )
}

export default Intro