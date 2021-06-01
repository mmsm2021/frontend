import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Tab, Row, Col, ListGroup, Button, Card, Table} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {FaMinus, FaShoppingCart} from "react-icons/all";
import fakeProducts from "../products/productsJson.json";

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
export const ProductGrid = ({key, product, onAdd}) =>(
    <Card style={{ width: '28rem', marginBottom: '8px' }} key={key} className={"shadow-lg"}>
        <Card.Header>{product.name}</Card.Header>
        <Card.Body>
            {product.description}
        </Card.Body>
        <Card.Footer>
            <Button onClick={onAdd}><FormattedMessage id={"addToCart"}/></Button>
        </Card.Footer>
    </Card>
)
export const UserOrder = () =>{
    const [cart, setCart] = useState([]);
    const {user} = useAuth0();
    const products = fakeProducts.products;
    function total(){
        let amount = 0;
        for (let item in cart){
            let asNum = Number(item.price);
            amount = amount + asNum;
        }
        console.log(amount);
        return Number(amount);
    }
    return(
        <Tab.Container id="list-group-tabs" defaultActiveKey="#breakfast">
            <Row>
                <Col md={3}>
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

                <Col sm={8}>
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
                        </Tab.Pane>
                        <Tab.Pane eventKey="#dinner">
                            <h1>Dinner</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#dessert">
                            <h1>Dessert</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#beverages">
                            <h1>Beverages</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey={"#cart"}>
                            <h1>Cart</h1>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map((item, index)=>(
                                    <tr key={index} onClick={() => alert(JSON.stringify(item, null,2)) }>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <Button variant={"danger"}
                                                    className={"btn-sm btn-block"}
                                                    onClick={() => {
                                                        let current = [...cart];
                                                        current.splice(index,1);
                                                        setCart(current);
                                                    }}><FaMinus/></Button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button variant={"outline-primary btn-block"}>
                                <FormattedMessage id={"continue"}/>
                            </Button>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
