<?php  //サーバー上からデータを削除する処理
    var_dump($_POST['target']);
        unlink($_POST['target']);
