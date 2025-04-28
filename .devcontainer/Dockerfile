ARG VARIANT="22"
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

# Install system dependencies
RUN apt-get update \
  && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends curl gnupg2 tar xz-utils build-essential \
  && rm -rf /var/lib/apt/lists/*

# Switch to node user to install wasmtime
USER node

# Install Wasmtime
RUN curl https://wasmtime.dev/install.sh -sSf | bash

# Install just
RUN npm install -g rust-just

# Set up workspace
WORKDIR /workspace
