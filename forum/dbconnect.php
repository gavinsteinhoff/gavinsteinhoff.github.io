<?php
$host="localhost";
$username="root";
$password="";
$database="forum";
$link = mysqli_connect ($host, $username, $password, $database );
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
?>