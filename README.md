## Mentoring App

Ein Cross-Platform-Projekt mit Django (Backend) und Expo (Frontend).

## Setup für das Frontend

### Schritte:

1. **Navigiere in das Frontend-Verzeichnis**:
   ```bash
   cd frontend/my-expo-app
   ```

2. **Installiere die Abhängigkeiten**:
   ```bash
   npm install
   ```

3. **Starte das Frontend**:
   ```bash
   npm start
   ```

Dieser Befehl startet die Expo-Entwicklungsumgebung, wo du die App auf einem Emulator, physischen Gerät oder im
Web-Browser ausführen kannst.

---

### Weitere Informationen

- Stelle sicher, dass [Node.js](https://nodejs.org/) und npm installiert sind.
- Expo benötigt die Expo Go App, wenn du die App auf einem physischen Gerät testen möchtest.

Viel Erfolg beim Entwickeln! 🚀

## Backend Setup Guide

## 1. Prerequisites

Before starting, ensure you have:

- Python 3.x installed on your system
- pip (Python package installer)
- Access to terminal/command prompt

# Install dependencies
Navigate to backend
```bash
cd backend
```
```bash
pip install -r requirements.txt
```

## 2. Setting Up Virtual Environment

First, we'll create an isolated Python environment for our project:

```bash
pip install virtualenv
```

```bash
virtualenv -p python3 venv
```

```bash
pip install -r requirements.txt
```

## How to run migrations
Navigate to backend
```bash
cd backend
```

Make and review migrations
```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```