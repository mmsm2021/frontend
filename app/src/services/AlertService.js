import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const Alerter = ({message, type}) =>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Alert severity={type}>{message}</Alert>
        </div>
    )
}

