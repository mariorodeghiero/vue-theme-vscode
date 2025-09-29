import fetch from "node-fetch";
import fs from "fs";

const API_URL = process.env.API_URL || "https://jsonplaceholder.typicode.com/users";


export async function fetchUsers(url) {
  const response = await fetch(url);
  return await response.json();
}

export function getActiveUsers(users) {
  return users.filter(user => user.active !== false);
}

export function logUsers(users) {
  users.forEach(user => {
    console.log(`👤 ${user.name} (${user.email})`);
  });
}

export function exportUsers(users, filename = "users.json") {
  fs.writeFileSync(filename, JSON.stringify(users, null, 2));
}

(async () => {
  const users = await fetchUsers(API_URL);
  const activeUsers = getActiveUsers(users);
  logUsers(activeUsers);
  exportUsers(activeUsers);
})();
