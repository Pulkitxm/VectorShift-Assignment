from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import json


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[str]
    edges: List[Edge]


app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def is_dag(pipeline: Pipeline) -> bool:
    graph = {node: set() for node in pipeline.nodes}
    for edge in pipeline.edges:
        graph[edge.source].add(edge.target)

    visited = set()
    rec_stack = set()

    def is_cyclic(node):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if is_cyclic(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(node)
        return False

    for node in pipeline.nodes:
        if node not in visited:
            if is_cyclic(node):
                return False
    return True


def calc_num_nodes(pipeline: Pipeline) -> int:
    return len(pipeline.nodes)


def calc_num_edges(pipeline: Pipeline) -> int:
    return len(pipeline.edges)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline) -> Dict:
    try:
        num_nodes = calc_num_nodes(pipeline)
        num_edges = calc_num_edges(pipeline)
        dag = is_dag(pipeline)

        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': dag
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, access_log=False)
