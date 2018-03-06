<?php
/**
 * Created by PhpStorm.
 * User: salix
 * Date: 02.03.2018
 * Time: 15:13
 */

class Db
{
    public  $link;
    private static $instance = null;

    public static function getInstance()
    {
        if (null === self::$instance)
        {
            self::$instance = new self();
            
        }
        return self::$instance;
    }
    
    private function __clone() {}
    
    private function __construct() {
        $config = include 'config/Db.php';
        $this->link =  mysqli_connect($config['host'],$config['user'],$config['pass'],$config['dbname']);
        
    }

    public function execute($query, array $params=null){

        return mysqli_query($this->link , $query);
        mysqli_close($this->link);
    }
    
    public function execute2($query, array $params=null)
    {
        mysqli_query($this->link,$query);
        $id = mysqli_insert_id($this->link);
        mysqli_close($this->link);
        
        return $id;
    }
}