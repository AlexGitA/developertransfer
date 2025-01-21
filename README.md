# Project Name

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

# Start Django server
python manage.py runserver

## To start

# Terminal 1 - Run Django
python manage.py runserver

# Terminal 2 - Run Vite
go to frontend
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
