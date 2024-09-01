import { Handle } from "reactflow";

export default function Node({ data, id }) {
  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <div>
        <span>{data.label}</span>
      </div>
      {data.elements?.map((element, index) => {
        if (element.type === "text") {
          return (
            <div key={index}>
              <span>{element.value}</span>
            </div>
          );
        }
        if (element.type === "input") {
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
        />
      ))}
    </div>
  );
}

function Input({ val, label }) {
  return (
    <label>
      {label}:
      <input type="text" defaultValue={val} />
    </label>
  );
}

function Select({ values, label }) {
  return (
    <label>
      {label}:
      <select>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
