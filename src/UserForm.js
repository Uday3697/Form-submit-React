import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [currentAlertMsg, setCurrentAlertMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/submit-form', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Form submitted successfully');
            setFormData({
                name: '',
                email: '',
                phone: '',
                city: '',
            });
            console.log(response.data); // Log response from server
        } catch (error) {
            console.error('Error:', error);
            // Show error alert message
            alert('Error submitting form');
        }
    };

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
                setCurrentAlertMsg('');
            }, 3000); // Show alert for 3 seconds
        }
    }, [showAlert]);

    return (
        <>
            <h1 style={{ textAlign: "center",color:"gold" }}>
                 User Submit Form 
            </h1>

            <form className='inpCard' onSubmit={handleSubmit}>
                <input className='inpBox' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input className='inpBox' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input className='inpBox' type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                <input className='inpBox' type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                <button className='inpBox' type="submit">Submit</button>
            </form>
            {showAlert && <div className="alertmsg">{currentAlertMsg}</div>}
        </>
    );
};

export default UserForm;
