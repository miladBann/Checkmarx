import React, { useContext, useState } from 'react';
import "./switch-button.css";
import {EnablePhysicsContext} from "../../pages/Main";

const SwitchButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {togglePhysics} = useContext(EnablePhysicsContext);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    togglePhysics();
  };

  return (
    <button className={`switch-button ${isEnabled ? 'enabled' : ''}`} onClick={toggleSwitch}>
      <span className="circle"></span>
    </button>
  );
};

export default SwitchButton;