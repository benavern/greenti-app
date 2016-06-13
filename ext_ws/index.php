<?php

    header('Access-Control-Allow-Origin: *', false);
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    $listPath = './list.json';

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
        if( isset($_GET['list']) ) {
            $data = json_decode(file_get_contents($listPath), true);
            forTheApp($data);

        }
        else{
            error("no data...");

        }

    }
    elseif($_SERVER['REQUEST_METHOD'] == 'POST'){
        $jsonData =  file_get_contents("php://input");
        $data =  json_decode($jsonData);
        
        if( !empty($data) ) {

            $myfile = fopen($listPath, "w") or error("file open impossible");
            fwrite($myfile, $jsonData);
            fclose($myfile);

            forTheApp($data);

        }
        else {
            error("no data ...");
        }

    } 
    else {
        error("method error");

    }


    function forTheApp($data) {
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

