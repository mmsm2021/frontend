import {useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Tab, Row, Col, ListGroup, Button, Card, Table, ButtonGroup} from "react-bootstrap";
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
        <Card.Header>{product.name}</Card.Header>
        <Card.Body>
            {product.description}
        </Card.Body>
        <Card.Footer>
            {count}
            <FaPlus onClick={() => count = count + 1}/>
            <Button onClick={onAdd}><FormattedMessage id={"addToCart"}/></Button>
        </Card.Footer>
    </Card>
)

export const UserOrder = () =>{
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [quote, setQuote] = useState([]);
    const [state,dispatch] = useContext(Context);
    useEffect(()=>{
        api.get("/products").then(res => setProducts(res.data))
            .catch(err => console.log(err));




    },[])
    function handleAddToCart(id){
        console.log(id);
        api(`/products/quote/${id}`)
            .then(res => setQuote(res.data))
            .catch(err => console.log(err));
        setCart((prev) =>[...prev, quote]);

    }
    async function postOrder(){
        let tokens = [];
        let order={
            location: state.location.name,

            discount:10,
        };

        cart.map((item) =>{
            api(`/products/quote/${item.id}`)
                .then(res => res.data)
                .then(data=> setQuote((prev)=>[...prev, data["token"]]))
                .catch(err => console.log(err));
        });
        order.items = quote;

        await OrderApi.post('', order)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    return(
        <Tab.Container id="list-group-tabs" defaultActiveKey="#breakfast">
            <Row>
                <Col md={6}>
                    <ListGroup className={"shadow-sm sticky-top"}>
                        <ListGroup.Item action href="#breakfast">
                            <FormattedMessage id={"breakfast"}/>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#lunch">
                            <FormattedMessage id={"lunch"}/>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#dinner">
                            <FormattedMessage id={"dinner"}/>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#dessert">
                            <FormattedMessage id={"dessert"}/>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#beverages">
                            <FormattedMessage id={"beverages"}/>
                        </ListGroup.Item>
                        <ListGroup.Item action href={"#cart"}>
                            <CartIcon count={cart.length}/>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col sm={5}>

                    <Tab.Content>
                        <Tab.Pane eventKey="#breakfast">
                            <h1>Breakfast</h1>
                            {products.map((prod, index) =>(
                                <ProductGrid key={index}
                                             product={prod}
                                             onAdd={() => {
                                                 setCart((prev) =>[...prev, prod]);
                                             }
                                             }/>

                            ))}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#lunch">
                            <h1>Lunch</h1>
                            {products.map((prod, index) =>(
                                <ProductGrid key={index}
                                             product={prod}
                                             onAdd={() => {
                                                 setCart((prev) =>[...prev, prod]);
                                             }
                                             }/>

                            ))}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#dinner">
                            <h1>Dinner</h1>
                            {products.map((prod, index) =>{
                                if (prod.attributes.category === 3){
                                    return(
                                        <ProductGrid key={index}
                                                     product={prod}
                                                     onAdd={() => {
                                                         setCart((prev) =>[...prev, prod]);
                                                     }
                                                     }/>
                                    )
                                }
                            })}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#dessert">
                            <h1>Dessert</h1>
                            {products.map((prod, index) =>(
                                <ProductGrid key={index}
                                             product={prod}
                                             onAdd={() => {
                                                 setCart((prev) =>[...prev, prod]);
                                             }
                                             }/>

                            ))}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#beverages">
                            <h1>Beverages</h1>
                            {products.map((prod, index) =>(
                                <ProductGrid key={index}
                                             product={prod}
                                             onAdd={() => {
                                                 setCart((prev) =>[...prev, prod]);
                                             }
                                             }/>

                            ))}
                        </Tab.Pane>
                        <Tab.Pane eventKey={"#cart"}>
                            <h1>Cart</h1>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart[0] && cart.map((cartItem, index)=> {
                                    // let toke = handleAddToCart(cartItem.id);


                                    let item = cartItem;
                                    return(
                                        <tr key={index} >
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
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
                            </Table>
                            <Button variant={"outline-primary btn-block"}
                            onClick={() => postOrder()}>
                                <FormattedMessage id={"continue"}/>
                            </Button>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>

        </Tab.Container>
    )
}
