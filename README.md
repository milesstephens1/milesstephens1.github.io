### INSTRUCTIONS

## PYTHON SERVER
1. To begin booting up the python server, use 'venv/Scripts/activate'

2. At the start of the virtual environment, all dependencies may not be installed: run 'pip install -r requirements.txt'

3. Start the server with 'uvicorn main:app --reload', the '--reload' flag ensures that the dev server will be restarted when the file is saved
---

## BUILD SERVER
Run:
rm -rf dist
npm run build
npm run deploy
---
