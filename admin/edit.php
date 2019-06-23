<?php
//データ設定画面
header('Content-Type: text/html; charset=UTF-8');
define('IMAGES_DIR', dirname($_SERVER['SCRIPT_FILENAME']).'/images');
define('MAX_FILE_SIZE', 614400000); // 300KB = 1KB/1024bytes * 300
$images = array();
$imageDir = opendir(IMAGES_DIR);
while ($file = readdir($imageDir)) {
    if ($file == '.' || $file == '..') {
        continue;
    }
    {
        $images[] = 'images/'.$file;
    }
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>データ設定画面</title>
</head>

<body>
<div class="border col-12">
    <br>
    <div class="row">
        <div class="col-md">
            <button type="button" class="btn btn-danger">戻る</button>
            <button type="button" class="btn btn-primary">保存</button>
        </div>
    </div>
</div>
<h1>遺影モード</h1>
<pre>
</pre>
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="MAX_FILE_SIZE" value="<?php echo MAX_FILE_SIZE; ?>">
    <label for="file" class="file-btn">
        アップロード
        <input type="file" name="image">
    </label>
        <input type="submit" value="アップロード">
</form>
<?php foreach ($images as $key => $image) : ?>
    <?php $file_info = pathinfo($image);?>
    <?php $img_extension = strtolower($file_info['extension']);?>
    <?php echo $img_extension . "\n"; ?>
    <?php if ($img_extension == 'mp4'): ?>
        <video id="video<?php echo $key; ?>" src="<?php echo $image; ?>"></video>
    <?php else : ?>
        <img src="<?php echo $image; ?>">
    <?php endif; ?>
<?php endforeach; ?>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>
