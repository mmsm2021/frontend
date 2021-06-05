import {FormattedMessage} from "react-intl";
import React, {useContext, useEffect, useState} from "react";
import {Menu,MenuItem, SubMenu} from "react-pro-sidebar";
import {FaList, FaMinus, FaPlus} from "react-icons/all";
import {Link} from "react-router-dom";
import {Accordion, Button, Card, CardDeck, CardGroup, Form, ListGroup, Modal} from "react-bootstrap";
import fakeProducts from "./productsJson.json";
import {ProductForm} from "./ProductForm";
import {api} from "../services/ApiService";
import ProductCard from "./ProductCard";


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
        main: () => <ProductForm/>
    },
    {
        path: "/products/:id",
        main: () => <ProductForm/>
    }

]
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

export const ProductOverview = () =>{
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [clickedProduct, setClickedProduct] = useState();
    const [quant, setQuant] = useState(1);
    const handleIncrement =()=>{
        setQuant(quant + 1);
    }
    const handleDecrement = () =>{
        setQuant(quant - 1);
    }
    useEffect(()=>{
        api.get(`/products`).
            then(res => setProducts(res.data))
            .catch(err => console.log(err));

    },[])
    return(
        <>
            <h2><FormattedMessage id={"productOverview"}/></h2>
            {products.map((product) =>(
                <ProductCard product={product}
                         show={() => setModalShow(true)}/>
                )

            )}

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





