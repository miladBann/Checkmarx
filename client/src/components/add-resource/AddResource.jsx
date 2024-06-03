import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import React, {useState, useRef} from "react";
import "./add-resource.css";
import axios from "axios";

function AddResource() {
    const [opened, setOpened] = useState(false);
    const showForm = () => {
        const formDiv = document.querySelector(".addRS_form");
        formDiv.classList.toggle("show");
        setOpened(prev => !prev);
    }

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [typeIcon, setTypeIcon] = useState("");
    const [microserviceID, setMicroserviceID] = useState("");

    const [selectedCheckbox, setSelectedCheckbox] = useState(null);

    const handleCheckboxChange = (event) => {
        const { name } = event.target;
        setSelectedCheckbox(name);
    };

    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:8081/resources', {
            name: name,
            access: selectedCheckbox,
            type: type,
            type_icon: typeIcon,
            microservices: microserviceID,
          });
          console.log('Resource added:', response.data);
          window.location.reload();
        } catch (error) {
          console.error('Error adding resource:', error);
          alert(error.response.data.error);
          input1Ref.current.value = "";
          input2Ref.current.value = "";
          input3Ref.current.value = "";
          input4Ref.current.value = "";
        }
      };

    return (
        <div className="addRS_container">
            <div className="addRS_container_title">
                <p>Add a Resource</p>
                {opened ? <FaAngleUp className="icon_size" onClick={showForm}/> : <FaAngleDown className="icon_size" onClick={showForm}/>}
                
            </div>

            <div className="addRS_form hide">
                <div className="addRS_input_cont">
                    <p>Resource Name:</p>
                    <input type="text" data-testid="input1" ref={input1Ref} onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div className="addRS_input_cont">
                    <p>Access type:</p>
                    <input type="checkbox" data-testid="box1" name="private" checked={selectedCheckbox === 'private'} onChange={handleCheckboxChange}/>Private
                    <input type="checkbox" data-testid="box2" name="public" checked={selectedCheckbox === 'public'} onChange={handleCheckboxChange}/>Public
                    <input type="checkbox" data-testid="box3" name="unknown" checked={selectedCheckbox === 'unknown'} onChange={handleCheckboxChange}/>Unknown
                </div>

                <div className="addRS_input_cont">
                    <p>Resource Type:</p>
                    <input type="text" data-testid="input2" ref={input2Ref} onChange={(e) => setType(e.target.value)} required/>
                </div>

                <div className="addRS_input_cont">
                    <p>Resource Type icon URL:</p>
                    <input type="text" data-testid="input3" placeholder="only urls for pngs or jpgs" ref={input3Ref} onChange={(e) => setTypeIcon(e.target.value)} required/>
                </div>

                <div className="addRS_input_cont">
                    <p>Microservice ID:</p>
                    <input type="text" data-testid="input4" ref={input4Ref} placeholder="provide an ID that exists" onChange={(e) => setMicroserviceID(e.target.value)} required/>
                </div>
                
                <button onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    );
}

export default AddResource;