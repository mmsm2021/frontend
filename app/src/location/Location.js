import {FormattedMessage} from "react-intl";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {FaLocationArrow} from "react-icons/all";
import fakeLocation from "./mockLocation.json";
import {Container} from "@material-ui/core";
import { Formik, ErrorMessage } from 'formik';
import {Button, Col, Form, InputGroup} from "react-bootstrap";
export const LocationRoutes=[
     {
         path: "/location",
         exact: true,
         sidebar: <FormattedMessage id={"location"}/>,
         main: () => <LocationDetail/>
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
const dkStates = [
    "Region Hovedstaden",
    "Region Midtjylland",
    "Region Sjælland",
    "Region Syddanmark"
];
export const LocationDetail = () =>{
    const location = fakeLocation[0];
    console.log(fakeLocation);
    return(
        <>
            <Formik initialValues={location}
                    onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
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
                                      defaultValue={values.id}
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
                    <Button type={"submit"}>Save</Button>
                </Form>
            )}
            </Formik>
            <footer>
            <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=10.404269993305208%2C55.39599905640532%2C10.407810509204866%2C55.39734404541994&amp;layer=mapnik&amp;marker=55.396672000031636%2C10.406038999999964" ></iframe>
            <br/>
            <small>
                <a href="https://www.openstreetmap.org/?mlat=55.39667&amp;mlon=10.40604#map=19/55.39667/10.40604">View Larger Map</a>
            </small>
            </footer>
        </>
    )
}
