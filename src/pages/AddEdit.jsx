import React, { useEffect, useState } from 'react';
import { ref, push, onValue, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import db from '../firebase';
import './AddEdit.css';

const initialState = {
    name: '',
    email: '',
    contact: '',
};

function AddEdit() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const contactRef = ref(db, 'contacts');
        onValue(contactRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setData({ ...snapshot.val() });
            }
            else {
                setData({});
            }
        });
        return () => {
            setData({});
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] });
        } else {
            setState({ ...initialState });
        }

        return () => {
            setState(initialState);
        };
    }, [id, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, contact } = state;

        // input form validatation 
        if (name.length < 4 || name.length > 20) {
            toast.error("Name can't be less than of 4 letter or greter than 10 letter");
            return;
        }
        if (email.length < 4 ){
            toast.error("Email type error");
            return;gi
        }

        if (contact.length < 10) {
            toast.error("Please input a valid contact number");
            return;
        }

        if (!name || !email || !contact) {
            toast.error('Please provide a value in each input field');
            return;
        }

        const contactsRef = ref(db, 'contacts');
        if (id) {
            const contactRef = ref(db, `contacts/${id}`);
            update(contactRef, state, (err) => {
                toast.error(err);
            }).then(() => {
                toast.success('Contact updated successfully!');
            });
        } else {
            push(contactsRef, state, (err) => {
                toast.error(err);
            }).then(() => {
                toast.success('Contact added successfully!');
            });
        }

        setTimeout(() => navigate('/'), 500);
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <form
                style={{
                    margin: 'auto',
                    padding: '15px',
                    maxWidth: '400px',
                    alignContent: 'center',
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Your Name'
                    value={state.name || ''}
                    onChange={handleInputChange}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Your Email'
                    value={state.email || ''}
                    onChange={handleInputChange}
                />
                <label htmlFor='contact'>Contact</label>
                <input
                    type='number'
                    id='contact'
                    name='contact'
                    placeholder='Your Contact No'
                    value={state.contact || ''}
                    onChange={handleInputChange}
                />
                <input type='submit' value={id ? "Update" : "Save"} />
            </form>
        </div>
    );
}

export default AddEdit;
