import Node from "./index";
import { Position } from "reactflow";

const nodes = [
  {
    label: "Input",
    type: "customInput",
    node: Node,
    elements: [
      { type: "input", value: "Hello World!", label: "Name" },
      {
        type: "select",
        label: "Type",
        values: ["Text", "Image"],
      },
    ],
    handles: [
      {
        type: "source",
        position: Position.Right,
        id: "output",
      },
    ],
  },
  {
    label: "LLM",
    type: "llm",
    node: Node,
    elements: [{ type: "text", value: "This is a LLM." }],
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "system",
        style: { top: `${100 / 3}%` },
      },
      {
        type: "target",
        position: Position.Left,
        id: "prompt",
        style: { top: `${200 / 3}%` },
      },
      {
        type: "source",
        position: Position.Right,
        id: "response",
      },
    ],
  },
  {
    label: "Output",
    type: "customOutput",
    node: Node,
    elements: [
      { type: "input", label: "Text" },
      {
        type: "select",
        label: "Type",
        values: ["Text", "Image"],
      },
    ],
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "input",
      },
    ],
  },
  {
    label: "Text",
    type: "input",
    node: Node,
    elements: [{ type: "input", label: "Text" }],
    handles: [
      {
        type: "source",
        position: Position.Right,
        id: "output",
      },
    ],
  },
];

export default nodes.map((node, index) => ({ ...node, id: index }));
export const nodeTypes = nodes.reduce((types, node) => {
  types[node.type] = node.node;
  return types;
}, {});
