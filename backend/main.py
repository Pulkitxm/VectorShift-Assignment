from fastapi import FastAPI, Form

app = FastAPI()


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    return {'status': 'parsed'}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, access_log=False)
