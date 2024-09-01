import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { nodeTypes } from "./nodes/nodes";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const getInitNodeData = (nodeID, data) => {
    let nodeData = { id: nodeID, ...data };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        if (!appData) {
          return console.error("Invalid app data");
        }
        const { type, id } = appData;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return console.error("Invalid node type");
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
          id,
          type,
          position,
          data: getInitNodeData(id, appData),
        };
        addNode(newNode);
      }
    },
    [addNode, reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} className="w-full h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background
            className="w-screen h-screen bg-gray-800"
            color="#fff"
            gap={gridSize}
          />
          <Controls />
          <MiniMap className="rounded-xl overflow-hidden" />
        </ReactFlow>
      </div>
    </>
  );
};
