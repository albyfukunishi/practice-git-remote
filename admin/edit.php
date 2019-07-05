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
    <?php if ($img_extension == 'mp4'): ?>
        <video id="video<?php echo $key; ?>" src="<?php echo $image; ?>"></video>
    <?php else : ?>
        <img src="<?php echo $image; ?>">
    <?php endif; ?>
    <form>
        <div class="element">
            <label><?php echo $image; ?></label>
            <input type="data" i value="1">
        </div>
        <div class="change">↑↓</div>
        <div class="element">
            <label for="banana"><?php echo $image; ?></label>
            <input type="text" value="2">
        </div>
        <div class="change">↑↓</div>
        <div class="element">
            <label for="cat"><?php echo $image; ?></label>
            <input type="text" value="3">
        </div>
        <div class="change">↑↓</div>
        <div class="element">
            <label for="dog"><?php echo $image; ?></label>
            <input type="text" value="4">
        </div>
    </form>
    <button type="button" name="delete_btn" value="1" class="file_delete" target="<?php echo $image; ?>">削除</button><br>
<?php endforeach; ?>
<style>
    img {
        width: 384px;
        height: 216px;
    }
    video {
        width: 300px;
        height: 300px;
    }
</style>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script type="text/javascript">
    $('.file_delete').click(function() {
        console.log('クリックされました！')
        console.log($(this).attr("target"));
        window.confirm("本当に削除しますか？");
        $.ajax({
            url:'./delete.php',
            type:'POST',
            data:{
                'target':$(this).attr("target")
            }
        })
        // Ajaxリクエストが成功した時発動
            .done( (data) => {
                console.log(data);
                window.location.reload()
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {
                window.alert("削除に失敗しました");
                console.log(data);
            })
            // Ajaxリクエストが成功・失敗どちらでも発動
            .always( (data) => {
            });
    })
    $(function () {
        $('div.change').click(function() {
            // 上要素の内容取得
            var prev_element = $(this).prev('div');
            // 下要素の内容取得
            var next_element = $(this).next('div');

            // 設定
            $(this).before(next_element);
            $(this).after(prev_element);

            // 入力欄に採番(1番目に1、2番目に2）
            $('div.element').each(function(i){
                // デフォルトでvalueが設定されている場合はattr('value', value)を併用
                $(this).find('input').attr('value', i + 1).val(i + 1);
            });
        });
    });
</script>
</body>
</html>
