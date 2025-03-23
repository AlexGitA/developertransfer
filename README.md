# MentorX

## Setup & Installation

### Backend (Django)

# Create & activate virtual environment

```bash 
python -m venv env
```

# Activate Script (env will show in terminal)

```bash
env\Scripts\activate 
```

# Install dependencies

```bash
pip install -r requirements.txt
```

# Run migrations

```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```

## To start

# Terminal 1 - Run Django

```bash
python manage.py runserver
```

--- 

# Terminal 2 - Run Vite

### go to frontend directory

```bash
cd frontend
```

## get npm resources

```bash
npm install
```

## npm run

```bash
npm run dev
```

# Update Req

```bash
pip freeze > requirements.txt
```

# Super User credentials
    "username": "admin",
    "password": "adminadmin"

### else:

```bash
python manage.py createsuperuser
```

### Test user peterX (id:4), markusX (id:5), timX (id:6), alexX (id:7), ammarX (id:8), illyaX (id:10)
    "password": "pass4Test"



## Bug fixes

### Migration / runserver failed

```No module named 'rest_framework_simplejwt'```
do this:

```bash
pip install --upgrade djangorestframework-simplejwt
```

### No Vite found

```"vite" is not recognized as an internal or external command, operable program or batch file.```
do this:

```bash
npm install -g vite
```