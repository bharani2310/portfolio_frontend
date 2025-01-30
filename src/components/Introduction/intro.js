import React,{useState ,useEffect,useContext } from 'react'
import './../../styles/intro.css'
import btnImg from './../assets/hireme.png'
import edit from './../../components/assets/pencil.png'
import load from './../assets/load.gif'
import { Link } from 'react-scroll'
import convertToBase64 from './../Image_conversion/converter.js'
import {UploadImage,getImage} from './support.js'
import { AuthContext } from './../Authentication/authContext.js'
import { scroller } from 'react-scroll';
import Editintro from './../Introduction/editintro.js'

const Intro = () => {

  const [image, setImage] = useState(''); 
  const [file, setFile] = useState(null);
  const [profile,setProfile]=useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const [showEditForm,setShowEditForm]=useState(false)
  const [loading,setLoading]=useState(false)


  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      if (selectedFile) {
        const baseImage = await convertToBase64(selectedFile); // Wait for base64 result
        setImage(baseImage);  // Set the base64 image for preview
        console.log("Image", baseImage);  // You can log it to verify
        setFile(selectedFile); // Update file state for upload
      }
    } catch (error) {
      console.error("Error converting file:", error);  // Log any errors that occur during conversion
    }
  };
  


  const handleGet = async (name) => {
    try {
      const result = await getImage(name); 
      if (result && result.data) {
        setProfile(result.data.image);
        console.log("Profile image fetched:"); 
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleEdit = async() =>{
    setShowEditForm(!showEditForm)
    console.log("show",showEditForm)
  }
  
  
  const handleUpload = () => {
    UploadImage(file, () => {
      console.log("Image uploaded! Refreshing data...");
      window.location.reload();
    });
    
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
    <section id="intro">
        <div className='introContent'>
            <span className='hello'>Hello,</span>
            <span className='introText'>I'm <span className='introName'>Bharanidharan</span><br/>Web Developer</span>
            <p className='introPara'>I'm a skilled web developer with experience in creating <br/>multiple websites.</p>
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
                  <button className='btn' onClick={handleUpload}>{btnName}</button>
                ) : null
              ) : (
                <button className='btn' onClick={move}>
                  <img src={btnImg} alt='hire me' className='btnImg' />
                  {btnName}
                </button>
              )}

            </div>
        </div> 
        {/* {image ? <img className='bg' src={image} alt='' /> : <img className ='bg' src={profile} alt='' />} */}

        {!loading && profile ? <img className ='bg' src={profile} alt='' /> : <img src={load} className='bg2' alt='load'/>}



        
    </section>
  )
}

export default Intro