<?php

if(isset($_POST)){

$nome = addslashes(htmlentities($_POST['nome']));
$pontos = addslashes(htmlentities($_POST['pontos']));
$ip = $_SERVER['REMOTE_ADDR'];
$ua = $_SERVER['HTTP_USER_AGENT'];

$options = array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

$pdo = new PDO('mysql: host=localhost;dbname=quiz', 'root', '', $options);

$stmt = $pdo->prepare("INSERT INTO participacao (ip, nome, user_agent, pontos) VALUES (:ip, :nm, :ua, :p)");
$stmt->bindValue(':ip',$ip);
$stmt->bindValue(':nm',$nome);
$stmt->bindValue(':ua',$ua);
$stmt->bindValue(':p',$pontos);
$stmt->execute();

}