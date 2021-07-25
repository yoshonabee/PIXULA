FROM python:3.8 AS BASE

COPY requirements.txt /

RUN pip install -r requirements.txt

WORKDIR /auth

EXPOSE 8000

CMD uvicorn main:app --host 0.0.0.0 --root-path ${AUTH_API_PREFIX} --reload
