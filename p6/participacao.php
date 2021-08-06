<?php
date_default_timezone_set( 'America/Sao_Paulo' ); 

require 'config.php';

$options = array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$pdo = new PDO('mysql: host='.DB_HOST.';dbname='.DB_NAME.'', ''.DB_USER.'', ''.DB_PASS.'', $options);

if(!isset($_SERVER['PHP_AUTH_USER']) 
    || $_SERVER['PHP_AUTH_USER'] != USER 
    || $_SERVER['PHP_AUTH_PW'] != PASS)
{
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    echo "<h1>Você não tem autorização para ver esta página, este incidente será relatado!</h1>";
    echo "<h3>IP: ".$_SERVER['REMOTE_ADDR']."</h3>";
    echo "<h3>NAVEGADOR: ".$_SERVER['HTTP_USER_AGENT']."</h3>";
    echo "<h3>DATA: ".date('d/m/Y H:i:s')."</h3>";

    $stmt = $pdo->prepare("INSERT INTO invasores (ip, user_agent) VALUES (:ip, :ua)");
    $stmt->bindValue(':ip',$_SERVER['REMOTE_ADDR']);
    $stmt->bindValue(':ua',$_SERVER['HTTP_USER_AGENT']);
    $stmt->execute();

    exit;
}
else 
{
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Participação</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
</head>
<body style="background-color: #343A40;">
    <section class="container">
        <h1 style="color: #FFF;margin:10px 0px;">Participantes</h1>
        <table class="table table-dark" style="border: 1px solid black;">
            <th>ID</th>
            <th>DATA</th>
            <th>IP</th>
            <th>NOME</th>
            <th>NAVEGADOR</th>
            <th>PONTOS</th>

            <?php
                
                $stmt = $pdo->query("SELECT * FROM participacao");
                $stmt = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                foreach($stmt as $data){
                    echo "<tr>";
                    echo "<td>".$data['id']."</td>";
                    echo "<td>".date('d/m/Y \à\s H:i:s', strtotime($data['data']))."</td>";
                    echo "<td>".$data['ip']."</td>";
                    echo "<td>".$data['nome']."</td>";
                    echo "<td>".$data['user_agent']."</td>";
                    echo "<td>".$data['pontos']."</td>";
                    echo "</tr>";
                }
                
            ?>
            
        </table>
    </section>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>
</body>
</html>
<?php
}
?>