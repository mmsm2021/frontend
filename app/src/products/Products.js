import {FormattedMessage} from "react-intl";
import React, {useState} from "react";
import {Menu,MenuItem, SubMenu} from "react-pro-sidebar";
import {FaList} from "react-icons/all";
import {Link} from "react-router-dom";
import {Button, Card, CardDeck, CardGroup, Col, Container, Form, Image, InputGroup, Modal} from "react-bootstrap";
import fakeProducts from "./productsJson.json";
import {Form as IkForm,FieldArray, Field, useFormik, Formik, ErrorMessage} from "formik";
import {Autocomplete} from "@material-ui/lab";
import {Chip, TextField} from "@material-ui/core";

export const ProductRoutes = [

    {
        path: "/products",
        exact: true,
        sidebar: <FormattedMessage id={"products"}/>,
        main: () => <ProductOverview/>,
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
                    Item detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Choose items from list</h4>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search" value={props.name}/>
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
            <Menu iconShape={"circle"}>
                <SubMenu title={<FormattedMessage id={"products"}/>}
                         icon={<FaList/>}>
                    {ProductRoutes.map((route, index) => (

                        <MenuItem key={index}>
                            <Link to={route.path}>{route.sidebar}</Link>
                        </MenuItem>
                    ))}

                </SubMenu>
            </Menu>
    )
}

const ProductOverview = () =>{
    const data = fakeProducts;
    let products = data.products;
    return(
        <>
            <h2><FormattedMessage id={"productOverview"}/></h2>
            <CardGroup >
            {products.map((product)=>(
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={product.picture} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        <Button variant="primary">More info</Button>
                    </Card.Body>
                </Card>
            ))}
        </CardGroup>
            </>
    );
}
let IngredientOptions =[
    {name:"Egg"},
    {name:"Cheese"},
    {name:"Rye"},
    {name:"Avocado"},
    {name:"Blueberries"},
    {name:"Strawberries"},
    {name:"Beef"},
    {name:"Pork"},
    {name:"Chicken"},
    {name:"Bacon"},
    {name:"Mayo"},
    {name:"Ketchup"},
    {name:"Kale"},
    {name:"Salad"},
    {name:"Beets"},
    {name:"Flour"},
    {name:"Sugar"},
    {name:"Salt"},
    {name:"Pepper"},
    {name:"Onion"},
    {name:"Garlic"},
    {name:"Oil"},
];
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
            attributes: [],
            instructions: "",
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
        console.log(name, value);

        this.setState({
            [name]: value
        });
    }
    handleIngredientChange(event){
        const {id, name, value} = event.target;
        this.setState({
            attributes: {
                [name]: value
            }
        });

    }
    handleSubmit(event){
        alert(JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        let attributes = this.state.attributes;
        let ingredients = [];
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
                        <Form.Label>Attributes</Form.Label>
                    </Form.Row>

                        <Form.Group as={Col} >
                            <Form.Label>Ingredients</Form.Label>


                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control id={"instructions"}
                                          name={"instructions"}
                                          as={"textarea"}
                                          value={this.state.instructions}
                                          onChange={this.handleChange}
                                          />
                        </Form.Group>

                    <button type="submit">Save</button>
                </Form>
            </Container>
        )
    }
}






