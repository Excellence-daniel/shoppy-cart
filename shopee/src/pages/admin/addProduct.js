import React, { Component } from 'react';
import TextInput from './textField';
import { Redirect } from 'react-router-dom';
import SelectField from './selectField';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import './index.css';
import { server_database_url, showToast, loader } from '../../config';


export default class AddProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            labelWidth: 0,
            productCategory: '',
            productBrand: '',
            productPrice: '',
            tags: [],
            productDescription: '',
            image: '',
            addProductQueryStatus: false
        }
    }

    handleProductName = event => {
        this.setState({ productName: event.target.value });
    };

    handleProductCategorySelect = (e) => {
        this.setState({ productCategory: e.target.value });
    }

    handleSelectProductBrand = (e) => {
        this.setState({ productBrand: e.target.value });
    }

    handleImage = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleProductPrice = (e) => {
        this.setState({ productPrice: e.target.value });
    }

    handleTagDelete = data => () => {
        this.setState(state => {
            const tags = [...state.tags];
            const chipToDelete = tags.indexOf(data);
            tags.splice(chipToDelete, 1);
            return { tags };
        });
    }

    handleAddTag = (e) => {
        const { tags } = this.state;
        const tag = e.target.value;
        if (tags.indexOf(tag) < 0) {
            tags.push(tag);
            this.setState({ tags: tags });
        }
    }

    handleProductDescription = (e) => {
        this.setState({ productDescription: e.target.value.trim() });
    }

    addProduct = async (e) => {
        this.setState({ addProductQueryStatus: true });
        const { productBrand, productName, productCategory, productPrice, productDescription, tags, image } = this.state;
        if (productDescription !== '' &&
            productBrand !== '' &&
            productCategory !== '' &&
            productName !== '' &&
            tags.length > 0 &&
            image !== '' &&
            productPrice !== ''
        ) {
            const data = new FormData();
            data.append('productBrand', productBrand);
            data.append('productCategory', productCategory);
            data.append('productDescription', productDescription);
            data.append('productName', productName);
            data.append('productPrice', productPrice);
            data.append('tags', tags);
            data.append('file', this.state.image, this.state.image.name);

            try {
                const addProductQuery = await axios.post(`${server_database_url}/addProduct`, data);
                console.log(addProductQuery, 'result');
                if (addProductQuery.status === 200) {
                    showToast(addProductQuery.data.statusmessage);
                    this.setState({ addProductQueryStatus: false, productBrand: '', productName: '', productCategory: '', productDescription: '', tags: [], image: '', productPrice: '' });
                } else {
                    showToast(addProductQuery.data.statusmessage);
                    this.setState({ addProductQueryStatus: false });
                }
            }
            catch (e) {
                this.setState({ addProductQueryStatus: false });
                console.log(e);
                showToast(e.message);
                return;
            }
        } else {
            showToast("Fill all fields!");
            this.setState({ addProductQueryStatus: false });
        }
    }

    render() {
        const { addProductQueryStatus } = this.state;
        if (sessionStorage.getItem('email')) {
            return (
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        {/* <form onSubmit={this.addProduct} method="post" enctype="multipart/form-data" > */}
                        <div className="row" style={{ marginTop: '5%' }}>
                            <p className="col-6" id="productName ">
                                <TextInput label={"Product Name"} icon={'fas fa-search'} function={this.handleProductName} />
                            </p>

                            <p className="col-6" id="productCategory" style={{ marginTop: 0 }}>
                                <SelectField label="Product Category" categories={['Men', 'Women', 'Unisex', 'FootWear']} value={this.state.productCategory} function={this.handleProductCategorySelect} />
                            </p>

                            <p className="col-6" id="productBramd">
                                <SelectField label="Product Brand"
                                    categories={['Nike', 'Hugo Boss', 'Gucci', 'Diesel', 'Versace', 'Prada', 'Zara', 'Burberry', 'Louis Vuitton', 'Calvin Klein', 'Adidas', 'Tommy Hilfiger']}
                                    value={this.state.productBrand}
                                    function={this.handleSelectProductBrand}
                                />
                            </p>

                            <p className="col-6" id="productPrice">
                                <TextInput label="Product Price" icon={'fas fa-dollar-sign'} function={this.handleProductPrice} />
                            </p>

                            <p className="col-6">
                                <label> Product Tags</label>
                                <p>
                                    {this.state.tags.map(data => {
                                        let icon = null;
                                        return (
                                            <Chip
                                                key={data}
                                                icon={icon}
                                                label={data}
                                                onDelete={this.handleTagDelete(data)}
                                            />
                                        );
                                    })}
                                </p>
                                <p>
                                    <button className="btn btn-outline-secondary" id="tags" value="Ready Made" onClick={this.handleAddTag}> Ready Made </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Stitched" onClick={this.handleAddTag}> Stitched</button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Custom" onClick={this.handleAddTag}> Custom </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Women" onClick={this.handleAddTag}> Women </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Men" onClick={this.handleAddTag}> Men </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Sneakers" onClick={this.handleAddTag}> Sneakers </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Loafers" onClick={this.handleAddTag}> Loafers </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Brogues" onClick={this.handleAddTag}>Brogues </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Black" onClick={this.handleAddTag}> Black </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="White" onClick={this.handleAddTag}> White </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Red" onClick={this.handleAddTag}> Red </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Pink" onClick={this.handleAddTag}> Pink </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Shirt" onClick={this.handleAddTag}> Shirt </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="T-Shirt" onClick={this.handleAddTag}> T-Shirt </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Vintage" onClick={this.handleAddTag}> Vintage </button>
                                    <button className="btn btn-outline-secondary" id="tags" value="Gown" onClick={this.handleAddTag}> Gown </button>
                                </p>
                            </p>

                            <p className="col-6" id="productImage">
                                <label> Product Image </label>
                                <p>
                                    <div>
                                        <input type="file" onChange={this.handleImage} name='image' /> <br />
                                        <span style={{ fontSize: "0.7rem", color: "rgba(27, 121, 82, 0.61)" }}>(*accepts only PNG and JPG*)</span>
                                    </div>
                                </p>
                            </p>

                            <p className="col-12" id="productDescription">
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Product Description"
                                    multiline
                                    rowsMax="6"
                                    onChange={this.handleProductDescription}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </p>

                            <p className="col-12">
                                <button type="submit" onClick={this.addProduct} className="btn btn-block btn-primary" id="addProduct__button"> {addProductQueryStatus ? <img src={`../` + loader} width={20} /> : "Add Product"}</button>
                            </p>

                        </div>
                    </div>

                    <div className="col-1"></div>
                    <div id="toast"></div>
                </div >

            )
        } else {
            return <Redirect to="/login" />
        }
    }
}