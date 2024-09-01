# Assignment for VectorShift

## Overview
This project consists of a frontend and backend service that are containerized using Docker. The frontend runs on port 3000, and the backend runs on port 8000. Docker Compose is used to manage the multi-container application.

## Prerequisites
To run this project, you need to have the following prerequisites installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

The project structure is as follows:

```
├── docker-compose.yml
├── frontend/
│   └── Dockerfile
└── backend/
    └── Dockerfile
```

Please make sure you have the necessary prerequisites installed before proceeding with the project setup.

# Running with Docker
```shell
docker compose up -d
```

# Running without Docker
```shell
cd frontend
npm install
npm start

& 

cd backend
poetry install
poetry run python main.py
```
