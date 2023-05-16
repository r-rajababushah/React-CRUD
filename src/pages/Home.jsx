import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { Link } from 'react-router-dom'
import "./Home.css";
import { toast } from 'react-toastify';

import db from '../firebase'

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const contactRef = ref(db, 'contacts');
        onValue(contactRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const contactList = Object.entries(data).map(([key, value]) => {
                    return { id: key, ...value };
                });
                setData(contactList);
            }
        });
    }, []);

    const onDelete = (id) => {
        if (window.confirm("Are you sure that you wanted to delete that contact?")) {
            const contactRef = ref(db, `contacts/${id}`);
            remove(contactRef)
                .then(() => {
                    setData(prevState => prevState.filter(contact => contact.id !== id));
                    toast.success("Contact deleted successfully!");
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Contact</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((contact, index) => {
                        return (
                            <tr key={contact.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.contact}</td>
                                <td>
                                    <Link to={`/update/${contact.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => onDelete(contact.id)}>Delete</button>
                                    <Link to={`/view/${contact.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home
