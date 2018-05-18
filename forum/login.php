<?php
require "dbconnect.php";
session_start();

if(isset($_GET['login'])) {
    $uname = $_GET['uname'];
    $pass = $_GET['pass'];
    $hash = "";

    $query = $link->prepare("SELECT pass FROM poster WHERE username = ?");
    $query->bind_param('s', $uname);
    $query->execute();
    $result = $query->get_result();
    while($row = $result->fetch_assoc()){
        $hash = $row['pass'];
    }

    if (password_verify($pass,$hash)) {
        $_SESSION['uname'] = $uname;
        $_SESSION['auth'] = true;
        header('Location: index.php');
        die();
    } else {
        $message = "Username or Password is invalid";
    }
} else {
    $message = "Login to name";
    session_unset();
    session_destroy();
    session_write_close();
    setcookie(session_name(),'',0,'/');
}




$html = file_get_contents("html files/login.html");
$html = str_replace("{{MESSAGE}}", $message, $html);
echo $html;

?>


