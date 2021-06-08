import React, {useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Tab, Row, Col, ListGroup, Button, Card, Table, ButtonGroup, Image} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {FaMinus, FaPlus, FaShoppingCart} from "react-icons/all";
import fakeProducts from "../products/productsJson.json";
import {api, OrderApi} from "../services/ApiService";
import {Context} from "../configuration/Store";
import OrderTimeline from "./OrderTimeline";
import {JWTParser} from "../services/JWTParser";
import {Redirect} from "react-router-dom";
import {Alerter} from "../services/AlertService";
import {ProductCategories} from "../products/Products";

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);
export const CartIcon = ({count}) =>(
    <>
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={count} color="secondary">
                <FaShoppingCart />
            </StyledBadge>
        </IconButton>
    </>
);
export const ProductGrid = ({key, product, onAdd, count}) =>(
    <Card style={{ width: '28rem', marginBottom: '8px' }} key={key} className={"shadow-lg"}>
        <Card.Img variant="top" src={product.attributes.picture} />
        <Card.Header>{product.name}</Card.Header>
        <Card.Body>
            {product.description}
        </Card.Body>
        <Card.Footer>
            {count}

            <Button onClick={onAdd} variant={"outline-primary"} sm>
                <FormattedMessage id={"addToCart"}/>
            </Button>
        </Card.Footer>
    </Card>
)

export const UserOrder = () =>{
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [quote, setQuote] = useState([]);
    const [state,dispatch] = useContext(Context);
    const [oId, setOid] = useState('');
    const [success,setSuccess] = useState(false);
    useEffect(async ()=>{
        await api(state.token).get("/products").then(res => setProducts(res.data))
            .catch(err => console.log(err));




    },[])
    async function addToCart(id){
        console.log(id);
        await api(state.token).get(`/products/quote/${id}`)
            .then(res => setCart((prev) =>[...prev,res.data]))
            .catch(err => dispatch({type:'SET_ERROR', payload:err}));
        console.log(cart);
    }
    async function postOrder(){
        let tokens = [];
        let order={
            location: state.location.name,

            discount:10,
        };

        order.items = cart.map((item)=>(
            item.token
        ));

        await api(state.token).post('/orders', order)
            .then(res =>{
                console.log(res.data);
                setOid(res.data.orderId)
            } )
            .catch(err => console.log(err));


    }
    let total = 0;

    return(
        <Tab.Container id="list-group-tabs" defaultActiveKey="#breakfast" >

            <Row>
                <Col sm={4} >
                    <ListGroup className={"shadow-lg "}>
                        <ListGroup.Item>
                            <h4 className={"text-center"}><FormattedMessage id={"newOrder"}/></h4>
                        </ListGroup.Item>
                        {ProductCategories.map((cat) =>(
                            <ListGroup.Item action href={`#${cat.category}`}>
                                <FormattedMessage id={`${cat.category.toLowerCase()}`}/>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item action href={"#cart"} className={"position-sticky"}>
                            <CartIcon count={cart.length}/>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col >

                    <Tab.Content >
                        {ProductCategories.map((cat, index) =>(
                            <Tab.Pane eventKey={`#${cat.category}`} >
                                <h1 ><FormattedMessage id={`${cat.category.toLowerCase()}`}/></h1>
                                {products.map((prod, index) =>{
                                    if (prod.attributes.category === cat.id)
                                    return(
                                        <ProductGrid key={index}
                                                     product={prod}
                                                     onAdd={() => addToCart(prod.id)}/>

                                    )

                                })}
                            </Tab.Pane>
                        ) )}

                        <Tab.Pane eventKey={"#cart"} className={"jumbotron"}>
                            <h1><FormattedMessage id={'cart'}/></h1>
                            <Table striped bordered hover size="sm" >
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id={'item'}/></th>
                                        <th><FormattedMessage id={'price'}/></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart[0] && cart.map((cartItem, index)=> {
                                    // let toke = handleAddToCart(cartItem.id);
                                    let item = cartItem;
                                    let info = JWTParser(item.token);
                                    total = parseInt(total) + parseInt(item.price);
                                    console.log(total)
                                    console.log(info)
                                    return(
                                        <tr key={index} >
                                            <td>
                                                {info ? info.product.name : item.name}
                                            </td>
                                            <td>{info ? info.product.price : item.price}</td>
                                            <td>


                                                <Button variant={"danger"}
                                                        className={"btn-sm btn-block"}
                                                        onClick={() => {
                                                            let current = [...cart];
                                                            current.splice(index,1);
                                                            setCart(current);
                                                        }}><FaMinus/>
                                                </Button>

                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                                <footer>
                                    <span>
                                        <FormattedMessage id={"Total"}/> {Number(total)}
                                    </span>
                                </footer>
                            </Table>
                            <Button variant={"outline-primary btn-block"}
                            onClick={() => postOrder()}>
                                <FormattedMessage id={"continue"}/>
                            </Button>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            {oId ? <Redirect to={`/orders/${oId}`}/> : ''}
        </Tab.Container>
    )
}
