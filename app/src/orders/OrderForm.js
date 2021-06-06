import React, {useContext, useState} from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {Context} from "../configuration/Store";
import {ProductsFromState} from "../products/Products";
import {api, OrderApi} from "../services/ApiService";
import {CartIcon} from "./UserOrder";
import {Link, Redirect} from "react-router-dom";
import {OrderDetails} from "./OrderService";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = values => {
        setSnapshot(values);
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };

    const previous = values => {
        setSnapshot(values);
        setStepNumber(Math.max(stepNumber - 1, 0));
    };

    const handleSubmit = async (values, bag) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, bag);
        }
        if (isLastStep) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            next(values);
        }
    };

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {formik => (
                <Form>
                    <p>
                        Step {stepNumber + 1} of {totalSteps}
                    </p>
                    {step}
                    <div style={{ display: 'flex' }}>
                        {stepNumber > 0 && (
                            <button onClick={() => previous(formik.values)} type="button">
                                Back
                            </button>
                        )}
                        <div>
                            <button disabled={formik.isSubmitting} type="submit">
                                {isLastStep ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </div>

                </Form>
            )}
        </Formik>
    );
};

const WizardStep = ({ children }) => children;
function RedirectToOrder(id){
    return <OrderDetails/>
}
const OrderForm = () => {
    const[state, dispatch] = useContext(Context);
    const[items, setItems] = useState([]);
    const [oId, setOid] = useState('');
    const addToCart = async (id) =>{
        const response = await api.get(`/products/quote/${id}`).
            then(res => res.data)
            .catch(err=>console.log(err));
        setItems((prev) =>[...prev, response.token]);

    };

    return (
        <div>
            <h1>Create order</h1>
            <Wizard
                initialValues={{
                    location: state.location.name,
                    customer: '',
                    server: state.user.sub,
                    items: [],
                    discount: 10,
                }}
                onSubmit={async values =>{
                    values.items = items;
                    let response = await OrderApi.post('', values)
                        .then(res => res.data)
                        .catch(err => console.log(err));
                    sleep(300).then(() => setOid(response.orderId));


                }
                }
            >
                <WizardStep
                    onSubmit={() => console.log('Step1 onSubmit')}
                    validationSchema={Yup.object({
                        server: Yup.string(),
                    })}
                >

                    <div>
                        <label htmlFor="server">Waiter</label>
                        <Field
                            autoComplete="family-name"
                            component="input"
                            id="server"
                            name="server"
                            placeholder="Waiter"
                            type="text"
                        />
                        <ErrorMessage className="error" component="div" name="server"/>
                    </div>
                    {/*Product list*/}
                    <div>
                        <ProductsFromState addToCart={addToCart}/>
                        <CartIcon count={items.length}/>
                    </div>
                </WizardStep>
                <WizardStep
                    onSubmit={() => console.log('Step2 onSubmit')}
                    validationSchema={Yup.object({
                        customer: Yup.string()
                            .email('Invalid email address'),
                    })}
                >
                    <div>
                        <label htmlFor="customer">Customer</label>
                        <Field
                            autoComplete="email"
                            component="input"
                            id="customer"
                            name="customer"
                            placeholder="Email"
                            type="text"
                        />
                        <ErrorMessage className="error" component="div" name="customer"/>
                        {oId ? (<button type={'button'}><Link to={`/orders/${oId}`}>View order</Link></button> ) : ''}
                    </div>
                </WizardStep>
            </Wizard>
        </div>
    );
}

export default OrderForm;
