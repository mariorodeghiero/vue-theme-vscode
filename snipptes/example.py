import os
import requests
import json

API_URL = os.getenv("API_URL", "https://jsonplaceholder.typicode.com/users")

def fetch_users(url):
    response = requests.get(url)
    return response.json()

def get_active_users(users):
    return [user for user in users if user.get("active", True)]

def log_users(users):
    for user in users:
        print(f"👤 {user['name']} ({user['email']})")

def export_users(users, filename="users.json"):
    with open(filename, "w") as f:
        json.dump(users, f)

if __name__ == "__main__":
    users = fetch_users(API_URL)
    active_users = get_active_users(users)
    log_users(active_users)
    export_users(active_users)
