from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_admin', 'last_login')  # use last_login if you don't have last_login_time
    list_filter = ('is_admin',)
    search_fields = ('username', 'email')
