import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector } from 'react-redux';

const ReactFlowContext = () => {
    const users = useSelector(state => state.users.users) || [];
    const [positions, setPositions] = useState({});

    // Calculate positions dynamically when users change
    useEffect(() => {
        const newPositions = {};
        users.forEach((user, index) => {
            newPositions[user._id] = {
                x: (index % 15) * 200,
                y: Math.floor(index / 5) * 150
            };
        });
        setPositions(newPositions);
    }, [users]);

    // Generate user and hobby nodes
    const nodes = users.flatMap(user => {
        const userPosition = positions[user._id] || { x: Math.random() * 400, y: Math.random() * 400 };

        const userNode = {
            id: user._id.toString(),
            data: { label: `${user.username} (${user.age})` },
            position: userPosition
        };

        const hobbyNodes = user.hobbies.map((hobby, index) => ({
            id: `${user._id}-hobby-${index}`,
            data: { label: hobby },
            position: {
                x: userPosition.x + (index) * 170, 
                y: userPosition.y + 120 
            }
        }));

        return [userNode, ...hobbyNodes];
    });

    // Generate edges connecting users to their hobbies
    const edges = users.flatMap(user =>
        user.hobbies.map((_, index) => ({
            id: `edge-${user._id}-hobby-${index}`,
            source: user._id.toString(),
            target: `${user._id}-hobby-${index}`
        }))
    );

    // State management for ReactFlow
    const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
    const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [users, setNodes, setEdges]);

    // Handle new connections in the graph
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);

    return (
        <div className="w-full h-screen">
            <ReactFlow 
                nodes={nodesState} 
                edges={edgesState} 
                onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange} 
                onConnect={onConnect}
            >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default ReactFlowContext;
