import {FormattedMessage} from "react-intl";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import {Link, useParams} from "react-router-dom";
import {FaLocationArrow} from "react-icons/all";
import {Container} from "@material-ui/core";
import { Formik, ErrorMessage } from 'formik';
import {Button, Col, Form, Image, InputGroup, Modal} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {CoreApi} from "../services/ApiService";
import {Context} from "../configuration/Store";
import {Alerter} from "../services/AlertService";
export const LocationRoutes=[
     {
         path: "/location",
         exact: true,
         sidebar: <FormattedMessage id={"location"}/>,
         main: () =><LocationDetail/>
     }
 ];


export const LocationMenu = () =>{
    return(
        <Menu iconShape={"circle"}>

            <MenuItem icon={<FaLocationArrow/>}>
                {LocationRoutes[0].sidebar}
                <Link to={LocationRoutes[0].path}/>
            </MenuItem>

        </Menu>
    )
}
export const LocationSelect = ({noButton}) =>{
    // Initial entry point for the application
    const [locations, setLocations] = useState([]);
    const [state,dispatch] = useContext(Context);
    useEffect(() =>{

        CoreApi.get("/locations")
            .then(res => setLocations(res.data))
            .catch(err => console.log(err));

    },[]);

    // Get location ID from context
    // Allow end user to be assigned to a location
    return(
        <Formik initialValues={{
            locationId: state.location.id
        }}
                onSubmit={async (values) => {

                    await CoreApi.get(`/locations/${values.locationId}`)
                        .then(res => {
                            const result = res.data;
                            dispatch({type:'SET_LOCATION', payload:result});
                            dispatch({type:'SET_CHANGE', payload: !state.didChange});
                        }).catch(err => dispatch({type: 'SET_ERROR', payload:err}));
                }}>
            {({ values,handleChange,handleSubmit}) =>(
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control as={"select"}
                                  name={"locationId"}
                                  value={values.locationId}
                                  onChange={handleChange}>
                        {locations.map((location, index) =>(
                            <option value={location.id}>{location.name} - {location.city}</option>
                        ))}

                    </Form.Control>
                    {noButton ? (<Button type={"submit"} className={"btn-sm"} block><FormattedMessage id={"switch"}/></Button> ) : (<Button type={"submit"}>Save</Button>) }

                </Form>
            )}
        </Formik>
    );


}
export const LocationDetail = (props) =>{
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(true);
    const [patched, setPatched] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, dispatch] = useContext(Context);
    useEffect(() =>{
        console.log(state.location.id)
        CoreApi.get(`/locations/${state.location.id}`)
            .then(res => {
                setLocation(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    },[state.location]);
    if (loading){
        return <Alerter type={"success"} message={"Loading location..."}/>
    }

        let controls =[];
        let {metadata} = location;
        let {branding} = location.metadata;
        let {colors} = branding;
        let {primary, page_background} = colors



    return(
        <>
            <Formik initialValues={{
                name: location.name,
                // point: location.point,
                metadata: location.metadata,
                street: location.street,
                number: location.number,
                zipcode: location.zipcode,
                city: location.city,
                country: location.country,



            }
            }
                    onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                    CoreApi.patch(`/locations/${state.location.id}`,values)
                                        .then(res => console.log(res))
                                        .catch(err => console.log(err.message));
                                    setSubmitting(false);
                                }, 400);
            }}>{({
                                         handleSubmit,
                                         handleChange,
                                         handleBlur,
                                         values,
                                         touched,
                                         isValid,
                                         errors,
                                     }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row >
                        <h3>Location</h3>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>ID</InputGroup.Text>
                            </InputGroup.Prepend>
                        <Form.Control type={"text"}
                                      name={"id"}
                                      defaultValue={state.location.id}
                                      readOnly/>
                        </InputGroup>
                    </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="identity">
                        <Form.Label>Location name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isValid={touched.name && !errors.name}
                        />
                    </Form.Group>

                </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} sm={4} controlId="formGridAddress1">
                        <Form.Label><FormattedMessage id={"address"}/></Form.Label>
                        <Form.Control type={"text"}
                                      name={"street"}
                                      value={values.street}
                                      onChange={handleChange}
                                      isValid={touched.street && !errors.street}


                        />
                        <Form.Control type={"text"}
                                      name={"number"}
                                      value={values.number}
                                      onChange={handleChange}
                                      placeholder={"Address 2"}
                        />

                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={2} controlId="formGridZip">
                            <Form.Label><FormattedMessage id={"zipcode"}/></Form.Label>
                            <Form.Control type={"number"}
                                          name={"zipcode"}
                                          value={values.zipcode}
                                          onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridCity">
                            <Form.Label><FormattedMessage id={"city"}/></Form.Label>
                            <Form.Control type={"text"}
                                          name={"city"}
                                          value={values.city}
                                          onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={3}>
                            <Form.Label><FormattedMessage id={"country"}/></Form.Label>
                            <Form.Control name={"country"}
                                          value={values.country.name}
                                          onChange={handleChange}/>
                        </Form.Group>
                    </Form.Row>
                            <Form.Label>Metadata</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} sm={2} controlId="metadata">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control name={"logo_url"}
                                          value={branding.logo_url}
                                          onChange={handleChange}
                            />
                            <Image src={branding.logo_url} thumbnail/>
                            <Form.Label>Primary Color</Form.Label>
                            <Form.Control name={"primary"}
                                          value={primary}
                                          onChange={handleChange}/>
                            <div style={{height: 50, width:50, backgroundColor:primary}}></div>
                            <Form.Label>Secondary Color</Form.Label>
                            <Form.Control name={"page_background"}
                                          value={page_background}
                                          onChange={handleChange}/>
                            <div style={{height: 50, width:50, backgroundColor:page_background}}></div>
                        </Form.Group>
                    </Form.Row>
                    <Button type={"submit"}>Save</Button>
                    <Button type={"button"} onClick={() => alert(JSON.stringify(values,null,2))}>Test</Button>
                </Form>
            )}
            </Formik>
        </>
    )
}
