import {FormattedMessage} from "react-intl";
import React, {useState} from "react";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {FaList} from "react-icons/all";
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Image, InputGroup, Modal} from "react-bootstrap";
import fakeProducts from "./productsJson.json";
import {Form as IkForm,FieldArray, Field, useFormik, Formik, ErrorMessage} from "formik";

export const ProductRoutes = [

    {
        path: "/products",
        exact: true,
        sidebar: <FormattedMessage id={"products"}/>,
        main: () => <h2><FormattedMessage id={"productOverview"}/></h2>,
    },
    {
        path: "/products/new",
        sidebar: <FormattedMessage id={"newProduct"}/>,
        main: () => <NewProduct/>
    }

]

export function ProductPopup(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Choose items from list</h4>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search"/>
                    <Form.Control as="select">
                        <option>Default select</option>

                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const Products = () => {
    return (

            <SubMenu title={<FormattedMessage id={"products"}/>}
                     icon={<FaList/>}>
                {ProductRoutes.map((route, index) => (

                    <MenuItem key={index}>
                        <Link to={route.path}>{route.sidebar}</Link>
                    </MenuItem>
                ))}

            </SubMenu>

    )
}

class NewProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            id: null,
            name: "",
            locationId:null,
            price: "10",
            discountPrice: null,
            discountFrom: null,
            discountTo: null,
            status: 1,
            attributes: [{
                ingredients: []
            },
            {
                instructions: []
            }],
            description: "",
            uniqueIdentifier: null,
            createdAt: null,
            updatedAt: null,
            deletedAt: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleIngredientChange(event){
        const {id, name, value} = event.target;
        const history = this.state.attributes.slice(0, id + 1);
        const current = history[history.length - 1];
        let ingredients = current.ingredients.slice();
        ingredients[id] = value;
        this.setState({
            attributes: {
                ingredients: ingredients
            }
        });

    }
    handleSubmit(event){
        alert(JSON.stringify(this.state));
        event.preventDefault();
    }
    render() {

        return(
            <Container className={"shadow-lg lg"} fluid>
                <h3 className={"border-bottom"}><FormattedMessage id={"newProduct"}/></h3>
                <Form onSubmit={() => this.handleSubmit()} >
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control id={"name"}
                                      name={"name"}
                                      value={this.state.name}
                                      onChange={this.handleChange}/>

                        <Form.Label>Description</Form.Label>
                        <Form.Control id={"description"}
                                      name={"description"}
                                      as={"textarea"}
                                      value={this.state.description}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Ingredients</Form.Label>

                                {this.state.attributes[0].ingredients && this.state.attributes[0].ingredients.length > 0 ? (
                                    this.state.attributes[0].ingredients.map((ingredient, index) =>(
                                        <Form.Group>
                                        <Form.Row>
                                        <InputGroup className={"mb-3"}>
                                            <InputGroup.Prepend>
                                                <Button>{index + 1}</Button>
                                            </InputGroup.Prepend>
                                            <Form.Control id={`${index}`}
                                            name={"ingredients"}
                                            value={ingredient[index]}
                                            onChange={this.handleIngredientChange}
                                             />
                                            <InputGroup.Append>
                                                <Button onClick={() => this.state.attributes[0].ingredients.splice(index,1)}
                                                        variant={"danger"}>
                                                    -
                                                </Button>
                                            </InputGroup.Append>

                                        </InputGroup>
                                        </Form.Row>

                                        </Form.Group>
                                    ))
                                ) : (
                                    <Button onClick={() => this.state.attributes[0].ingredients.push('')}>
                                        Add ingredient
                                    </Button>
                                )}

                            <Button onClick={() => this.state.attributes[0].ingredients.push('')}
                                    variant={"success"}>
                                +
                            </Button>
                        </Form.Group>
                    </Form.Row>

                    <button type="submit">Save</button>
                </Form>
            </Container>
        )
    }
}



