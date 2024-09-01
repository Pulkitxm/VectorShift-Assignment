import React, { useEffect, useRef } from "react";

import { Handle } from "reactflow";

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
          className="bg-white"
        />
      ))}
    </div>
  );
}

function Input({ val, label }) {
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    const span = spanRef.current;

    const handleInput = () => {
      span.innerHTML = input.value.replace(/\s/g, "&nbsp;");
      input.style.width = span.offsetWidth + "px";
    };

    input.addEventListener("input", handleInput);

    handleInput();

    return () => {
      input.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <label className="flex flex-nowrap items-center">
      <p className="mr-2">{label}:</p>
      <div className="relative">
        <input
          ref={inputRef}
          className="bg-transparent outline-none border-b-2 border-white text-app-color-1"
          type="text"
          defaultValue={val}
          style={{ width: "auto", minWidth: "150x" }}
        />
        <span
          ref={spanRef}
          className="invisible absolute top-0 left-0 whitespace-pre-wrap"
        ></span>
      </div>
    </label>
  );
}

function Select({ values, label }) {
  return (
    <label className="flex items-center my-2">
      {label}:
      <select className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {values.map((value, index) => (
          <option className="text-lg" key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
