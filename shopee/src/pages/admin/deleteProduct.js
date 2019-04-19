import React, { Component } from 'react';
import TextInput from './textField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class DeleteProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [{ 'calories': 12, 'fat': 10, 'name': 'YUam', 'carbs': 20, 'protein': 29 }],
            product: []
        }
    }
    searchProduct = async () => {

    }

    deleteProduct = async () => {
        const confirmDelete = window.confirm('You are about to delete this product?');
        if (confirmDelete) {

        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div style={{ marginTop: '5%' }}>
                        <p><TextInput label={"Search With Product Name"} icon={'fas fa-search'} function={this.searchProduct} /></p>
                        <p>
                            <Button variant="contained" color="primary">
                                Search Product
                        </Button>
                        </p>
                        {this.state.product.length > 0 ?
                            <div>
                                <p className="col-12" id="productDetail">
                                    <Paper >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product Name</TableCell>
                                                    <TableCell align="right">Product Price</TableCell>
                                                    <TableCell align="right">Product Tags</TableCell>
                                                    <TableCell align="right">Product Brand</TableCell>
                                                    <TableCell align="right">Product Category</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.rows.map(row => (
                                                    <TableRow key={row.id}>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                        <TableCell align="right">{row.protein}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </p>
                                <p className="col-12">
                                    <Button variant="contained" onClick={this.deleteProduct} color="secondary">
                                        Delete Product
                                    </Button>
                                </p>
                            </div>
                            :
                            []
                        }
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        )
    }
}