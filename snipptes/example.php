<?php
// Import config
require_once 'config.php';

// Fetch users from API
function fetchUsers($url) {
    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Filter active users
function getActiveUsers($users) {
    $active = [];
    foreach ($users as $user) {
        if ($user['active']) {
            $active[] = $user;
        }
    }
    return $active;
}

// Main logic
$apiUrl = $CONFIG['API_URL'];
$users = fetchUsers($apiUrl);
$activeUsers = getActiveUsers($users);

foreach ($activeUsers as $user) {
    echo "👤 {$user['name']} ({$user['email']})\n";
}

// Export-like pattern
class UserExporter {
    public static function export($users) {
        file_put_contents('users.json', json_encode($users));
    }
}

UserExporter::export($activeUsers);
?>
