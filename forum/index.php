<?php
require "dbconnect.php";
session_start();
echo $_SESSION['uname'];
$html = file_get_contents("html files/index.html"); // opens template.html
echo $html;
?>
