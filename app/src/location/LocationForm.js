import {useContext} from "react";
import {Context} from "../configuration/Store";

const LocationForm = () =>{
    const [state,dispatch] = useContext(Context);
    let formData = Object.keys(state.location);
    function createUI()
    {
        return formData.map((el, i) =>
            <div key={i}>
                <input type="text" value={el || ''} />
                <input type='button' value='remove' />
            </div>
        )
    }
    return createUI();
}; export default LocationForm;
