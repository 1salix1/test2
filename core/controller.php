<?php
/**
 * Created by PhpStorm.
 * User: salix
 * Date: 01.03.2018
 * Time: 18:19
 */

class Controller {

    public $model;
    public $view;

    function __construct()
    {
        $this->model = new Model();
        $this->view = new View();
    }

    function action_index()
    {
        $data = $this->model->get_data();

        $this->view->generate( $data);
    }


    function action_postdata() {
        $data= array(
            "class" => $_POST['class'],
            "puple" => $_POST['puple'],
            "datation" => $_POST['datation'],
            "birthday" => $_POST['birthday']
        );
        
        $viv=$this->model->post_data($data);
        echo json_encode($viv);
        
    }
    
    function action_update() {
        $data= array(
            "id" => $_POST['id'],
            "chto" => $_POST['chto'],
            "znach" => $_POST['znach']
        );
        
        $this->model->update_data($data);
     
        
    }
}