import { Handle } from "reactflow";
import Input from "./Input";
import Select from "./Select";

export default function Node({ data, id }) {
  return (
    <div className="border-2 border-white rounded-xl bg-gray-800 text-white p-5 flex flex-col space-y-3">
      <div>
        <h1 className="text-2xl ">{data.label}</h1>
      </div>
      {data.elements?.map((element, index) => {
        if (element.type === "text") {
          return (
            <div key={index}>
              <span>{element.value}</span>
            </div>
          );
        }
        if (element.type === "inputText") {
          return (
            <Input key={index} val={element.value} label={element.label} />
          );
        } else if (element.type === "select") {
          return (
            <Select key={index} values={element.values} label={element.label} />
          );
        }
        return "No element";
      })}
      {data.handles?.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className="bg-white"
        />
      ))}
    </div>
  );
}




