<?php
//TOP画面
header('Content-Type: text/html; charset=UTF-8');
?>


<!DOCTYPE html>
<html lang="ja">
<meta charset="utf-8">
<title>TOP画面</title>
<style>
    .container {
        width: 600px;
    }
    .box{
        overflow:hidden;
    }
    .left {
        background-color: #D3D3D3;
        padding: 20px;
        margin: 5px;
        width: 300px;
        float:left;
    }
    .right {
        background-color: #ADFF2F;
        padding: 20px;
        margin: 5px;
        width: 300px;
        float:right;

    }
</style>
<head>
    <meta charset=”utf-8″>
    <script src="http://code.jquery.com/jquery-2.2.4.js"></script>
    <script type="text/javascript" src="./js/send.js"></script>
</head>
<body>
<a href="edit.php">データ設定画面へ</a>
<br>
<input type="text" id="message" size="50" />
<div id="chat" class="container"></div>
</body>
</html>















