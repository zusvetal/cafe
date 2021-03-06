<?php

include_once 'functions.php';
DB::connect();
if (isset($_POST['get_id_global_location'])) {
    echo $_SESSION['id_global_location'];
}
if (isset($_POST['delete_value'])) {
    echo delete_string($_POST['table'], $_POST['where_col'], $_POST['where_value']);
}
if (isset($_POST['get_value'])) {
    $value = get_value($_POST['table'], $_POST['col'], $_POST['where_col'], $_POST['where_value']);
    echo empty($value) ? '0' : $value;
}
if (isset($_POST['get_value_async'])) {
    $value = get_value($_POST['table'], $_POST['col'], $_POST['where_col'], $_POST['where_value']);
    echo json_encode($value);
}
if (isset($_POST['get_value_list'])) {
    $value = get_value_list($_POST['table'], $_POST['col'], $_POST['where_col'], $_POST['where_value']);
    echo empty($value) ? '0' : json_encode($value);
}
if (isset($_POST['get_values'])) {
    $value = get_values($_POST['table'], $_POST['where_col'], $_POST['where_value']);
    echo empty($value) ? '0' : json_encode($value);
}
if (isset($_POST['update_value'])) {
    $value = trim($_POST['value']);
    echo update_value($_POST['table'], $_POST['col'], $value, $_POST['where_col'], $_POST['where_value']);
}
if (isset($_POST['update_value_list'])) {
    echo update_value_list($_POST['table'], $_POST['values'], $_POST['where_col'], $_POST['where_value']);
}
if (isset($_POST['insert_value'])) {
    $value = trim($_POST['value']);
    echo insert_value($_POST['table'], $_POST['col'], $value);
}
if (isset($_POST['insert_value_list'])) {
    echo insert_value_list($_POST['table'], $_POST['values']);
}
if (isset($_POST['elements_dropdown'])) {
    $type=$_POST['type'];
    $addition=  isset($_POST['addition'])?$_POST['addition']:false;
    $elements = get_elements_list($_POST['table'], $_POST['id_col'], $_POST['search_col'],$addition);
    include 'html/sections/elements_dropdown.html';
}
if (isset($_POST['search_list'])) {
    $addition=  isset($_POST['addition'])?$_POST['addition']:false;
    $list = search_list($_POST['table'], $_POST['id_col'], $_POST['search_col'], $_POST['value'],$addition);
    echo $list !== false ? json_encode($list) : '0';
}
if (isset($_POST['get_modal_window'])) {
    include 'html/sections/modal_window.html';
}
if (isset($_POST['get_free_equipment'])) {
    $type = $_POST['type'];
    if ($type === 'module') {
        $equipment_list = get_search_module(['id_device'=>'0']);
    } elseif ($type === 'device') {
        $model = $_POST['model'];
        $equipment_list = get_search_device(['model'=>$model,'id_location'=>'4']);
    }
    include 'html/sections/free_equipment.html';
}
if (isset($_POST['get_module_row'])) {
    $module = get_module($_POST['id_module']);
    $module['employee_name'] = get_value('staff', 'employee_name', 'id_employee', $module['id_owner']);
    include 'html/sections/module_row.html';
}
if (isset($_POST['get_module_tr'])) {
    $module = get_module($_POST['id_module']);
    $module['employee_name'] = get_value('staff', 'employee_name', 'id_employee', $module['id_owner']);
    $module['team_name'] = get_value('team', 'team_name', 'id_team', $module['id_team']);
    include 'html/sections/module_tr.html';
}
if (isset($_POST['get_device_tr'])) {
    $id_device=$_POST['id_device'];
    $interfaces=get_interfaces($id_device);
    
    $device = get_device($id_device);
    $device['interfaces']=  $interfaces;
    $device['host'] = !empty($interfaces) ? array_shift($interfaces)['host'] : '';
    include 'html/sections/device_tr.html';
}

if (isset($_POST['get_port_set_list'])) {
    $set_list = get_port_set_list();
    foreach ($set_list as $id_port_set => $name) {
        $set_list[$id_port_set] = array(
            'name' => $name,
            'port_set' => @get_port_list($id_port_set)
        );
    }
    include 'html/sections/port_set_list.html';
}
if (isset($_POST['get_port_list'])) {
    echo json_encode(port_list());
}
if (isset($_POST['get_port_list_for_device'])) {
    $id_port_set = get_value('device_model', 'id_port_set', 'id_model', $_POST['id_model']);
    echo json_encode(get_port_list($id_port_set));
}
if (isset($_POST['get_device_to_rack_form'])) {
    $models = get_model_list('device_model');
    $slot = $_POST['slot'];
    include 'html/forms/device_to_rack_form.html';
}
if (isset($_POST['get_parametr_form'])) {
    $slot = $_POST['slot'];
    include 'html/forms/parametr_form.html';
}
if (isset($_POST['get_labdesk_device_form'])) {
    include 'html/forms/labdesk_device_form.html';
}
if (isset($_POST['get_team_form'])) {
    include 'html/forms/team_form.html';
}
if (isset($_POST['get_employee_form'])) {
    include 'html/forms/employee_form.html';
}
if (isset($_POST['get_model_form'])) {
    if ($_POST['type'] === 'device') {
        include 'html/forms/device_model_form.html';
    } elseif ($_POST['type'] === 'module' || $_POST['type'] === 'card') {
        include 'html/forms/module_model_form.html';
    }
}
if (isset($_POST['get_add_new_rack'])) {
    include 'html/forms/rack_form.html';
}
if (isset($_POST['get_add_new_to_stock'])) {
    $type = $_POST['get_add_new_to_stock'];
    if ($type == 'device') {
        include 'html/forms/device_form.html';
    } elseif ($type == 'module') {
        include 'html/forms/module_form.html';
    }
}
if (isset($_POST['get_interface_form'])) {
    $ints = get_interface_list($_POST['id_device']);
    if (!empty($ints)) {
        foreach ($ints as $id_int => $int) {
            $ints[$id_int]['virtual'] = get_virtual_list($id_int);
        }
    }
    include 'html/forms/interface_form.html';
}
if (isset($_POST['get_vm_form'])) {
    include 'html/forms/vm_form.html';
}
if (isset($_POST['update_link'])) {
    $id_port = $_POST['id_port'];
    $link = $_POST['link'];
    $id_device_in_rack = $_POST['id_device_in_rack'];
    $id_module = empty($_POST['id_module']) ? '0' : $_POST['id_module'];
    $exist_link = get_link($id_port, $id_device_in_rack);
    if ($exist_link) {
        $id_link = $exist_link['id_link'];
        update_value('links', 'link', $link, 'id_link', $id_link);
    } else {
        $id_link = insert_value('links', 'link', $link);
        update_value('links', 'id_port', $id_port, 'id_link', $id_link);
        update_value('links', 'id_module', $id_module, 'id_link', $id_link);
        update_value('links', 'id_device_in_rack', $id_device_in_rack, 'id_link', $id_link);
    }
}
if (isset($_POST['model_search'])) {
    $models = search_model($_POST['value'], $_POST['table']);
    echo $models !== false ? json_encode($models) : '0';
}
if (isset($_POST['check_empty_space'])) {
    $id_rack = $_POST['id_rack'];
    $top_slot = $_POST['top_slot'];
    $size = $_POST['size'];

    if (($top_slot - $size) < 0) {
        echo '0';
        exit();
    }

    $device_slots = get_value_list('devices_in_racks', 'unit', 'id_rack', $id_rack);
    $shelves_slots = get_value_list('shelves', 'unit', 'id_rack', $id_rack);
    $patchpanel_slots = get_value_list('patchpanel_list', 'unit', 'id_rack', $id_rack);

    $device_slots = $device_slots ? $device_slots : [];
    $shelves_slots = $shelves_slots ? $shelves_slots : [];
    $patchpanel_slots = $patchpanel_slots ? $patchpanel_slots : [];

    $slots = array_merge($device_slots, $shelves_slots, $patchpanel_slots);

    $down_slots = [];
    foreach ($slots as $slot) {
        if ($slot < $top_slot) {
            $down_slots[] = $slot;
        }
    }
    if (empty($down_slots)) {
        echo '1';
        exit();
    }
    $next_slot = max($down_slots);

    echo ($top_slot - $next_slot) >= $size ? '1' : '0';
}
if (isset($_POST['unbind_modules'])) {
    if (empty(get_value('module_list', 'id_module', 'id_device', $_POST['id_device']))) {
        echo '0';
    } else {
        update_value('module_list', 'id_device', '0', 'id_device', $_POST['id_device']);
        echo TRUE;
    }
}
if (isset($_POST['insert_port_list_port_set'])) {
    echo insert_port_list_port_set($_POST['id_port'], $_POST['id_port_set']);
}


if (isset($_POST['get_info'])) {
    if ($_POST['get_info'] === 'device') {
        $info = get_device($_POST['id']);
        $info['location']=  device_location($_POST['id']);

    } elseif ($_POST['get_info'] === 'module') {
        $info = get_module($_POST['id']);
        $id_device=get_value('module_list', 'id_device', 'id_module', $_POST['id']);
        if ($id_device=='0') {
            $info['location']="Free";
        }
        else{
            $device=get_device($id_device);
            $info['location']= $device['model']." barcode: ".$device['asset_harmonic'].
                    " sn: ".$device['sn'];
        }
    }
    include 'html/sections/equipment_info.html';
}
if (isset($_POST['get_interface_list'])) {
    $interface_list = get_interface_list($_POST['id_device']);
    echo $interface_list ? json_encode($interface_list) : '0';
}
if (isset($_POST['get_modules_info'])) {
    $module_list = get_module_list(['id_device'=>$_POST['id_device']]);
    echo json_encode($module_list);
}
if (isset($_POST['get_model_descr'])) {
    $table=$_POST['type'].'_model';
    $comment = get_value($table,'model_comment','model',$_POST['model']);
    include 'html/sections/model_description.html';
}
if (isset($_POST['check_ip'])) {
    $id_device = get_value('interfaces', 'id_device', 'ip', $_POST['ip']);
    $id_virt = get_value('virtual_mashines', 'id_virtual_mashine', 'virt_ip', $_POST['ip']);
    if ($id_device) {
        $device = get_device($id_device);
        if (!$device) {
            echo '0';
            exit();
        }
        $device['location'] = get_value('location', 'name', 'id_location', $device['id_location']);
        $device['descr']=  device_location($id_device);
        echo json_encode($device);
    } elseif ($id_virt) {
        $id_device = get_value('interfaces', 'id_device', 'id_interface', get_value('virtual_mashines', 'id_interface', 'id_virtual_mashine', $id_virt));
        $device = get_device($id_device);
        if (!$device) {
            echo '0';
            exit();
        }
        $device['location'] = get_value('location', 'name', 'id_location', $device['id_location']);
        if ($device['id_location'] === '1') {
            $device['descr'] = "Virtual host. ". device_location($id_device);
        } elseif ($device['id_location'] === '2') {
            $device['descr'] = device_location($id_device) . ". Virtual host";
        } elseif ($device['id_location'] === '3') {
            $device['descr'] = get_value('staff', 'employee_name', 'id_employee', get_value('devices_on_hands', 'id_employee', 'id_device', $id_device));
        }
        echo json_encode($device);
    } else {
        echo '0';
    }
}
if (isset($_POST['device_json_info'])) {
    $id_device = $_POST['id_device'];
    $device = get_device($id_device);
    if (!$device) {
        echo json_encode($device);
        exit();
    }
    $device['location'] = get_value('location', 'name', 'id_location', $device['id_location']);
    $device['descr']=  device_location($id_device);
    echo json_encode($device);
}
if (isset($_POST['get_patchpanel_info'])) {
    $number_of_sockets = get_value('patchpanel_model', 'number_of_socket', 'id_model', $_POST['id_model']);
    $name = get_value('patchpanel_model', 'name', 'id_model', $_POST['id_model']);
    for ($i = 0; $i < $number_of_sockets; $i++) {
        $sockets[$i] = get_socket($_POST['id_patchpanel'], $i + 1);
        if (empty($sockets[$i])) {
            $sockets[$i] = ['id_socket' => '', 'descr' => ''];
        }
    }
    $info = [
        'name' => $name,
        'id_patchpanel' => $_POST['id_patchpanel'],
        'sockets' => $sockets
    ];
    echo json_encode($info);
}
if (isset($_POST['get_free_space_in_rack'])) {
    echo free_space_in_rack($_POST['id_rack']);
}
if (isset($_POST['get_virtual_hosts'])) {
    $virts = get_virtual_list($_POST['id_interface']);
    include_once 'html/sections/virt_hosts.html';
}
if (isset($_POST['get_global_locations'])) {
    $locations = get_global_location_list();
    include_once 'html/sections/global_location_list.html';
}
if (isset($_POST['get_transfer_status'])) {
    include_once 'html/sections/transfer_status.html';
}
if (isset($_POST['get_work_status'])) {
    include_once 'html/sections/work_status.html';
}
DB::disconnect();
?>

