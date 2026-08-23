# Base44 Dev Environment

## Overview
A simple Flask AI customer-service chatbot. The web UI (`app/templates/index.html`) uses the browser Web Speech API for voice input and posts transcripts to `/process_chat`, which routes through a keyword "Researcher" knowledge base and an "Interface" persona.

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
- Web entry point: http://localhost:3000
- Health check: `GET /` (returns the chat UI HTML)

## How it works
- `docker-compose.base44.yml` runs `python:3.12-slim`, bind-mounts the repo at `/app`, installs `requirements.txt` (flask, requests) at startup, and runs `flask run --debug` (live reload via watchfiles).
- `app.py` was fixed to point Flask at `app/templates` and `app/static` (the repo stores them under `app/`, not at the repo root where Flask looks by default).
- No external services or secrets are required.

## Verifying
```
curl -sf http://localhost:3000/                                   # UI
curl -sf -X POST -d "user_input=shipping" http://localhost:3000/process_chat   # chat API
```
