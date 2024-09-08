import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/CreateProduct.css';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'https://hotel.aotrek.net/api/auth/create',
                {
                    name,
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire('Success', 'Product created successfully!', 'success');

            setName('');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
            Swal.fire('Error', 'Failed to create product. Please try again.', 'error');
        }
    };

    return (
        <div className="create-product-container">
            <h2>Create Product</h2>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Product Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    required
                />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;
