<?php

    if( isset($_GET['list']) ) {
        $data = [
            [ 'title' => 'Cristaline', 'code' => "854653468463505", 'checked' => true ],
            [ 'title'=> 'Yaourts nature', 'code'=> "654084354168740", 'checked'=> false ],
        ];

        forTheApp($data);

    }
    else {
        header("HTTP/1.0 500 Internal Server Error");
    }


    function forTheApp($data) {
        header('Access-Control-Allow-Origin: *', false);  
        header('Content-Type: application/json');
        echo json_encode($data);
        exit(0);

    }

