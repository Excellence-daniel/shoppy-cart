import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import './index.css'

export default function HeaderAdmin() {
    return (
        <div>
            <center>
                <ul style={{ color: 'green' }}>
                    <Link to="/admin/addProducts"><li> Add Products</li></Link>
                    <Link to="/admin/deleteProducts"><li> Delete Product </li></Link>
                    <Link to="/admin/updateProducts"><li> Update Product </li></Link>
                    <Tooltip
                        title={
                            <React.Fragment>
                                {sessionStorage.getItem("email")}
                            </React.Fragment>
                        }
                    >
                        <button className="user__button">
                            <i className="fas fa-user user__icon" />
                        </button>
                    </Tooltip>

                </ul>
            </center>
        </div>
    )
}