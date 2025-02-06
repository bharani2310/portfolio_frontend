import React, { useRef, useState, useEffect } from 'react';
import convertToBase64 from '../Image_conversion/converter.js';
import '../../styles/form.css';
import { createTechSkill, updateTech } from './support.js';

const Form = ({ onClose, editingSkill }) => {
    const form = useRef();
    const categories = ["Frontend", "Backend", "Database","Programming Language", "Deployment", "Tools"];

    const [formData, setFormData] = useState({
        pic: '',
        tech: '',
        category: '',
    });

    useEffect(() => {
        if (editingSkill) {
            setFormData(editingSkill);
        }
    }, [editingSkill]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePic = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const base64 = await convertToBase64(file);
            setFormData(prev => ({ ...prev, pic: base64 }));
        } catch (error) {
            console.error("Error converting file:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await updateTech(editingSkill._id, formData);
            } else {
                await createTechSkill(formData);
            }
            onClose();
            window.location.reload()
        } catch (error) {
            console.error("Error submitting skill:", error);
        }
    };

    return (
        <div id='form' className='form'>
            <form className='contactForm' ref={form} onSubmit={handleSubmit}>
                <div className="image">
                    <label htmlFor="pic" className="custom-file-input">Choose Photo</label>
                    <input type="file" id="pic" name="pic" onChange={handlePic} />
                    {formData.pic && <img src={formData.pic} alt="Preview" className="img" width={100} height={100} />}
                </div>
                <input type='text' style={{width:'80%'}} className='name' placeholder='Technology Name' name='tech' value={formData.tech} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className='btn-container'>
                    <button className='butn' type="button" onClick={onClose}>Close</button>
                    <button className='butn' type="submit">{editingSkill ? "Update" : "Submit"}</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
