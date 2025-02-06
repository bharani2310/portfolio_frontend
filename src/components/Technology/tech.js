import React, { useContext, useState, useEffect } from 'react';
import '../../styles/tech.css';
import { AuthContext } from './../Authentication/authContext.js';
import add from '../assets/add.png';
import Form from './Form.js';
import { getTech, deleteTech } from './support.js';

const Tech = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [skills, setSkills] = useState([]);
    const [editingSkill, setEditingSkill] = useState(null);

    const handleEdit = (skill) => {
        setEditingSkill(skill); // Set the skill to be edited
        setIsFormVisible(true);
        document.body.classList.add('modal-open'); // Prevent scrolling
    };

    const handleClose = () => {
        setIsFormVisible(false);
        setEditingSkill(null); // Reset editing state
        document.body.classList.remove('modal-open'); // Remove blur
        fetchSkills(); // Refresh after closing
    };

    const handleClick = () => {
        setEditingSkill(null);
        setIsFormVisible(true);
    };

    const fetchSkills = async () => {
        try {
            const result = await getTech();
            if (result.success) {
                setSkills(result.data);
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
        if (confirmDelete) {
            const result = await deleteTech(id);
            if (result.success) {
                window.alert("Deleted Successfully...")
                window.location.reload()
            }
        }
    };

    const categorizedSkills = {
        Frontend: [],
        Backend: [],
        Database: [],
        ProgrammingLanguage:[],
        Deployment: [],
        Tools: []
    };

    const categoryMapping = {
        "Frontend": "Frontend",
        "Backend": "Backend",
        "Database": "Database",
        "Programming Language": "ProgrammingLanguage", // Corrects spacing issue
        "Deployment": "Deployment",
        "Tools": "Tools"
    };
    
    skills.forEach(skill => {
        const category = categoryMapping[skill.category.trim()]; // Normalize name
        if (category) {
            categorizedSkills[category].push(skill);
        } else {
            console.warn("Unknown category:", skill.category); // Debugging
        }
    });
    return (
        <section id='tech'>
            <div className='div_tech'>
                <div className='exp'>
                    <h1>Skills</h1>
                    {isLoggedIn && (
                        <button className='butn' onClick={handleClick}>
                            <img src={add} className='btnImg' />
                        </button>
                    )}
                </div>
            </div>

            <div className='div_tech'>
                {isFormVisible && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <Form onClose={handleClose} editingSkill={editingSkill} />
                        </div>
                    </div>
                )}

                {Object.entries(categorizedSkills).map(([category, skills]) => (
                    <div key={category} className="category-container">
                    <h2>{category.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>
                    <div className="skill-list">
                        {skills.length > 0 ? (
                            skills.map(skill => (
                                <div key={skill._id} className="skill-card">
                                    <div className="skill-image-wrapper">
                                        <img src={skill.pic} alt={skill.tech} className="skill-img" />
                                        {isLoggedIn && (
                                            <div className="skill-actions">
                                                <button onClick={() => handleEdit(skill)} className="edit-btn">Edit</button>
                                                <button onClick={() => handleDelete(skill._id)} className="delete-btn">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                    <p>{skill.tech}</p>
                                </div>
                            ))
                        ) : (
                            <p>No skills added yet.</p>
                        )}
                    </div>
                </div>
            ))}
            </div>
        </section>
    );
};

export default Tech;
