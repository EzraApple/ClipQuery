#!/bin/bash
ENV_DIR="scripts/python/env"

# Define the location of your requirements.txt file
REQUIREMENTS_PATH="scripts/python/requirements.txt"

# Check if the virtual environment directory already exists
if [ ! -d "$ENV_DIR" ]; then
    echo "Creating virtual environment in $ENV_DIR..."
    python3 -m venv $ENV_DIR
else
    echo "Virtual environment already exists in $ENV_DIR"
fi

# Activate the virtual environment
source $ENV_DIR/bin/activate

# Upgrade pip to its latest version within the virtual environment
pip install --upgrade pip

# Check if requirements.txt exists
if [ ! -f "$REQUIREMENTS_PATH" ]; then
    echo "requirements.txt not found at $REQUIREMENTS_PATH"
    exit 1
fi

# Install Python packages from requirements.txt
echo "Installing dependencies from $REQUIREMENTS_PATH..."
pip install -r $REQUIREMENTS_PATH

echo "Setup complete."