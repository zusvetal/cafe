/******************************************************************************/
/******************************* Search system ********************************/
/******************************************************************************/
var getSearchDevices = function (keys) {
    return $.get(
            "/get_search_devices",
            {
                keys: keys
            },
    function (table) {
        setLocation(window.location.origin+window.location.pathname+this.url.replace('/get_search_devices', ''));
        $('#infoField').html(table);
        checkMenuOption();
        checkViewOption();
    });
};
var getSearchModules = function (keys) {
   
  return $.get(
            "/get_search_modules",
            {
                keys: keys
            },
    function (table) {
      setLocation(window.location.origin+window.location.pathname+this.url.replace('/get_search_modules', ''));
      $('.item-table').html(table);
      checkMenuOption();
      checkViewOption();
    });
};
var searchElements = function () {
    var on = true;
    function search() {
        if (on) {     
            var keys = {},
                    category = $('#category .choose2').attr('id');
            $('div.search-field').each(function () {
                var key = $(this).attr('id'),
                        value = $(this).find('.value').val();
                keys[key] = value;
            });
            if (category === 'devices') {
                getSearchDevices(keys);

            }
            else if (category === 'modules') {
                getSearchModules(keys);
            }
        }
    }
    search.on = function () {
        on=true;
    };
    search.off=function(){
        on=false;
    };  
    return search;
};

var search=searchElements();

var checkMenuOption=function(){
    if($('a.transfer-status').hasClass('active')){
        showTransferStatus();
    }
    if($('a.work-status').hasClass('active')){
       showWorkStatus(); 
    }
};
var checkViewOption = function () { 
    $('#viewField .list-group-item').each(function () {
        var $el = $(this),
                item = $el.data('toggle');
        if (!$el.hasClass('active')) {
            $('table .' + item).hide();
        }
    });
};

/******************************************************************************/
/************************* choose key  for searching ****************************/
/******************************************************************************/

/*** Location ***/
$('#content').on('click', 'a.key[data-key="id_location"]', function () {
    var $btn = $(this),
            location = new List('location', 'id_location', 'name', {type: 'select',width:'12'});
    if ($btn.hasClass('choose')) {
        $btn.removeClass('choose');
        $('#id_location').remove();
        search();
    }
    else {
        $btn.addClass('choose');
        $('#searchField').prepend('\
                    <div id="id_location" class="search-field">\
                        <button type="button" class="close close-field"><span>&times;</span></button>\
                        <h6>Location</h6>\
                         <div id="select_location"></div>\
                    </div>\
        ');
        location.getElementsDropDown($('#select_location'))
                .then(function () {
                    location.addClassToInputField('value')
                    search();
                })
    }
});

/*** Status ***/
$('#content').on('click', 'a.key[data-key="status"]', function () {
    var $btn = $(this);
    if ($btn.hasClass('choose')) {
        $btn.removeClass('choose');
        $('#status').remove();
        search();
    }
    else {
        $btn.addClass('choose');
        $('#searchField').prepend('\
                    <div id="status" class="search-field">\
                        <button type="button" class="close close-field"><span>&times;</span></button>\
                        <h6>Status</h6>\
                        <select class="form-control value">\
                            <option value="1">Used</option>\
                            <option value="0">Free</option>\
                        </select>\
                    </div>\
        ');
        search();
    }
});

/*** Vm ***/
$('#content').on('click', 'a.key[data-key="vm"]', function () {
    var $btn = $(this);
    if ($btn.hasClass('choose')) {
        $btn.removeClass('choose');
        $('#vm').remove();
        search();
    }
    else {
        $btn.addClass('choose');
        $('#searchField').prepend('\
                    <div id="vm" class="search-field">\
                        <button type="button" class="close close-field"><span>&times;</span></button>\
                        <h6>Virtual mashines</h6>\
                        <input type="text"  class="hidden value" value="1"/>\
                    </div>\
        ');
       search();
    }
});

/*** Transfer ***/
$('#content').on('click', 'a.key[data-key="id_transfer_status"]', function () {
    var $btn = $(this),
   status = new List('transfer_status', 'id_transfer_status', 'transfer_status_name', {type: 'select',width:'12'});
    if ($btn.hasClass('choose')) {
        $btn.removeClass('choose');
         $('#id_transfer_status').remove();
        search();
    }
        else {
        $btn.addClass('choose');
        $('#searchField').prepend('\
                    <div id="id_transfer_status" class="search-field">\
                        <button type="button" class="close close-field"><span>&times;</span></button>\
                        <h6>Transfer status</h6>\
                         <div id="select_transfer_status"></div>\
                    </div>\
        ');
        status.getElementsDropDown($('#select_transfer_status'))
                .then(function () {
                    status.addClassToInputField('value');
                    status.setElementId('1');
                    search();
                })
    }
});

/*** Operability ***/
$('#content').on('click', 'a.key[data-key="id_work_status"]', function () {
    var $btn = $(this),
   status = new List('work_status', 'id_work_status', 'work_status_name', {type: 'select',width:'12'});
    if ($btn.hasClass('choose')) {
        $btn.removeClass('choose');
         $('#id_work_status').remove();
        search();
    }
        else {
        $btn.addClass('choose');
        $('#searchField').prepend('\
                    <div id="id_work_status" class="search-field">\
                        <button type="button" class="close close-field"><span>&times;</span></button>\
                        <h6>Work status</h6>\
                         <div id="select_work_status"></div>\
                    </div>\
        ');
        status.getElementsDropDown($('#select_work_status'))
                .then(function () {
                    status.addClassToInputField('value');
                    status.setElementId('1');
                    search();
                });
    }
});
/*** Device type ***/
$('#content').on('click', 'a.key[data-key="id_device_type"]', function () {

    var $btn = $(this),
   type = new List('device_type', 'id_device_type', 'name', {type: 'select',width:'12'});
    if ($btn.hasClass('choose')) {
        $btn.removeClass('choose');
         $('#id_device_type').remove();
        search();
    }
    else {
     
        $btn.addClass('choose');
        $('#searchField').prepend('\
                    <div id="id_device_type" class="search-field">\
                        <button type="button" class="close close-field"><span>&times;</span></button>\
                        <h6>Device type</h6>\
                         <div id="select_type"></div>\
                    </div>\
        ');
        
        type.getElementsDropDown($('#select_type'))
                .then(function () {
                    type.addClassToInputField('value');
                    search();
                });
    }
});

/*** Other key button ***/
$('#content').on('click', 'a.key', function () {
    var $btn = $(this),
            key = $btn.data('key'),
            item = $btn.text();
    if (!$btn.hasClass('single')) {
        if ($btn.hasClass('choose')) {
            $btn.removeClass('choose');
            $('#' + key).remove();
        }
        else {
            $btn.addClass('choose');
            $('#searchField').append('\
            <div id="' + key + '" class="search-field">\
            <button type="button" class="close close-field"><span>&times;</span></button>\
             <h6>' + item + '</h6>\
                 <input type="text"  class="form-control value"/>\
             </div>\
        ');

        }
       search();
    }
});

/***close (x) field ***/
$('#content').on('click', '.close-field', function () {
    var $field=$(this).closest('.search-field'),
    item=$field.attr('id');
    $field.fadeOut(function(){
       $(this).remove();
       $('a.key[data-key="'+item+'"]').removeClass('choose');
       search();
    });   
});

/******************************************************************************/
/***************************** Search **************************************/
/******************************************************************************/

$('#content').on('keyup change', '#searchField .value', function () {
    search();
});
/******************************************************************************/
/***************************** Menu **************************************/
/******************************************************************************/
$('#content').on('click', '#viewList', function (e) {
  if($('#viewField').is(':hidden')){
      $('#viewField').slideDown(200);
  }
  else{
    $('#viewField').slideUp(300);  
  }
});

$('#content').on('click', '#menuBlock', function (e) {
  if($('#menuField').is(':hidden')){
      $('#menuField').slideDown(200);
  }
  else{
    $('#menuField').slideUp(300);  
  }
});

$('#content').on('click', function (e) {
  var el=e.target;
  if($(el).closest('#wrapMenu').length===0){
      $('#menuField').fadeOut(300);
      $('#viewField').fadeOut(300);
  }
});
/******************************************************************************/
/***************************** Block menu component ***************************/
/******************************************************************************/

/***Transfer status***/
var showTransferStatus = function () {
    $('#menuField .transfer-status').addClass('active');
    $('table .transfer-status').show();
    $('[data-id-transfer-status="1"]')
            .find('.transfer-status .lable')
            .text('');
    $('[data-id-transfer-status="2"]').addClass('warning')
            .find('.transfer-status .lable')
            .text('planned');
    $('[data-id-transfer-status="3"]').addClass('success')
            .find('.transfer-status .lable')
            .text('prepared');
    $('[data-id-transfer-status="4"]').addClass('info')
            .find('.transfer-status .lable')
            .text('on way');
};
var hideTransferStatus = function () {
    $('#menuField .transfer-status').removeClass('active');
    $('table .transfer-status').hide();
    $('[data-id-transfer-status="1"]').removeClass('warning');
    $('[data-id-transfer-status="2"]').removeClass('success');
    $('[data-id-transfer-status="3"]').removeClass('info');
};
$('#menuField').on('click', '.transfer-status', function () {
    var $btn = $(this);
    if ($btn.hasClass('active')) {
        $('[data-key="id_transfer_status"]').remove();
        $('#id_transfer_status').remove();
        hideTransferStatus();
       search();
    }
    else {
        $('#keyList').append('<a  class="btn a-btn key single" data-key="id_transfer_status">Transfer</a>');
        showTransferStatus();
    }

});

/***Working status***/
var showWorkStatus = function () {
    $('#menuField .work-status').addClass('active');
    $('table .working-status').show();
    $('[data-id-work-status="1"]').addClass('success')
            .find('.working-status .lable')
            .text('OK!');
    $('[data-id-work-status="2"]').addClass('danger')
            .find('.working-status .lable')
            .text('not working ');
    $('[data-id-work-status="3"]').addClass('warning')
            .find('.working-status .lable')
            .text('rma/on repair');
};
var hideWorkStatus = function () {
    $('#menuField .work-status').removeClass('active');
    $('table .working-status').hide();
    $('[data-id-work-status="1"]').removeClass('success');
    $('[data-id-work-status="2"]').removeClass('danger');
    $('[data-id-work-status="3"]').removeClass('warning');
};
var workingStatus = function ($btn) {
    if ($btn.hasClass('active')) {
        $btn.removeClass('active');
        $('[data-key="id_work_status"]').remove();
        $('#id_work_status').remove();
        hideWorkStatus();
        search();
    }
    else {
        $btn.addClass('active');
        $('#keyList').append('<a  class="btn a-btn key single" data-key="id_work_status">Operability</a>');
        showWorkStatus();
    }
}
$('#menuField').on('click', '.work-status', function () {
    var $btn = $(this);
    workingStatus($btn);

});
/*** Export to EXEL ***/
$('#menuField').on('click', '.export-to-exel', function () {
    var $btn = $(this);
    $('#devicesTable').tableExport({fileName: 'Devices table', type: 'xls', escape: 'false'});
});
/*** Export to PDF ***/
$('#menuField').on('click', '.export-to-pdf', function () {
    var $btn = $(this);
    $('#devicesTable').tableExport({fileName: 'Devices table', type: 'pdf', escape: 'false',
        jspdf: {
            margins: 
                    {left: 20, right: 10, top: 20, bottom: 20},
            autotable: 
                    {styles: {overflow: 'linebreak'}}
        }
    });

});
/******************************************************************************/
/***************************** View menu component ***************************/
/******************************************************************************/
$('#viewField').on('click', function (e) {
    var $el = $(e.target),
            item = $el.data('toggle');
    if ($el.hasClass('active')) {
        $el.removeClass('active');
        $('table .' + item).fadeOut();
    }
    else {
        $el.addClass('active');
        $('table .' + item).fadeIn();
    }
});
/******************************************************************************/
/***************************** Init settings **********************************/
/******************************************************************************/
var getKeys = function () {
    console.log(window.location.search.substring(1));
    var str = decodeURIComponent(window.location.search.substring(1)),
            keys = [];
    if (str === '')
        return false;
    str = str.replace(/\[/g, '["')
            .replace(/\]/g, '"]')
            .replace(/\&/g, '"&')
            .replace(/\=/g, '="')
            .replace(/\&/g, ';');
    str=str+'"';
    eval(str);
    return keys;
};

var keys = getKeys();
search.off();
if (keys) {
    for (var key in keys) {
        if (key === 'id_transfer_status') {
            $('#menuField .transfer-status').click();
        }
        if (key === 'id_work_status') {
            $('#menuField .work-status').click();
        }
            $('[data-key="' + key + '"]').click();
            $('#' + key).find('input').val(keys[key]);
            $('#' + key).find('select').find('[value="'+keys[key]+'"]').attr('selected','selected');
    }
}
search.on();
search();
