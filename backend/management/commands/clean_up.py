from django.core.management.base import BaseCommand
from friendship.models import Friend

class Command(BaseCommand):
    help = 'Remove duplicate friendship entries'

    def handle(self, *args, **options):
        seen = set()
        duplicates = []

        for friend in Friend.objects.all().order_by('created'):
            pair = frozenset([friend.from_user_id, friend.to_user_id])
            if pair in seen:
                duplicates.append(friend.id)
            else:
                seen.add(pair)

        if duplicates:
            Friend.objects.filter(id__in=duplicates).delete()
            self.stdout.write(f"Deleted {len(duplicates)} duplicate friendships")
        else:
            self.stdout.write("No duplicates found")