import "./side-nav.css";
import SwitchButton from "../switch-button/SwitchButton";
import AddMicroservice from "../add-microservice/AddMicroservice";
import AddResource from "../add-resource/AddResource";
import AddConnection from "../add-connection/AddConnection";

function SideNav() {
    return (
        <div className="nav_cont">
            <h1>VisioNet</h1>
            <hr />

            <div>
                <p>Enable Physics</p>
                <SwitchButton />
            </div>

            <AddMicroservice />
            <AddResource />
            <AddConnection />
            
        </div>
    );
}

export default SideNav;