import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './css/ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You need to log in to access this page.',
                });
                return;
            }

            try {
                const response = await fetch('https://hotel.aotrek.net/api/auth/manage', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.categories);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch products. Please try again.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An unexpected error occurred.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdate = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Unauthorized', 'You need to log in to perform this action.', 'error');
            return;
        }

        // Prompt user to enter new details
        const { value: formValues } = await Swal.fire({
            title: 'Update Product',
            html: `
                <input id="name" class="swal2-input" placeholder="Name" value="${product.name}" />
                <input id="title" class="swal2-input" placeholder="Title" value="${product.title}" />
                <textarea id="description" class="swal2-textarea" placeholder="Description">${product.description}</textarea>
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('name').value,
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                };
            },
        });

        if (formValues) {
            try {
                const response = await fetch(`https://hotel.aotrek.net/api/auth/update/${product.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formValues),
                });

                if (response.ok) {
                    Swal.fire('Success', 'Product updated successfully!', 'success');
                    setProducts(products.map(p => p.id === product.id ? { ...p, ...formValues } : p));
                } else {
                    Swal.fire('Error', 'Failed to update product. Please try again.', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'An unexpected error occurred.', 'error');
            }
        }
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Unauthorized', 'You need to log in to perform this action.', 'error');
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will delete the product permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://hotel.aotrek.net/api/auth/delete/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                    setProducts(products.filter(product => product.id !== productId));
                } else {
                    Swal.fire('Error', 'Failed to delete product. Please try again.', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'An unexpected error occurred.', 'error');
            }
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="manage-products">
            <h2>Manage Products</h2>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Title: {product.title}</p>
                            <p>Description: {product.description}</p>
                            <button onClick={() => handleUpdate(product)}>Update</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ManageProducts;
