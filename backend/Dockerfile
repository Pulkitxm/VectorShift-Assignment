FROM python

RUN pip install poetry  
RUN mkdir -p /app  
COPY . /app

WORKDIR /app

RUN poetry install
CMD ["poetry", "run", "python", "main.py"]