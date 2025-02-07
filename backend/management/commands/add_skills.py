from django.core.management.base import BaseCommand
from backend.models import Skill


# python manage.py add_skills
class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        skills_data = {
            'LANG': [
                'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
                'Ruby', 'Go', 'PHP', 'Swift', 'Kotlin', 'Rust'
            ],
            'FRONT': [
                'React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'HTML',
                'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'jQuery',
                'Redux', 'WebGL'
            ],
            'BACK': [
                'Django', 'Node.js', 'Express.js', 'Flask', 'FastAPI',
                'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET Core',
                'NestJS'
            ],
            'DB': [
                'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite',
                'Elasticsearch', 'GraphQL', 'Firebase'
            ],
            'DEVOPS': [
                'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud',
                'Jenkins', 'GitLab CI', 'Terraform'
            ],
            'MOBILE': [
                'React Native', 'Flutter', 'iOS Development',
                'Android Development'
            ],
            'TEST': [
                'Jest', 'Cypress', 'Selenium', 'PyTest'
            ],
            'OTHER': [
                'Git', 'Linux', 'Nginx', 'REST API', 'WebSockets',
                'System Design', 'Microservices'
            ]
        }

        for skill_type, skills in skills_data.items():
            for skill_name in skills:
                skill, created = Skill.objects.get_or_create(
                    name=skill_name,
                    defaults={'skill_type': skill_type}
                )
                if created:
                    self.stdout.write(f'Added {skill_type} skill: {skill_name}')
                else:
                    self.stdout.write(f'Skill already exists: {skill_name}')
