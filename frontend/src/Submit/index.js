import { useState } from "react";
import Modal from "./Modal";

export default function Submit() {
  const [isOpen, setIsOpen] = useState(false);
  function handleSubmit() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        className="px-5 py-2 bg-app-color-1 hover:brightness-75 text-black rounded-lg fixed right-10 top-10 z-20"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
