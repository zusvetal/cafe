<?php
$ip=$_POST['ip'];
function get_oid($ip, $mip_array) {
    foreach ($mip_array as $name => $oid) {
        $snmp_result = @snmpget($ip, "public", $oid);
        $value=!stristr($snmp_result,':') ? '' : str_replace("\"","", explode(":", $snmp_result)[1]);
        $result[$name] = $value;
    }
    return $result;
}

if (isset($_POST['get_sn'])) {
    $mip_array = array(
        "S/N" => "1.3.6.1.4.1.5835.3.1.1.1.31.0.1"
    );  
    echo get_oid($ip, $mip_array)['S/N'];
}

if (isset($_POST['get_info'])) {
    $mip_array = array(       
        "Description" => "1.3.6.1.4.1.5835.3.1.1.1.12.0.1",
        "System uptime"=>"1.3.6.1.2.1.1.3.0",
        "S/N" => "1.3.6.1.4.1.5835.3.1.1.1.31.0.1"
    );
    echo json_encode(get_oid($ip, $mip_array));
}
if (isset($_POST['get_modules_info'])) {
    echo json_encode(false);
}
?>