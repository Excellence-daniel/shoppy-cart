import React, { Component } from 'react';
import TextInput from './textField';
import SelectField from './selectField';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import './index.css'


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
            image: ''
        }
    }

    handleProductName = event => {
        this.setState({ productName: event.target.value });
    };

    handleProductCategorySelect = (e) => {
        this.setState({ productCategory: e.target.value })
    }

    handleSelectProductBrand = (e) => {
        this.setState({ productBrand: e.target.value })
    }

    handleImage = e => {
        const imageSplit = e.target.value.split(/[\\\/]/);
        const imagePath = imageSplit[2];
        this.setState({ image: imagePath });
    }

    handleProductPrice = (e) => {
        this.setState({ productPrice: e.target.value })
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
            this.setState({ tags: tags })
        }
    }

    handleProductDescription = (e) => {
        console.log(e.target.value)
        this.setState({ productDescription: e.target.value.trim() })
    }

    addProduct = async () => {
        const { productBrand, productName, productCategory, productPrice, productDescription, tags, image } = this.state;
        if (productDescription !== '' &&
            productBrand !== '' &&
            productCategory !== '' &&
            productName !== '' &&
            tags.length > 0 &&
            image !== '' &&
            productPrice !== ''
        ) {
            const res = await axios.post('http://localhost:4030/addProduct',
                {
                    productBrand,
                    productCategory,
                    productDescription,
                    productName,
                    productPrice,
                    tags,
                    image
                });
        } else {
            alert('Fill in all fields');
        }
        // console.log(res, 'res');
    }
    render() {
        return (
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
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
                            <div class="custom-file">
                                <label> Product Image</label>
                                <p><input type="file" onChange={this.handleImage} name="pic" accept="image/*" /></p>
                            </div>
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
                            <Button variant="contained" className="btn-block" onClick={this.addProduct} color="primary">
                                Add Product
                        </Button>
                        </p>

                    </div>
                </div>
                <div className="col-1"></div>
            </div >
        )
    }
}