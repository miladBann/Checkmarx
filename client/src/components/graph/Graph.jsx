import React, { useContext, useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { EnablePhysicsContext } from "../../pages/Main";

const Graph = ({ microservices, resources }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const { enabledPhysics } = useContext(EnablePhysicsContext);

  useEffect(() => {
    const nodes = new DataSet();
    const edges = new DataSet();

    // Positioning variables
    const verticalSpacing = 120;
    let microserviceY = 50;
    let resourceY = 50;

    microservices.forEach((microservice) => {
      nodes.add({
        id: microservice.microserviceId,
        label: "",
        shape: 'circularImage',
        image: microservice.pic,
        group: 'microservice',
        x: 50,
        y: microserviceY,
      });
      microserviceY += verticalSpacing;
    });

    resources.forEach((resource) => {
      const clusterId = `cluster-${resource.name}`;

      nodes.add({
        id: clusterId,
        shape: 'box',
        group: 'resource',
        x: 400,
        y: resourceY,
        widthConstraint: {
          minimum: 150,
          maximum: 150
        },
        heightConstraint: {
          minimum: 50,
          maximum: 50
        }
      });

      nodes.add({
        id: `${resource.name}-label`,
        label: resource.name,
        shape: 'text',
        group: 'resource',
        x: 540,
        y: resourceY,
        font: {
          face: 'arial',
          size: 16,
          color: "white"
        }
      });

      nodes.add({
        id: `${resource.name}-access`,
        label: "",
        shape: 'circularImage',
        image: resource.access_icon,
        group: 'resource',
        x: 360,
        y: resourceY,
        size: 28
      });

      nodes.add({
        id: `${resource.name}-type`,
        label: "",
        shape: 'circularImage',
        image: resource.type_icon,
        group: 'resource',
        x: 440,
        y: resourceY,
        size: 28
      });

      const getEdgeOptions = (from, to) => {
        const edgeOptions = { from, to };
        if (!enabledPhysics) {
          edgeOptions.color = 'rgba(0,0,0,0)';
        }
        return edgeOptions;
      };

      edges.add(getEdgeOptions(`${resource.name}-label`, clusterId));
      edges.add(getEdgeOptions(`${resource.name}-access`, clusterId));
      edges.add(getEdgeOptions(`${resource.name}-type`, clusterId));

      resource.microservices.forEach((msId) => {
        edges.add({
          from: msId,
          to: clusterId,
        });
      });

      resourceY += verticalSpacing;
    });

    const networkData = {
      nodes,
      edges,
    };

    const options = {
      nodes: {
        size: 30,
      },
      edges: {
        width: 2,
      },
      groups: {
        microservice: {
          shape: 'circle',
          color: { background: 'lightpink', border: 'white' },
        },
        resource: {
          shape: 'box',
          color: { background: 'lightblue', border: 'white' },
        },
      },
      physics: {
        enabled: false,
      },
    };

    const network = new Network(containerRef.current, networkData, options);
    networkRef.current = network;

    const handleResize = () => {
      if (networkRef.current) {
        networkRef.current.redraw();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [microservices, resources, enabledPhysics]);

  useEffect(() => {
    if (networkRef.current) {
      networkRef.current.setOptions({
        physics: {
          enabled: enabledPhysics,
        },
      });
    }
  }, [enabledPhysics]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '95vh', width: '90vw' }} />
  );
};

export default Graph;
