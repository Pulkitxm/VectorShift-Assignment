import { DraggableNode } from "./draggableNode";
import nodes from "./nodes/nodes";

export const PipelineToolbar = () => {
  return (
    <div className="mt-5 flex y gap-4 p-4 bg-transparent absolute z-50">
      {nodes.map((node, index) => (
        <DraggableNode key={index} node={node} />
      ))}
    </div>
  );
};
