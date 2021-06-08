import {useContext, useEffect, useState} from "react";
import {Context} from "../configuration/Store";
import {api} from "../services/ApiService";
import {Formik} from "formik";
import {Col, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const ProductDeets = () =>{
    const [state,dispatch] = useContext(Context);
    const [init,setInit] = useState({});
    let {id} = useParams();
    useEffect(async () =>{
        await api(state.token).get(`/products/${id}`).then(
            res => setInit(res.data)
        ).catch(err => dispatch({type:'SET_ERROR',payload:err}));
    },[]);
    console.log(init);
    if (!init) return <h1>Hi</h1>;
    let keys = Object.keys(init);
    console.log(keys)
    let ents = Object.entries(init);
    let initial = init;
    console.log(ents)
    return(
        <Formik initialValues={initial}
                onSubmit={async (values) =>{
                    sleep(300).then( prom =>{
                        alert(JSON.stringify(values,null,2));
                    })
                }}>{({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting,
                     }) =>(
            <Form onSubmit={handleSubmit} as={Col} sm={5}>
                {keys.map((entry,index)=>{
                    if (typeof entry === 'object'){
                       return (
                            <Form.Group  className={"container-fluid"}>
                                <Form.Label><FormattedMessage id={`${entry[index]}`}/></Form.Label>
                                <Form.Control    name={`${entry}`}
                                            value={values[entry]}
                                            placeholder={JSON.stringify(initial[entry],null,2)}
                                            onChange={handleChange}
                                                 type={"textarea"}
                                            className={"input-group"}/>
                            </Form.Group>)
                    }


                    return (
                        <Form.Group  className={"container-fluid"}>
                            <Form.Label><FormattedMessage id={`${entry}`}/></Form.Label>
                            <Form.Control    name={`${entry}`}
                                             readOnly
                                             value={values[entry]}
                                             placeholder={initial[entry]}
                                             onChange={handleChange}
                                             className={"input-group"}/>
                        </Form.Group>
                    )
                })}

                <button type={"submit"}>lol</button>
            </Form>
        )}
        </Formik>

    )
}
