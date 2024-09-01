import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../store";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Modal({ isOpen, setIsOpen }) {
  const { nodes, edges } = useStore();
  const [isLodaing, setIsLodaing] = useState(false);
  const [data, setData] = useState({
    num_nodes: 0,
    num_edges: 0,
    is_dag: false,
  });
  useEffect(() => {
    if (!isOpen) return;
    function fetchDetails() {
      let refined_nodes = nodes.map((node) => node.id);
      let refined_edges = edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      }));
      setIsLodaing(true);
      axios
        .post("http://127.0.0.1:8000/pipelines/parse", {
          nodes: refined_nodes,
          edges: refined_edges,
        })
        .then(({ data }) => {
          // fake loading for 2 seconds
          setTimeout(() => {
            setIsLodaing(false);
            setData((prev) => ({
              ...prev,
              num_nodes: data.num_nodes,
              num_edges: data.num_edges,
              is_dag: data.is_dag,
            }));
          }, 5000);
        })
        .catch((e) => {
          setIsLodaing(false);
        });
    }
    fetchDetails();
    // eslint-disable-next-line
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-full grid place-items-center" />
            <div className="relative z-10">
              {isLodaing ? (
                <div className="my-10 bg-white w-16 h-16 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full grid place-items-center animate-pulse" />
                </div>
              ) : (
                <div className="text-xl my-10">
                  <p>Number of nodes: {data.num_nodes}</p>
                  <p>Number of edges: {data.num_edges}</p>
                  <p>Is DAG: {data.is_dag ? "Yes" : "No"}</p>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Go back
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
