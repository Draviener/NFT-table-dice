<?php 

header('Content-Type: application/json');

include "./colormap.php";

$urlParts = preg_split("#/#", getenv('SCRIPT_NAME')); 

if (count($urlParts) < 7 || $urlParts[1] != 'metadata') 
{
    $error = ["error" => "Data was missing from the tokenURI."];
    
    echo json_encode($error, JSON_PRETTY_PRINT);
} 
else 
{
    $metadata = [
        "name" => $urlParts[2],
        "description" => "PolyDice: Dice for Tabletop Gaming, an EthDenver 2022 #BUIDLthon Entry",
        "external_url" => "https://dice.partavate.com/",
        // /metadata/die.{size}.{background}.{foreground}.{font}.svg
        "image" => "https://dice.partavate.com/metadata/die.$urlParts[3].$urlParts[4].$urlParts[5].$urlParts[6].svg",
        "attributes" => [
            "Sides" => $urlParts[3],
            "Font Color" => $urlParts[4],
            "Dice Color" => $urlParts[5],
            "font" => $urlParts[6]
        ], 
    ];

    echo json_encode($metadata, JSON_PRETTY_PRINT);
}

