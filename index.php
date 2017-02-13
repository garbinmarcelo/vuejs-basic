<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($type)
{
    if($type === 'pay'){
        $json = file_get_contents(__DIR__ . '/billsPay.json');
    }else if($type === 'receive'){
        $json = file_get_contents(__DIR__ . '/billsReceive.json');
    }else{
        return false;
    }

    $data = json_decode($json, true);
    if(count($data['bills'])){
        return $data['bills'];
    }else{
        return 0;
    }
}

function findIndexById($type, $id)
{
    $bills = getBills($type);
    if($bills) {
        foreach ($bills as $key => $bill) {
            if ($bill['id'] == $id) {
                return $key;
            }
        }
        return false;
    }
    return $bills;
}

function writeBills($type, $bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    if($type === 'pay'){
        file_put_contents(__DIR__ . '/billsPay.json', $json);
    }else if($type === 'receive'){
        file_put_contents(__DIR__ . '/billsReceive.json', $json);
    }
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills-{type}', function ($type) use ($app) {
    $bills = getBills($type);
    if($bills){
        return $app->json($bills);
    }
    return $bills;
});

$app->get('api/bills-{type}/total', function ($type) use ($app) {
    $bills = getBills($type);
    if($bills){
        $sum=0;
        foreach ($bills as $value) {
            if($value['done'] === false){
                $sum += (float)$value['value'];
            }
        }
        return $app->json(['total' => $sum]);
    }
    return $bills;
});

$app->get('api/bills-{type}/{id}', function ($type, $id) use ($app) {
    $bills = getBills($type);
    if($bills) {
        $bill = $bills[findIndexById($id)];
        return $app->json($bill);
    }
    return $bills;
});

$app->post('api/bills-{type}', function (Request $request, $type) use ($app) {
    $bills = getBills($type);
    if($bills) {
        $data = $request->request->all();
        $data['id'] = rand(100, 100000);
        $bills[] = $data;
        writeBills($type, $bills);
        return $app->json($data);
    }
    return $bills;
});

$app->put('api/bills-{type}/{id}', function (Request $request, $type, $id) use ($app) {
    $bills = getBills($type);
    if($bills) {
        $data = $request->request->all();
        $index = findIndexById($type, $id);
        $bills[$index] = $data;
        $bills[$index]['id'] = (int)$id;
        writeBills($type, $bills);
        return $app->json($bills[$index]);
    }
    return $bills;
});

$app->delete('api/bills-{type}/{id}', function ($type, $id) {
    $bills = getBills($type);
    if($bills) {
        $index = findIndexById($type, $id);
        array_splice($bills, $index, 1);
        writeBills($type, $bills);
        return new Response("", 204);
    }
    return $bills;
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();