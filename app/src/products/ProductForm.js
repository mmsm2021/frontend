import * as yup from 'yup';
import {Field, FieldArray, Form as Fmik, Formik} from 'formik';
import {Button, Col, Form, InputGroup} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import ProductCard from "./ProductCard";
import {FaMinus, FaPlus} from "react-icons/all";
import {Autocomplete} from "@material-ui/lab";
import {IngredientOptions, ProductCategories} from "./Products";
import {TextField} from "@material-ui/core";
import {api} from "../services/ApiService";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Context} from "../configuration/Store";

const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
    status: yup.string().required(),


});
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const ProductForm = () => {
    const [product, setProduct] = useState({});
    const [state, dispatch] = useContext(Context);
    const {id} = useParams();
    useEffect(()=>{
        if (id){
            api.get(`/products/${id}`).
            then(res =>{
                setProduct(res.data);
            })
                .catch(err => console.log(err));
        }
    },[]);

    return(
        <Formik
            validationSchema={schema}
            onSubmit={values => {
                values.attributes.ingredients = values.ingredients;
                values.attributes.approach = values.approach;
                // Delete temporary object properties
                delete values.ingredients;
                delete values.approach;
                // Generate a unique identifier for the product
                values.uniqueIdentifier = uuidv4();
                // Send post request
                api.post("/products", values)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err));
                alert(JSON.stringify(values,null, 2));
            }}
            initialValues={
                {
                    name: '',
                    locationId: state.location.id,
                    price: '',
                    status: 0,
                    attributes: {
                        ingredients:[],
                        approach:[],
                        category:0,
                        picture:"https://picsum.photos/200/100"
                    },
                    discountPrice: null,
                    discountFrom: null,
                    discountTo: null,
                    description: '',
                    uniqueIdentifier: '',
                    ingredients: [""],
                    approach: [""],

                }
            }>
            {({

                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
              }) => (
                <>
                    <div className={"float-right"}>
                        <ProductCard product={values}/>
                    </div>
                    <Fmik>
                        <Button type={"reset"}>Reset</Button>
                        <Form.Row>
                            <Form.Group controlId="validationFormik101">
                                <Form.Label><FormattedMessage id={"productName"}/></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isValid={touched.name && !errors.name}
                                />
                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as={"select"}
                                    type="select"
                                    placeholder="Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    isInvalid={!!errors.status}>
                                    <option value={1}>Active</option>
                                    <option value={2}>Draft</option>
                                    <option value={3}>Phased out</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.status}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="validationFormik102">
                                <Form.Label><FormattedMessage id={"description"}/></Form.Label>
                                <Form.Control
                                    as={"textarea"}
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    isValid={touched.description && !errors.description}
                                />

                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                <Form.Label><FormattedMessage id={"price"}/></Form.Label>
                                <InputGroup hasValidation>

                                    <Form.Control
                                        type="text"
                                        placeholder="price"
                                        aria-describedby="inputGroupPrepend"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                    /><InputGroup.Append>
                                    <InputGroup.Text id="inputGroupPrepend">DKK</InputGroup.Text>
                                </InputGroup.Append>
                                    {/*<Form.Control.Feedback type="invalid" tooltip>*/}
                                    {/*    {errors.price}*/}
                                    {/*</Form.Control.Feedback>*/}
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            {/*Category*/}
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Category</Form.Label>
                                <Form.Control name={"attributes.category"}
                                              type={"number"}
                                              as={"select"}
                                              value={values.attributes.category}
                                              onChange={handleChange}>
                                    {ProductCategories.map((cat) =>(
                                        <option value={cat.id} key={cat.id}>{cat.category}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            {/*Picture*/}
                            <Form.Group as={Col} md={4}>
                                <Form.Label>Picture</Form.Label>
                                <Form.Control name={"attributes.picture"}
                                              type={"text"}
                                              value={values.attributes.picture}
                                              onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <FieldArray name="ingredients"
                                        render={arrayHelpers => (
                                            <>

                                                <Form.Group as={Col} className={"col-4"}>
                                                    <Form.Label className={"d-block"}>Ingredients</Form.Label>
                                                    {values.ingredients && values.ingredients.length > 0 ? (
                                                        values.ingredients.map((ing, index) => (

                                                            <div key={index} className={"d-inline-flex"} style={{padding:2}}>
                                                                <Field name={`ingredients.${index}`}
                                                                       component={CustomInputComponent}/>

                                                                <FaMinus onClick={() => arrayHelpers.remove(index)} />

                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Form.Text>Add ingredients</Form.Text>
                                                    )}
                                                    <Form.Row>
                                                        <FaPlus onClick={() => arrayHelpers.push('')}/>
                                                    </Form.Row>
                                                </Form.Group>

                                            </>
                                        )}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.ingredients}
                            </Form.Control.Feedback>



                            <FieldArray name="approach"
                                        render={arrayHelpers => (
                                            <>
                                                <Form.Group as={Col} className={"col-4"}>
                                                    <Form.Label className={"d-block align-content-center"}>Instructions</Form.Label>
                                                    {values.approach && values.approach.length > 0 ? (
                                                        values.approach.map((roach, index) => (
                                                            <div key={index} className={"d-inline-flex"} style={{padding:2}} >
                                                                <Field name={`approach.${index}`}
                                                                       component={CustomInputComponent}
                                                                />

                                                                <FaMinus onClick={() => arrayHelpers.remove(index)}/>

                                                            </div>

                                                        ))
                                                    ) : (

                                                        <Form.Text>Add instructions</Form.Text>

                                                    )}
                                                    <FaPlus onClick={() => arrayHelpers.push('')} title={"Add"}/>
                                                </Form.Group>
                                            </>
                                        )}
                            />


                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.instructions}
                            </Form.Control.Feedback>

                        </Form.Row>
                        <Button type="submit">Create product</Button>
                    </Fmik>
                </>
            )}</Formik>


    );
}
const CustomInputComponent = ({
                                  field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  ...props
                              }) => (

    <div >
        <input type="text" {...field} {...props} className={"form-control"}/>
        {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>

);

