package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
)

type User struct {
    ID     int    `json:"id"`
    Name   string `json:"name"`
    Email  string `json:"email"`
    Active bool   `json:"active"`
}

func fetchUsers(url string) ([]User, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var users []User
    err = json.NewDecoder(resp.Body).Decode(&users)
    return users, err
}

func getActiveUsers(users []User) []User {
    var active []User
    for _, user := range users {
        if user.Active {
            active = append(active, user)
        }
    }
    return active
}

func logUsers(users []User) {
    for _, user := range users {
        fmt.Printf("👤 %s (%s)\n", user.Name, user.Email)
    }
}

func exportUsers(users []User, filename string) error {
    data, err := json.MarshalIndent(users, "", "  ")
    if err != nil {
        return err
    }
    return ioutil.WriteFile(filename, data, 0644)
}

func main() {
    apiURL := os.Getenv("API_URL")
    if apiURL == "" {
        apiURL = "https://jsonplaceholder.typicode.com/users"
    }

    users, err := fetchUsers(apiURL)
    if err != nil {
        panic(err)
    }

    activeUsers := getActiveUsers(users)
    logUsers(activeUsers)
    exportUsers(activeUsers, "users.json")
}
