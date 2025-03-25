from rest_framework.permissions import BasePermission

class IsMentorOrMentee(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.mentor == request.user or obj.mentee == request.user

class IsMentor(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.mentor == request.user

class IsMentee(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.mentee == request.user