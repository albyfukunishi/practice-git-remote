<?php
//データをアップロードする処理
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
// エラーチェック
if ($_FILES['image']['error'] != UPLOAD_ERR_OK) {
    echo "エラーが発生しました : ".$_FILES['image']['error'];
    exit;
}
$size = filesize($_FILES['image']['tmp_name']);
if (!$size || $size > MAX_FILE_SIZE) {
    echo "ファイルサイズが大きすぎます！";
    exit;
}

// 保存するファイル名
$finfo = new finfo();
$imagesize = $finfo->file($_FILES['image']['tmp_name'], FILEINFO_MIME_TYPE);
switch($imagesize){
    case 'video/mp4':
        $ext = '.mp4';
        break;
    case 'video/x-msvideo':
        $ext = '.avi';
        break;
    case 'image/png':
        $ext = '.png';
        break;
    case 'image/jpeg':
        $ext = '.jpeg';
        break;
    case 'image/x-tiff':
        $ext = '.tiff';
        break;
    default:
        echo "mp4/avi/png/jpeg/tif only!";
        exit;
}
$imageFileName = sha1(time().mt_rand()) . $ext;
// 元画像を保存
$imageFilePath = IMAGES_DIR . '/' . $imageFileName;
$rs = move_uploaded_file($_FILES['image']['tmp_name'], $imageFilePath);
if (!$rs) {
    echo "could not upload!";
    exit;
}


// edit.phpに飛ばす
header('Location: http://'.$_SERVER['SERVER_NAME'].'/signage/admin/edit.php');
exit;
