import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderAdmin() {
    return (
        <div>
            <center>
                <ul style={{ color: 'green' }}>
                    <Link to="/admin/addProducts"><li> Add Products</li></Link>
                    <Link to="/admin/profile"><li>Profile</li></Link>
                    <Link to="/admin/deleteProducts"><li> Delete Product </li></Link>
                    <Link to="/admin/updateProducts"><li> Update Product </li></Link>
                </ul>
            </center>
        </div>
    )
}