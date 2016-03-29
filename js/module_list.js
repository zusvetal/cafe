$('#content').off('.modules','**');
/******************************************************************************/
/***************************** add module **********************************/
/******************************************************************************/
var getModuleRow = function (idModule) {
    return  $.post(
            "/ajax",
            {
                get_module_tr: '1',
                id_module: idModule
            }
    );
};

$('#content').on('click.modules', 'span.add', function (event) {
    var modal = new Modal(),
            form = new Form('module');
    event.preventDefault();
    modal.getModal($('#addNewModuleToStock'))
            .then(function () {
                return form.getForm(modal.getBodyField());
            })
            .then(function () {
                modal.setTitle('Add new module to stock');
                modal.setWidth('30%');
                modal.show();
                return form.eventListener();
            })
            .then(function (idModule) {
                modal.hide();
                return getModuleRow(idModule);
            })
            .then(function (newModule) {              
                $('table tr:nth-of-type(1)').after(newModule);
                recountNumber($('td.number'));
                highLightNewEntry($('table tr:nth-of-type(2)'));
            });
});


/******************************************************************************/
/***************************** delete module **********************************/
/******************************************************************************/

$('#content').on('click.modules', '.remove-module', function () {
    var $tr = $(this).closest('tr'),
            idModule = $tr.attr('data-id-module');
    $.confirm("Do you want to remove this entry?")
            .then(function () {
                deleteValue('module_list', 'id_module', idModule);
                $tr.fadeOut('slow', function () {
                    $(this).remove();
                    recountNumber($('td.number'));
                });
            });
});
/******************************************************************************/
/****************** edit module over edit-module icon *************************/
/******************************************************************************/

$('#content').on('click.devices', 'span.edit-module', function (event) {
    event.preventDefault();
    var $icon=$(this),
            modal = new Modal(),
            form = new Form('module'),
            $tr=$icon.closest('tr'),
            idModule = $tr.data('idModule');
    modal.getModal($('#addNewModuleToStock'))
            .then(function () {
                /*Action after closing modal window*/
                $('#content').on('hidden.bs.modal', modal.object, function () {
                    $tr.removeClass('info');
                });
                $tr.addClass('info');
                return form.getForm(modal.getBodyField(),{id:idModule});
            })
            .then(function (idDevice) {
                modal.setTitle('Edit device');
                modal.setWidth('30%');
                modal.show();
                return form.eventListener();
            })
            .then(function () {
                return getModuleRow(idModule);
            })
            .then(function (tr) {
                $tr.replaceWith(tr)
//                highLightNewEntry();
                recountNumber($('td.number'));
                modal.hide();
            });
});


/******************************************************************************/
/***************************** Change modules/cards status  *******************/
/******************************************************************************/
$('#content').on('click.modules', '.edit-trans', function (event) {
    var $tr = $(this).closest('tr'),
            id = $tr.data('idTransferStatus'),
            nameModel = $tr.find('.model').text(),
            idModule=$tr.data('idModule'),
            modal = new Modal();
    event.preventDefault();
    modal.getModal($('#transferStatus'))
            .then(function () {
                /*Action after closing modal window*/
                $('#content').on('hidden.bs.modal', modal.object, function () {
                    $tr.removeClass('');
                });
                $tr.addClass('');
                modal.setTitle('Choose transfer status for <b>' + nameModel + '</b>');
                modal.setWidth('30%');
                modal.show();
                return getTransferStatus(modal.getBodyField());
            })
            .then(function (id) {
                hideTransferStatus();
                $tr.attr('data-id-transfer-status',id);
                return updateValue('module_list','id_transfer_status',id,'id_module',idModule);
            })
            .then(function () {               
                showTransferStatus();
                modal.hide();
            });
});

$('#content').on('click.modules', '.edit-work', function (event) {
    var $tr = $(this).closest('tr'),
            id = $tr.data('idWorkStatus'),
            nameModel = $tr.find('.model').text(),
            idModule=$tr.data('idModule'),
            modal = new Modal();
    event.preventDefault();
    modal.getModal($('#transferStatus'))
            .then(function () {
                /*Action after closing modal window*/
                $('#content').on('hidden.bs.modal', modal.object, function () {
                    $tr.removeClass('');
                });
                $tr.addClass('');
                modal.setTitle('Choose working status for <b>' + nameModel + '</b>');
                modal.setWidth('30%');
                modal.show();
                return getWorkStatus(modal.getBodyField());
            })
            .then(function (id) {
                hideWorkStatus();
                $tr.attr('data-id-work-status',id);
                return updateValue('module_list', 'id_work_status', id, 'id_module', idModule);
            })
            .then(function () {
                showWorkStatus();
                modal.hide();
            })
});

/******************************************************************************/
/************************* get module info ******** ********************/
/******************************************************************************/

/*Open modal window and show card/module information*/
$('#content').on('click.modules', 'span.info-module', function () {
    var $tr = $(this).closest('tr'),
            idModule = $tr.data('idModule'),
            modelName = $tr.find('td.model').text(),
            modal = new Modal();
    modal.getModal($('#moduleInfo'))
            .then(function () {
                /*Action after closing modal window*/
                $('#content').on('hidden.bs.modal', modal.object, function () {
                    $tr.removeClass('info');
                });
                /***get module information body***/
                modal.setWidth('50%');
                modal.setTitle('<b>' + modelName + '</b>');
                modal.show();
                modal.addBody('\
                               <div id="moduleDescription"></div>\
                               <div id="modelDescription"></div>\
                              ')
                $tr.addClass('info');
                return getMainInfo($('#moduleDescription'), 'module', idModule);
            })
            .then(function ($body) {
                return modelDescription($('#modelDescription'), 'module', modelName);
            })
});
/******************************************************************************/
/**************************** transfer card  ********************************/
/******************************************************************************/
$('#content').on('click.modules', 'span.transfer', function () {
    var $tr = $(this).closest('tr'),
            idModule = $tr.data('idModule'),
            modelName = $tr.find('td.model').text(),
            modal = new Modal();
    modal.getModal($('#transferDevice'))
            .then(function () {
                modal.setWidth('30%');
                modal.setTitle('Transfer <b>' + modelName + '</b>');
                modal.show();
                $tr.addClass('info');
                $('#content').on('hidden.bs.modal', modal.object, function () {
                    $tr.removeClass('info');
                });
                modal.addBody('<div id="head"></div>\
                                <div id="globalLocations"></div>\
                            ')
                infoMessage(modal.getBodyField().find('#head'),
                        '<center><b>Choose location, which will transfer device</b></center>'
                        )
                return  getGlobalLocations(modal.getBodyField().find('#globalLocations'));
            })
            .then(function (id) {
                return updateValueList('module_list', {id_global_location:id, id_transfer_status:'0'}, 'id_module', idModule);
            })
            .then(function () {
                $tr.fadeOut(function(){
                   modal.hide();
                   $tr.remove();
                   recountNumber($('td.number'));
                });
            });
});

/******************************************************************************/
/*****************************  popover info **********************************/
/******************************************************************************/
$('.used').popover({
    title: 'A device that uses a card',
    content: '<div class="popover-content"></div>',
    trigger: 'click',
    placement: 'bottom',
    html:true
  });
$('.used').on('show.bs.popover', function () {
    var $popover=$(this);
    var idDevice = $popover.data('idDevice');
    getDeviceInfo(idDevice)
            .then(function (device) {
                console.log(device);
                $popover.find('+div .popover-content')
                        .html('<table class="device-info table no-border">\
                                <tr>\
                                    <td class="show-device-info" colspan="2" align="center" data-id-device="' + device.id_device + '">'+device.model+'</td>\
                                </tr>\
                                <tr>\
                                    <td>barcode: ' + device.asset_harmonic + '</td>\
                                    <td>S/N: ' + device.sn + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="show-in-rack" colspan="2" align="center" data-id-device="' + device.id_device + '">' + device.descr + '</td>\
                                </tr>\
                            </table>')
            })
});
$('#content').on('click.modules', 'td.show-in-rack', function () {
    var modal = new Modal(),
            descr=$(this).text(),
            idDevice = $(this).data('idDevice');
    modal.getModal($('#deviceInRack'))
            .then(function () {
                modal.setWidth('60%');
                modal.setTitle('<b>'+descr+'</b>');
                return showDeviceInRack(modal.getBodyField(), idDevice);
            })
            .then(function () {
                modal.show();
            });
});
$('#content').on('click.modules', 'td.show-device-info', function () {
    var modal = new Modal(),
            idDevice = $(this).data('idDevice'),
            modelName = $(this).text();
    modal.getModal($('#deviceInfo'))
            .then(function () {
                modal.setWidth('50%');
                modal.setTitle('<b>' + modelName + '</b>');
                modal.show();
                return getMainInfo(modal.getBodyField(),'device', idDevice);
            })
            .then(function ($body) {
                $body.append('<div id="generalInfo"></div>')
                        .append('<div id="deviceCards"></div>')
                        .prepend('<div id="statusInfo"></div>');
                return netInterfaceInfo($('#statusInfo'), idDevice);
            })
            .then(function () {
                return generalDeviceInfoTable($('#generalInfo'), idDevice);
            })
            .then(function ($body) {
                return deviceModuleTable($('#deviceCards'), idDevice);
            });
});