import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import React, {useState, useRef} from "react";
import axios from "axios";
import "./add-connection.css";

function AddConnection() {
    const [opened, setOpened] = useState(false);
    const [microserviceId, setMicroserviceId] = useState("");
    const [resourceName, setResourceName] = useState("");
    
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    const showForm = () => {
        const formDiv = document.querySelector(".addCO_form");
        formDiv.classList.toggle("show");
        setOpened(prev => !prev);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8081/add-connection', {
                microserviceId,
                resourceName
            });
            console.log(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Error adding connection');
            input1Ref.current.value = "";
            input2Ref.current.value = "";
        }
    }

    return (
        <div className="addCO_container">
            <div className="addCO_container_title">
                <p>Add a Connection</p>
                {opened ? <FaAngleUp className="icon_size" onClick={showForm}/> : <FaAngleDown className="icon_size" onClick={showForm}/>}
                
            </div>

            <div className="addCO_form hide">
                <div className="addCO_input_cont">
                    <p>Micorservice ID:</p>
                    <input type="text" ref={input1Ref} onChange={(e) => setMicroserviceId(e.target.value)} required/>
                </div>

                <div className="addCO_input_cont">
                    <p>Resource Name:</p>
                    <input type="text" ref={input2Ref} onChange={(e) => setResourceName(e.target.value)} required/>
                </div>
                
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    );
}

export default AddConnection;