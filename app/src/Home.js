import {useContext, useEffect, useState} from "react";
import {Context} from "./configuration/Store";
import {api, AuthApi, CoreApi} from "./services/ApiService";
import {Col, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import {ProductCategories, ProductDetail, SimpleProductList} from "./products/Products";
import {useAuth0} from "@auth0/auth0-react";

export const Home = () => {
    const [state,dispatch] = useContext(Context)
    const {location} = state;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('home');
    useEffect(async ()=>{
        // Get default location
        await CoreApi.get(`/locations/${state.location.id}`)
            .then(res => {
                const locationData = res.data;
                dispatch({type:'SET_LOCATION', payload:locationData});
            })
            .catch(err => console.log(err))
            .finally(() => console.log(location));
        // Get location products
        await api.get(`/products?locationId=${location.id}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => dispatch({type:'SET_ERROR', payload:err}));

    },[])
    if (loading) return <div>Loading...</div>
    const {logo_url, colors} = location.metadata.branding;
    return(

        <div className={"text-center"}>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="home">
                <Row>
                    <Col sm>
                        <ListGroup horizontal>
                            <ListGroup.Item action eventKey="home">
                                Home
                            </ListGroup.Item>
                            <ListGroup.Item action eventKey="menu">
                                Menu
                            </ListGroup.Item>
                            <ListGroup.Item action eventKey="about">
                                About
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="home" >
                                <h1>Welcome to {location.name}</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="menu">
                                {ProductCategories.map((cat, index) =>(
                                    <>
                                            <h4 className={"font-weight-bolder"}>{cat.category}</h4>

                                            {products[0] && products.map((product, index)=>{
                                                if (product.attributes.category === cat.id)
                                                    return <ProductDetail product={product}
                                                                          attributes={product.attributes}/>
                                            })}

                                    </>
                                ))}
                            </Tab.Pane>
                            <Tab.Pane eventKey="about" >
                                <h1>About {location.name}</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contact"  disabled>
                                <h1>Contact us</h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>

    )
}
