<?php

    header('Access-Control-Allow-Origin: *', false);
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

class Router {

    /**
    * current url requested
    */
    private $url;

    /**
    * contains all the defined routes
    */
    private $routes = [];

    /* 
    * constructor
    */
    public function __construct() {
        $this->url = (!empty($_GET['z_router_url'])) ? $_GET['z_router_url'] : '/';
    }//function

    /**
    * add a get route
    */
    public function get($routeName, callable $callback) {
        $this->routes['GET'][$routeName] = $callback;
    }//function

    /**
    * add a post route
    */
    public function post($routeName, callable $callback) {
        $this->routes['POST'][$routeName] = $callback;
    }//function

    /**
    * execution method
    */
    public function run() {
        $method = $_SERVER['REQUEST_METHOD'];
        $url = $this->url;
        $options = [
            'GET' => $_GET,
            'POST' => $_POST
        ];
        unset($options['GET']['z_router_url']);

        // method exception
        if( !isset( $this->routes[$method] ) ) {
            error("Request method does not exist.");
            //throw new \Exception('Request method does not exist.');
        }

        // route exception
        if( !isset($this->routes[$method][$url]) ){
            // throw new \exception('No route');
            error("No route found for this route (". $url .")");
        }

        $this->routes[$method][$url]($options);
        
    }//function

}//class


/**
* =========================== Definition =============================
*/

$router = new Router;

$router->get('/', function() {
    output([
        'method' => 'GET',
        'data' => 'you are on the / route'
    ]);
});

$router->get('/truc', function($options) {
    output([
        'method' => 'GET',
        'data' => $options
    ]);
});

$router->post('/chose', function($options) {
    output([
        'method' => 'POST',
        'data' => $options 
    ]);
});

$router->run();



    // $listPath = './list.json';

    // if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    //     if( isset($_GET['list']) ) {
    //         $data = json_decode(file_get_contents($listPath), true);
    //         forTheApp($data);

    //     }
    //     else{
    //         error("no data...");

    //     }

    // }
    // elseif($_SERVER['REQUEST_METHOD'] == 'POST'){
    //     $jsonData =  file_get_contents("php://input");
    //     $data =  json_decode($jsonData);
        
    //     if( !empty($data) ) {

    //         $myfile = fopen($listPath, "w") or error("file open impossible");
    //         fwrite($myfile, $jsonData);
    //         fclose($myfile);

    //         forTheApp($data);

    //     }
    //     else {
    //         error("no data ...");
    //     }

    // } 
    // else {
    //     error("method error");

    // }


    function output($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit(0);
    }

    function error($message = "unknown error"){        
        // header("HTTP/1.0 500 Internal Server Error");
        header('Content-Type: application/json');
        echo json_encode(["error" => $message]);
        exit(0);
    }

