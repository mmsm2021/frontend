
import { makeStyles } from '@material-ui/core/styles';
import {useContext, useState} from "react";
import {Context} from "../configuration/Store";
import {Alert} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const Alerter = ({message, type}) =>{
    const [show, setShow] = useState(true);
    const [state, dispatch] = useContext(Context);
    const classes = useStyles();
    const handleClose = () =>{
        setShow(false);
        dispatch({type:'SET_ERROR', payload: false});
    }
        return(
            show &&
            <div className={classes.root}>
                <Alert severity={type} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Message</Alert.Heading>
                    {message}
                </Alert>
            </div>
        )


}

