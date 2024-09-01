import { DraggableNode } from "./draggableNode";
import nodes from "./nodes/nodes";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {nodes.map((node, index) => (
          <DraggableNode key={index} node={node} />
        ))}
      </div>
    </div>
  );
};
