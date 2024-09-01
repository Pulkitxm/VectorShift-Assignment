export const DraggableNode = ({ node }) => {
  const { type, label } = node;
  const onDragStart = (event) => {
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        ...node,
        type,
        id: Math.random().toString(36).substring(7),
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      className={`${type} cursor-grab w-20 h-10 bg-white hover:bg-gray-200 flex items-center justify-center rounded-lg`}
      draggable
    >
      <span className="text-black">{label}</span>
    </div>
  );
};
