# Backend/Dockerfile

# 1. Basis-Image
FROM python:3.10-slim

# 2. Arbeitsverzeichnis erstellen
WORKDIR /app

# 3. Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Projektdateien kopieren
COPY . .

# 5. Entwicklungsserver starten
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
