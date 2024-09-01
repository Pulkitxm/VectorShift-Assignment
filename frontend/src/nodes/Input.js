import { useEffect, useRef, useState } from "react";

export default function Input({ val, label }) {
  const [value, setValue] = useState(val);
  const [setshowInput, setSetshowInput] = useState(false);
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
  useEffect(() => {
    setSetshowInput(value === "{{input}}");
  }, [value]);
  return (
    <>
      <label className="flex flex-nowrap items-center">
        <p className="mr-2">{label}:</p>
        <div className="relative">
          <input
            ref={inputRef}
            className="bg-transparent outline-none border-b-2 border-white text-app-color-1 min-w-20"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <span
            ref={spanRef}
            className="invisible absolute top-0 left-0 whitespace-pre-wrap"
          ></span>
        </div>
      </label>
      {setshowInput && <InputBox label={label} />}
    </>
  );
}

function InputBox({ label }) {
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
    <div
      draggable
      className="bg-gray-400 absolute right-48 rounded-lg p-4 py-3 text-black"
    >
      <p>{label}</p>
      <div className="relative">
        <input
          ref={inputRef}
          className="bg-transparent outline-none border-b-2 border-black min-w-20"
          type="text"
          defaultValue={""}
          style={{ width: "auto", minWidth: "150x" }}
        />
        <span
          ref={spanRef}
          className="invisible absolute top-0 left-0 whitespace-pre-wrap"
        ></span>
      </div>
    </div>
  );
}
