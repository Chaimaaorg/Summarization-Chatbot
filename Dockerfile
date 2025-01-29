FROM registry.udd.attijariwafa.net/ia-center/tiangolo/uvicorn-gunicorn-fastapi:python3.10-slim-2022-11-25
# FROM python:3.10
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# Install necessary system packages and Poetry
RUN apt clean && apt update && apt install -y \
    curl \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && apt-get clean

RUN pip install poetry && \
    poetry config virtualenvs.create false

# Copy only the pyproject.toml (without poetry.lock)
COPY pyproject.toml /code/

# Allow installing dev dependencies to run tests or only main dependencies
ARG INSTALL_DEV=false
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --with dev --no-root ; else poetry install --no-root; fi"

# Copy the application code
COPY app /code/

# Set the PYTHONPATH for the app
ENV PYTHONPATH=/code
EXPOSE 9090
