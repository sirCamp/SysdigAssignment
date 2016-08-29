
function dateParser(data){

    var result = "";

    try {

        data = data * 1000;
        var date = new Date(data);
        var month = date.getMonth() + 1;
        result =  (month.length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
    }
    catch(error){

        console.debug("Error during date parse");
    }
    finally{

        return result;
    }
}


function drawModal(aData){

    // PARSING data
    var id = '#'+aData.id;
    var name = "<h5><span class='material-icons'>bookmark</span> Name:</h5>"+aData.name;
    var description = "<h5><span class='material-icons'>subject</span> Description:</h5>"+aData.description;
    var filter = "<h5><span class='material-icons'>list</span> Mac Address and Container:</h5>";

    var header_times_and_version = "<h5><span class='material-icons'>schedule</span> Times and Version:</h5>";
    header_times_and_version +=    "<ul>";
    header_times_and_version += "<li> Date: "+dateParser(aData.timestamp)+"</li>";
    header_times_and_version += "<li> Created On: "+dateParser(aData.modifiedOn)+"</li>";
    header_times_and_version += "<li> Modified On: "+dateParser(aData.createdOn)+"</li>";
    header_times_and_version += "<li>Version: "+aData.version+"<li>";
    header_times_and_version +="</ul>";

    var header_tags ="<h5><span class='material-icons'>label</span> Tags:</h5>"

    for(var key in aData.tags){

        header_tags+="<div class='chip'><span class='fa fa-circle' style='color:"+getColor(aData.tags[key])+"'><span class='fa-span-margin black-text'>"+aData.tags[key]+"</span></span></div>";

    }

    var filters = aData.filter.toString().split("=");
    var filters_second = filters[1] != undefined ? filters[1].split(" and")[0] : "";

    filter += "<ul><li>MAC: "+filters_second+"</li><li>Container: "+filters[2]+"</li></ul>";

    //FILLING HTML
    $('#event-name_id').html(id);
    $('#event-name').html(name);
    $('#event-description').html(description);
    $('#event-header_tags').html(header_tags);
    $('#event-header_times_and_version').html(header_times_and_version);
    $('#event-filter').html(filter);

    //SHOW MODAL
    $('#modal').openModal();

}


function getColor(key){



    var colors = {

        'falco_engine':'#ffcc80',
        'docker':'#00c853',
        'direct':'#0091ea',
        'slack':'#7986cb',
        'luca':'#c62828'

    };

    if(colors.hasOwnProperty(key.toLocaleLowerCase())){

        return colors[key.toLocaleLowerCase()];
    }
    else{

        //16777215 == ffffff
        return ('#'+Math.floor(Math.random()*16777215).toString(16)).toUpperCase();
    }

}

$(document).ready(function(){


    var table = $('#events').DataTable( {
        "processing": true,
        "serverSide": true,
        "paging": true,
        "searching": { "regex": true },
        "bServerSide": false,
        "bServerFilter": false,
        "order": [[ 0, "desc" ]],
        "ajax": {
            "url": "https://app-staging.sysdigcloud.com/api/events",
            "type": "GET",
            "contentType": "application/json",
            "dataFilter": function(data){

                var json = jQuery.parseJSON( data );
                json.recordsTotal = json.total;
                json.recordsFiltered = json.total;
                json.data = json.events;
                return JSON.stringify( json );
            },
            "beforeSend" : function(xhr) {
                xhr.setRequestHeader('Authorization','Bearer 8aef9517-3070-4090-b55e-83296cee8cd1');
                xhr.setRequestHeader('Content-Encoding','gzip, deflate, sdch');
            },
            "error": function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
                console.log(ajaxOptions);
                console.log(thrownError);
            }
        },
        "sPaginationType": "full_numbers",
        "bLengthChange": true,
        "bFilter": true,
        "columns": [
            { "data": "id" },

            { "data": "severity" },
            {
                "data": "timestamp",
                "render":  function (data) {

                    return dateParser(data);
                }

            },

            { "data": "name" },
            {
                "data": "description",
                "render": function (data) {

                    var abstract = data.substring(0, 50);
                    return abstract + "<a class='show_more tooltipped pointer' data-position='bottom' data-delay='50' data-tooltip='"+data+"'>...</a>";


                }
            },
            {
                "data": "tags",
                "render":function(data){


                    var content = "<ul>";
                    for(var key in data){
                        content+="<li><div class='chip'><span class='fa fa-circle' style='color:"+getColor(data[key])+"'><span class='fa-span-margin black-text'>"+data[key]+"</span></span></div></li>";
                    }

                    content+="<ul>";
                    return content;

                }
            },
            {
                "target":-1,
                "className": "dt-center",
                "data": null,
                "defaultContent": "<span class='material-icons tooltipped pointer' data-position='top' data-delay='50' data-tooltip='Click to get more details'>visibility</span>"
            },
            {
                "data":"filter",
                "render":function(data){

                    if(data != '' && data != null && data != undefined){
                        return data;
                    }
                    return "";
                },
                "visible":false


            }

        ],

        "fnDrawCallback": function () {

                $('.tooltipped').tooltip({delay: 50});

        },

        preDrawCallback: function(){
            $('select').addClass("browser-default");
            $('select').material_select();
        },
        "oLanguage": {
            "sLengthMenu":"Show _MENU_",
            "sProcessing":"<div class='preloader-wrapper big active'> <div class='spinner-layer spinner-blue'> <div class='circle-clipper left'> <div class='circle'></div> </div><div class='gap-patch'> <div class='circle'></div> </div><div class='circle-clipper right'> <div class='circle'></div> </div> </div> <div class='spinner-layer spinner-red'> <div class='circle-clipper left'> <div class='circle'></div> </div><div class='gap-patch'> <div class='circle'></div> </div><div class='circle-clipper right'> <div class='circle'></div> </div> </div> <div class='spinner-layer spinner-yellow'> <div class='circle-clipper left'> <div class='circle'></div> </div><div class='gap-patch'> <div class='circle'></div> </div><div class='circle-clipper right'> <div class='circle'></div> </div> </div> <div class='spinner-layer spinner-green'> <div class='circle-clipper left'> <div class='circle'></div> </div><div class='gap-patch'> <div class='circle'></div> </div><div class='circle-clipper right'> <div class='circle'></div> </div> </div> </div>"
        }




    } );

    $('#events tbody').on( 'click', 'span[class="material-icons tooltipped pointer"]', function () {
        var data = table.row( $(this).parents('tr') ).data();
        drawModal(data);
    });

    $(".button-collapse").sideNav();

   setInterval( function () {
        table.ajax.reload();
        console.debug('REALOADING TABLE');
    }, 5000*6 );

})
