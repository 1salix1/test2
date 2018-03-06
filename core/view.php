<?php
/**
 * Created by PhpStorm.
 * User: salix
 * Date: 01.03.2018
 * Time: 18:18
 */

class View
{
    //public $template_view; // здесь можно указать общий вид по умолчанию.

    function generate($data = null)
    {
        ?>
       <!DOCTYPE html>
<html lang="ru">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="core/style.css" type="text/css" rel="stylesheet" media="all">
<head>
	<meta charset="utf-8">
	<title>Главная</title>
</head>
<body>

<div id="header"></div>
<table id="my_table"  rules="all">
<thead>
    <tr class="head"><th>Номер</th><th>Класс</th><th>Ученик</th><th>Датация</th><th>Дата рождения</th></tr></thead>
    <?php
    foreach($data as $row)
    {
        if ($row['datation']=="1"){$row['datation']="Да";}else{$row['datation']="Нет";}
 
        echo '<tr><td><span class="fr"><div>'.$row['id'].'</div></span></td><td class="class"><div class="click">'.$row['class'].'</div></td><td class="puple"><div class="click">'.$row['puple'].'</div></td><td class="datat"><div class="click">'.$row['datation'].'</div></td><td class="birth"><div class="click">'.$row['birthday'].'</div></td></tr>';
    };
?>
</table>
<form method="POST" id="main-form" class="contact">
<div class=row><input type="text" class="in" name="class"  placeholder="Класс" ></div>
<div class=row><input type="text" class="in" name="puple"  placeholder="Ученик" ></div>
<div class=row>Датация: <input type="checkbox" class="in2" name="datation"  placeholder="Датация" ></div>
<div class=row>Дата рождения: <input type="text"  id="date"class="in bi" name="birthday"  ></div>
<input type="submit" class="ok btn btn-green" value="отправить">
<div class="answer"></div>
</form>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script defer  src="core/js/js.js"></script>
<script defer  src="core/js/jquery.maskedinput.min.js"></script>
<script defer  src="core/js/table.js"></script>
</body>
</html>
<?php
    }
}