import React,{ useState,useRef,useEffect } from 'react'


const Editintro = () => {
    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [formData, setFormData] = useState({
        msg1: '',
    });

    const handleEdit = async() =>{
        
    }


    return (
        <section id='contactPage'>
        <div id='contact'>
            <form className='contactForm' ref={form}>        
                <input type='text' className='name' value={formData.msg1 || ''} placeholder='Message' name='msg1' onChange={handleChange} required/>
                <button type='submit' value='send' className='submitBtn' onClick={handleEdit}>Update</button>
            </form> 
        </div>
    </section>
    )
}

export default Editintro