import React, { createContext, useState, useEffect } from 'react';
import Graph from '../components/graph/Graph';
import SideNav from '../components/side-nav/SideNav';
import ParticlesBg from 'particles-bg';

export const EnablePhysicsContext = createContext();

function Main() {
    const [microservices, setMicroservices] = useState([]);
    const [resources, setResources] = useState([]);
    const [enabledPhysics, setEnabledPhysics] = useState(false);

    const togglePhysics = () => {
        setEnabledPhysics(prev => !prev);
    }

    useEffect(() => {
        const fetchMicroservices = async () => {
        try {
            const response = await fetch('http://localhost:8081/microservices');
            const data = await response.json();
            setMicroservices(data.microservices || []);
        } catch (error) {
            console.error('Error fetching microservices:', error);
        }
        };

        const fetchResources = async () => {
        try {
            const response = await fetch('http://localhost:8081/resources');
            const data = await response.json();
            setResources(data.resources || []);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
        };

        fetchMicroservices();
        fetchResources();
    }, []);

    return (
        <div className='wrapper'>
            <EnablePhysicsContext.Provider value={{enabledPhysics, togglePhysics}}>
                <SideNav />
                <Graph microservices={microservices} resources={resources} />
            </EnablePhysicsContext.Provider>
            <ParticlesBg type="cobweb" num={300} bg={true} />
        </div>
    );
}

export default Main;