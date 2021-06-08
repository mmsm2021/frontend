import {FormattedMessage} from "react-intl";
import React, {useContext, useEffect, useState} from "react";
import {Menu,MenuItem, SubMenu} from "react-pro-sidebar";
import {FaList, FaMinus, FaPlus} from "react-icons/all";
import {Link} from "react-router-dom";
import {Accordion, Button, Card, CardDeck, CardGroup, Col, Form, ListGroup, Modal, Row, Tab} from "react-bootstrap";
import fakeProducts from "./productsJson.json";
import {ProductForm} from "./ProductForm";
import {api, ProductsApi} from "../services/ApiService";
import ProductCard from "./ProductCard";
import {Context} from "../configuration/Store";
import {map} from "react-bootstrap/ElementChildren";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import {ProductGrid} from "../orders/UserOrder";
import {inOneOfRole} from "../Auth";
import {ProductDeets} from "./ProductDetail";


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
        main: () => <ProductForm/>,
        roles: [
            'sa',
            'admin'
        ]
    },
    {
        path: "/products/:id",
        main: () => <ProductDeets/>
    }

]
export const ProductMenu = () => {
    const [state,dispatch] = useContext(Context);
    return (
        <Menu iconShape={"circle"}>
            <SubMenu title={<FormattedMessage id={"products"}/>}
                     icon={<FaList/>}>
                {ProductRoutes.map((route, index) => {
                    if (!route.sidebar) return;
                    if (Array.isArray(route.roles) && !inOneOfRole(route.roles, state.user)) {
                        return;
                    }
                    return(
                        <MenuItem key={index}>
                            <Link to={route.path}>{route.sidebar}</Link>
                        </MenuItem>
                    )
                })}

            </SubMenu>
        </Menu>
    )
}
export const ProductsFromState = ({addToCart}) =>{
    const [state,dispatch] = useContext(Context);
    const {products} = state;
    return(
        <div>

            <Accordion defaultActiveKey={0}>
        {products.map((product,index)=>{
            if (product.locationId != state.location.id) return null;
            return(
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={product.id}>
                        {product.name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={product.id}>
                        <Card.Body>
                            <Row>
                                {product.description}
                            </Row>
                            <Row className={'d-inline-flex'}>
                                <Button className={'btn-sm'} variant={"outline-primary"}
                                    onClick={() => addToCart(product.id)}><FormattedMessage id={"addToCart"}/></Button>
                            </Row>
                            </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        })}
            </Accordion>

        </div>
    )
}
export const SimpleProductList = (props) =>{
    const {product} = props;
    return(
        product &&
        <Card style={{ width: '18rem' }}>
            <Card.Header>{product.name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
            <Card.Footer>{product.price} DKK</Card.Footer>
        </Card>
    )
}
export const ProductDetail = (props) =>{
    const{product, attributes} = props;
    return(
        product &&
        <div style={{padding:'6px'}}>
            <h6 className={"font-italic"}>{product.name}</h6>
            <code>
                {product.description}
            </code>
        </div>
    )
};
export function ProductPopup(props) {
    const [state,dispatch] = useContext(Context);

    const {products} = state;
    const {orderItems} = state;
    return(
        products[0]&&
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
                    <Autocomplete id={"name"}
                                  options={products}
                                  getOptionLabel={(option) => option.name}
                                  getOptionSelected={props.handleSelect}
                                  renderInput={(params) => <TextField {...params} label={<FormattedMessage id={'products'}/>} variant="outlined" />}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}



export const ProductOverview = () =>{
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [clickedProduct, setClickedProduct] = useState();
    const [quant, setQuant] = useState(1);
    const [state,dispatch] = useContext(Context);
    const handleIncrement =()=>{
        setQuant(quant + 1);
    }
    const handleDecrement = () =>{
        setQuant(quant - 1);
    }
    useEffect(async ()=>{
        // Get location products
        await api(state.token).get(`/products?locationId=${state.location.id}`)
            .then(res => {
                dispatch({type:'SET_PRODUCTS',payload: res.data});
                setProducts(res.data);
                console.log(res);
                dispatch({type:'SET_CHANGED',payload: !state.didChange});
            })
            .catch(err => dispatch({type:'SET_ERROR', payload:err}));


    },[state.location.id]);

    return(
        <>
            <h2><FormattedMessage id={"productOverview"}/></h2>

                {ProductCategories.map((cat, index) =>(
                    <div key={index}>
                        <h4><FormattedMessage id={cat.category.toLowerCase()}/></h4>
                            {state.products.map((prod, index) =>{
                                if (prod.attributes.category === cat.id)
                                    return(

                                        <ProductCard key={index}
                                                     product={prod}
                                                     />

                                    )
                            })}
                    </div>

                ) )}

            <ProductPopup show={modalShow}
                          extProduct={clickedProduct}
                          onHide={()=> setModalShow(false)}
                          />
            </>
    );
}
export const ProductCategories =[
    {
        id: 0,
        category:'Breakfast'
    },
    {
        id: 1,
        category:'Lunch'
    },
    {
        id: 2,
        category:'Dinner'
    },
    {
        id: 3,
        category:'Dessert'
    },
    {
        id: 4,
        category:'Beverages'
    },
];
export let IngredientOptions =[
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





