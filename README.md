# MentorX

## Setup & Installation

### Backend (Django)
# Create & activate virtual environment
python -m venv env

# Activate Script
env\Scripts\activate (env will show in terminal)

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

## To start

# Terminal 1 - Run Django
python manage.py runserver

# Terminal 2 - Run Vite
### go to frontend directory
cd frontend
## npm run
npm run dev


# Update Req
pip freeze > requirements.txt

# Super User credentials
username: admin
password: adminadmin
### else:
python manage.py createsuperuser

## Bug fixes

### Migration / runserver failed
```No module named 'rest_framework_simplejwt'```
do this:
```pip install --upgrade djangorestframework-simplejwt```

### No Vite found
```"vite" is not recognized as an internal or external command, operable program or batch file.```
do this:
```npm install -g vite```