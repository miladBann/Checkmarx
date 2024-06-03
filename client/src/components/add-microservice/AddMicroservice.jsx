import "./add-microservices.css";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import React, {useState, useRef} from "react";
import axios from "axios";

function AddMicroservice() {
    const [opened, setOpened] = useState(false);
    const [microserviceId, setMicroserviceId] = useState("");
    const [microserviceLanguage, setMicroserviceLanguage] = useState("");
    const [microserviceIconUrl, setMicroserviceIconUrl] = useState("");
    
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);

    const showForm = () => {
        const formDiv = document.querySelector(".addMS_form");
        formDiv.classList.toggle("show");
        setOpened(prev => !prev);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (microserviceId && microserviceLanguage && microserviceIconUrl) {
            
            try {
                const response = await axios.post('http://localhost:8081/microservices', {
                    microserviceId,
                    language: microserviceLanguage,
                    pic: microserviceIconUrl
                });
                
                console.log(response.data.message);
                
                window.location.reload();
            } catch (error) {
                console.error('Error adding microservice:', error.response.data.error);
                alert(error.response.data.error);
                input1Ref.current.value = "";
                input2Ref.current.value = "";
                input3Ref.current.value = "";
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    return (
        <div className="addMS_container">
            <div className="addMS_container_title">
                <p>Add a Microservice</p>
                {opened ? <FaAngleUp className="icon_size" onClick={showForm}/> : <FaAngleDown className="icon_size" onClick={showForm}/>}
                
            </div>

            <div className="addMS_form hide">
                <div className="addMS_input_cont">
                    <p>Micorservice ID:</p>
                    <input type="text" ref={input1Ref} onChange={(e) => setMicroserviceId(e.target.value)} required/>
                </div>

                <div className="addMS_input_cont">
                    <p>Micorservice Language:</p>
                    <input type="text" ref={input2Ref} onChange={(e) => setMicroserviceLanguage(e.target.value)} required/>
                </div>

                <div className="addMS_input_cont">
                    <p>Micorservice Icon URL:</p>
                    <input type="text" placeholder="only urls for pngs or jpgs" ref={input3Ref} onChange={(e) => setMicroserviceIconUrl(e.target.value)} required/>
                </div>
                
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    );
}

export default AddMicroservice;