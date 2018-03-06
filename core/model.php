<?php
/**
 * Created by PhpStorm.
 * User: salix
 * Date: 01.03.2018
 * Time: 18:18
 */

class Model
{
    public function get_data()
    {
        $db=Db::getInstance();
        $data=$db->execute("Select * from `puple`;");
        $ii=0;

         
        return $data;
    }
    public function post_data($data)
    {
        $db=Db::getInstance();
        if ($data['datation']=="on"){$data['datation']="1";}else{$data['datation']="0";}
        
        return  $db->execute2("INSERT INTO `puple` VALUES ('0','".$data['class']."','".$data['puple']."','".$data['datation']."','".$data['birthday']."');");
    }
     public function update_data($data)
    {
        $db=Db::getInstance();
        
        return  $db->execute2("UPDATE `puple` SET ".$data['chto']." = '".$data['znach']."' WHERE id=".$data['id'].";");
    }
}