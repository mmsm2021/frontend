import {useContext, useEffect, useState} from "react";
import {Context} from "./configuration/Store";
import {api, AuthApi, CoreApi, TestApi} from "./services/ApiService";
import {Col, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import {ProductCategories, ProductDetail, SimpleProductList} from "./products/Products";
import {useAuth0} from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";

export const Home = () => {
    const [state,dispatch] = useContext(Context)
    const {location} = state;
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('home');
    useEffect(async ()=>{
        // Get default location
        console.log('Getting location with ID: ',state.location.id)
        await api(state.token)
            .get(`/locations/${state.location.id}`)
            .then(res =>{
                const locationData = res.data;
                console.log(res);
                localStorage.setItem('locId', locationData.id);
                dispatch({type:'SET_LOCATION', payload:locationData});
            }).catch(err => console.log(err))
            .finally(() => dispatch({type:'SET_CHANGE',payload:!state.didChange}));

        // Get location products
        await api(state.token).get(`/products?locationId=${location.id}`)
            .then(res => {
                dispatch({type:'SET_PRODUCTS',payload: res.data});
                dispatch({type:'SET_CHANGED',payload: !state.didChange});
                setLoading(false);
            })
            .catch(err => dispatch({type:'SET_ERROR', payload:err}));

    },[state.location.id])
    if (loading) return <div>Loading...</div>
    const {logo_url, colors} = location.metadata.branding;
    const {products} = state;

    return(

        <div className={"text-center"}>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="home">
                <Row>
                    <Col sm>
                        <ListGroup horizontal>
                            <ListGroup.Item action eventKey="home">
                                <FormattedMessage id={"home"}/>
                            </ListGroup.Item>
                            <ListGroup.Item action eventKey="menu">
                                <FormattedMessage id={"menu"}/>
                            </ListGroup.Item>
                            <ListGroup.Item action eventKey="about">
                                <FormattedMessage id={"about"}/>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="home" >
                                <h1><FormattedMessage id={"welcomeTo"}/> {location.name}</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="menu">
                                {ProductCategories.map((cat, index) =>(
                                    <>
                                            <h4 className={"font-weight-bolder"}><FormattedMessage id={`${cat.category.toLowerCase()}`} /></h4>

                                            {products[0] && products.map((product, index)=>{
                                                if (product.attributes.category === cat.id)
                                                    return <ProductDetail product={product}
                                                                          attributes={product.attributes}/>
                                            })}

                                    </>
                                ))}
                            </Tab.Pane>
                            <Tab.Pane eventKey="about" >
                                <h1><FormattedMessage id={"about"}/> {location.name}</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contact"  disabled>
                                <h1><FormattedMessage id={"contact"} /></h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>

    )
}
