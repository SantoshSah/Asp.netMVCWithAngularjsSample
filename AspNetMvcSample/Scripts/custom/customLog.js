﻿

$(document).ready(function ()

    

{
    var count = 0;

        var dateNow = new Date();

        $('#datetimepicker1').datetimepicker({
            format: 'h:mm a'
        });

        $('#datetimepicker2').datetimepicker({
            format: 'h:mm a'

        });
     
        $('#datetimepicker3').datetimepicker({

            format: 'YYYY-M-D',
            defaultDate: dateNow

        });

        $('*').dblclick(function(e){
        e.preventDefault();
    });

        $('#workendingtime').datetimepicker({
        format: 'h:mm a'
    });

        $('#workstartingtime').datetimepicker({
        format: 'h:mm a'
        });

        $('#workendingtime').focusout(function () {
            var starttime = parseFloat(ConvertTimeFormat("24", $('#workstartingtime').val()));
            var endtime = parseFloat(ConvertTimeFormat("24", $('#workendingtime').val()));
            var workstime = starttime.toFixed(2).split('.');
            var worketime = endtime.toFixed(2).split('.');
            var shours = parseInt(workstime[0]);
            var sminute = parseInt(workstime[1]);
            var ehours = parseInt(worketime[0]);
            var eminute = parseInt(worketime[1]);

            var hdiff = ehours - shours;
            var mdiff = eminute - sminute;

            if (endtime > starttime) {

                if (mdiff < 0) {
                    mdiff = mdiff + 60;
                    hdiff = hdiff - 1;
                    $('#duration').val(hdiff + ":" + mdiff);
                }
                else {
                    $('#duration').val(hdiff + ":" + mdiff);
                }

            }
            if (endtime == starttime) {
                $('#duration').val('');

            }


            if (starttime > endtime) {
                $('#duration').val('');
                $('#message').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Work finished time must be greater than work start time!!</div>');


            }

        });

        $('#workstartingtime').focusout(function () {
            var starttime = parseFloat(ConvertTimeFormat("24", $('#workstartingtime').val()));
            var endtime = parseFloat(ConvertTimeFormat("24", $('#workendingtime').val()));
            var workstime = starttime.toFixed(2).split('.');
            var worketime = endtime.toFixed(2).split('.');
            var shours = parseInt(workstime[0]);
            var sminute = parseInt(workstime[1]);
            var ehours = parseInt(worketime[0]);
            var eminute = parseInt(worketime[1]);

            var hdiff = ehours - shours;
            var mdiff = eminute - sminute;

            if (endtime > starttime) {
                if (mdiff < 0) {
                    mdiff = mdiff + 60;
                    hdiff = hdiff - 1;
                    $('#duration').val(hdiff + ":" + mdiff);
                }
                else {
                    $('#duration').val(hdiff + ":" + mdiff);
                }
            }


            if (endtime == starttime) {

                $('#duration').val('');

            }


            if (starttime > endtime) {

                $('#message').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Work finished time must be greater than work start time!!</div>');
                $('#duration').val('');
            }

        });

       
});



// for 20.10

function ConvertTimeFormat(format, time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "pm" && hours < 12) hours = hours + 12;
    if (AMPM == "am" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toFixed(2);
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + "." + sMinutes);
};

//for 20:10
function ConvertTimeFormat1(format, time) {
    var hours1 = Number(time.match(/^(\d+)/)[1]);
    var minutes1 = Number(time.match(/:(\d+)/)[1]);
    var AMPM1 = time.match(/\s(.*)$/)[1];
    if (AMPM1 == "pm" && hours1 < 12) hours1 = hours1 + 12;
    if (AMPM1 == "am" && hours1 == 12) hours1 = hours1 - 12;
    var sHours1 = hours1.toString();
    var sMinutes1 = minutes1.toFixed(2);
    if (hours1 < 10) sHours1 = "0" + sHours1;
    if (minutes1 < 10) sMinutes1 = "0" + sMinutes1;

    return (sHours1 + ":" + sMinutes1);
};


 //function to check if workstartime is greater than workendtime




//$(function () {

    

    //$('#addbutton').click(function() {

    //    var description = $('#description').val();
    //    var name = $('#dropdown option:selected').text();
    //    var projectid = $("#dropdown option:selected").val();
    //    var duration = $('#duration').val();
    //    var workstime = $('#workstartingtime').val();
    //    var worketime = $('#workendingtime').val();
    //    var date = $('#date').val();
    //    var developerid = '@HttpContext.Current.User.Identity.GetUserId()';

    //    if (description !== "" && name !== "" && duration !== "" && workstime !== "" && worketime !== "" && date !== "")
    //    {

    //        var url='/API/Log/GetTodayLogTimeCheck';
    //        $.get(url,{developerid:developerid,starttime:workstime,endtime:worketime,date:date},function(result,status){
    //            console.log(result,status);
    //            var len = result.length;
    //            console.log("length:",len);

    //            if(len>0)
    //            {

    //                $('#message').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>There is already log saved  for this timeline.So enter correct time line </div>');
    //                $('.alert-success').hide();


    //            }

    //            else
    //            {

    //               var html = new Array();
    //                html.push('<logs>');
    //                html.push('<LineItem ');
    //                html.push('Description="' + description + '"');
    //                html.push('ProjectId="' + projectid + '"');
    //                html.push('Duration="' + duration + '"');
    //                html.push('WorkStartTime="' + workstime + '"');
    //                html.push('WorkEndTime="' + worketime + '"');
    //                html.push('Date="' + date + '"');
    //                html.push('DeveloperId="' + developerid + '"');
    //                html.push('></LineItem>');
    //                html.push('</logs>');
    //                console.log(html.join(''));
    //                var logXML = html.join(' ');
    //                var json = '{"logXML":' + JSON.stringify(logXML) + '}';
    //                console.log(json);
    //                $.ajax({
    //                    type: 'POST',
    //                    url: '/API/Log/SaveReport',
    //                    data: json,
    //                    dataType: 'json',
    //                    contentType: 'application/json; charset=utf-8',
    //                    success: function (data) {
    //                        $('#message').html('<div class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Log Record Saved Successfully </div>');
    //                        $('.alert-danger').hide();
    //                        reset();
    //                        var url='/Home/GetTodaysLog';
    //                        $.get(url,function(data){
    //                            $('#tblDeveloperLog').html(data);

    //                        });

    //                    },
    //                    error: function () {
    //                        $('#message').html('<div class="alert alert-danger">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> something went wrong while  saving. try again!!</div>');
    //                        $('.alert-success').hide();
    //                    }
    //                });


    //            }
    //        });


    //    }
    //    else
    //    {
    //        $('#message').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Fill out all the blanks!!</div>');
    //        $('.alert-success').hide();

    //    }



    //});
//});
//clearing the fields after adding
function reset() {
    document.getElementById("description").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("workstartingtime").value = "";
    document.getElementById("workendingtime").value = "";
}


// for deleting specific log columns from database
function deletebutton(ob) {

    BootstrapDialog.show({
        title: 'Log Delete',
        message: 'Are you sure you want to delete it?',
        draggable: true,
        buttons: [{
            cssClass:'btn-primary',
            label: 'Yes',
            action: function(dialog) {
                logid = $(ob).closest("tr").find(".logid").val();
                var url = '/API/Log/GetSeletedLogsDelete';
                $.get(url, { id: logid }, function(data) {
                    console.log("successfully deleted");
                    var url='/Home/GetTodaysLog';
                    $.get(url,function(data){
                        $('#tblDeveloperLog').html(data);
                        $('#message').html('<div class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Log Record Deleted Successfully </div>');
                    });

                });

                dialog.close();
            }
        }, {
            cssClass:'btn-warning',
            label: 'Close',
            action: function(dialog) {
                dialog.close();
            }
        }]
    });


}

// for editing specific log columns from database
function editbutton(ob) {

    BootstrapDialog.show({
        title: 'Log Edit',
        message: 'Are you sure you want to edit it?',
        draggable: true,
        buttons: [{
            cssClass:'btn-primary',
            label: 'Yes',
            action: function(dialog) {
                logid = $(ob).closest("tr").find(".logid").val();
                description = $(ob).closest("tr").find(".description").text(); // Finds the closest row <tr> // Gets a descendent with class="nr"    // Retrieves the text within <td>
                projectname = $(ob).closest("tr").find(".projectname").text();
                duration = $(ob).closest("tr").find(".duration").text();
                workstime = $(ob).closest("tr").find(".workstime").text();
                worketime = $(ob).closest("tr").find(".worketime").text();
                date = $(ob).closest("tr").find(".date").text();
                var developerid = '@HttpContext.Current.User.Identity.GetUserId()';

                editlog(logid, description, projectname, duration, workstime, worketime, date, developerid);

                dialog.close();
            }
        }, {
            cssClass:'btn-warning',
            label: 'Close',
            action: function(dialog) {
                dialog.close();
            }
        }]
    });


}


function editlog(logid, description, projectname, duration, workstime, worketime, date, developerid) {

    dialogAddItem = new BootstrapDialog({
        title: 'Are you sure you want to edit it?',
        message:
            '<div class="modal-bodydata">' +
                // for error message

                '<div id="message1" class="row"></div><br/>'+
                //first row
                '<div class="row">' +
                '<div class="col-md-2 form-group">Description</div>'+
                '<div class="col-md-6">' +
                '<textarea class="form-control" id="editdescription" >'+description+'</textarea>'+
                '</div>' +
                '<div class="col-md-4">' +
                '<select id="projects" class="form-control">' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<br/>' +

                //second row

                '<div class="row">' +
                 '<div class="col-md-2">Start Time</div>'+
                '<div class="col-md-4">' +
                 '<div class="form-group">' +
                '<div class="input-group date" id="datetimepicker1" style="width:150px">' +
                '<input type="text" class="form-control" value="' + workstime + '" id="editworkstime" />' +
                '<span class="input-group-addon">' +
                '<span class="glyphicon glyphicon-time"></span>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                 '<div class="col-md-2">End Time</div>'+
                '<div class="col-md-4">' +
                '<div class="form-group">' +
                '<div class="input-group date" id="datetimepicker2" style="width:150px">' +
                '<input type="text" class="form-control" value="' + worketime + '" id="editworketime" />' +
                '<span class="input-group-addon">' +
                '<span class="glyphicon glyphicon-time"></span>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br/>' +

                //third row

                '<div class="row">' +
                '<div class="col-md-2">Duration</div>'+
                '<div class="col-md-3">' +
                '<input type="text" class="form-control" value="' + duration + '" id="editduration" readonly="readonly"  />' +
                '</div>' +
                 '<div class="col-md-2">Date</div>'+
                '<div class="col-md-5">' +
                '<div class="form-group">' +
                '<div class="input-group date" id="datetimepicker3" style="width:150px">' +
                '<input type="text" class="form-control" value="' + date + '" id="editdate" />' +
                '<span class="input-group-addon">' +
                '<span class="glyphicon glyphicon-calendar"></span>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-3">' +
                '</div>' +
                '</div>',
        onshow: function(dialogRef) {
            // alert('Dialog is popping up, its message is ');

        },
        onshown: function(dialogRef) {

            getprojectname();
            $('#message1').hide();
            $('#datetimepicker1').datetimepicker({
                format: 'h:mm a'

            });

            $('#datetimepicker2').datetimepicker({
                format: 'h:mm a'

            });

            $('#datetimepicker3').datetimepicker({
                format: 'YYYY-M-D'
            });

            $('#editworkstime').datetimepicker({
                format: 'h:mm a'
            });
            $('#editworketime').datetimepicker({
                format: 'h:mm a'
            });
            $('#editdate').datetimepicker({
                format:'M/D/YYYY'
            });


            $('#editworkstime').focusout(function () {

                var starttime = parseFloat(ConvertTimeFormat("24", $('#editworkstime').val()));
                var endtime = parseFloat(ConvertTimeFormat("24", $('#editworketime').val()));
                var workstime = starttime.toFixed(2).split('.');
                var worketime = endtime.toFixed(2).split('.');
                var shours = parseInt(workstime[0]);
                var sminute = parseInt(workstime[1]);
                var ehours = parseInt(worketime[0]);

                var eminute = parseInt(worketime[1]);

                var hdiff = ehours - shours;
                var mdiff = eminute - sminute;

                if (endtime > starttime) {

                    if (mdiff<0) {
                        mdiff = mdiff + 60;
                        hdiff = hdiff - 1;
                        $('#editduration').val(hdiff + ":" + mdiff);
                    }
                    else {
                        $('#editduration').val(hdiff + ":" + mdiff);
                    }

                }
                if (endtime == starttime) {

                    $('#editduration').val('');
                }

                if(starttime>endtime) {

                    $('#editduration').val('');
                }


            });

            $('#editworketime').focusout(function () {

                var starttime = parseFloat(ConvertTimeFormat("24", $('#editworkstime').val()));
                var endtime = parseFloat(ConvertTimeFormat("24", $('#editworketime').val()));

                var workstime = starttime.toFixed(2).split('.');
                var worketime = endtime.toFixed(2).split('.');
                var shours = parseInt(workstime[0]);
                var sminute = parseInt(workstime[1]);
                var ehours = parseInt(worketime[0]);

                var eminute = parseInt(worketime[1]);

                var hdiff = ehours - shours;
                var mdiff = eminute - sminute;

                if (endtime > starttime) {
                    if (mdiff < 0) {
                        mdiff = mdiff + 60;
                        hdiff = hdiff - 1;
                        $('#editduration').val(hdiff + ":" + mdiff);
                    }
                    else {
                        $('#editduration').val(hdiff + ":" + mdiff);
                    }
                }


                if (endtime == starttime) {
                    $('#editduration').val('');
                }

                if(starttime>endtime) {

                    $('#editduration').val('');


                }

            });

        },
        draggable: true,
        buttons: [
        {
            label: 'Apply',
            cssClass: 'btn-success',
            action: function(dialog) {


                var description = $('#editdescription').val();
                var edate = $('#editdate').val();
                var projectid = $('#projects option:selected').val();
                var workstime=$('#editworkstime').val();
                var worketime=$('#editworketime').val();
                var duration=$('#editduration').val();



                if (description !== "" && duration !== "" && workstime !== "" && worketime !== "" && edate !== "")
                {

                    var url='/API/Log/GetTodayLogTimeCheck';
                    $.get(url,{developerid:developerid,starttime:workstime,endtime:worketime,date:date},function(result,status){
                        console.log(result,status);
                        var len = result.length;
                        console.log("len:",len);
                        if(len>1)
                        {
                            alert("There is already log saved  for this timeline.So enter correct time line");
                        }

                        else
                        {
                            var html = new Array();
                            html.push('<logs>');
                            html.push('<LineItem ');
                            html.push('Id="' + logid + '"');
                            html.push('D="' + description + '"');
                            html.push('pr="' + projectid + '"');
                            html.push('wst="' + workstime + '"');
                            html.push('wet="' + worketime + '"');
                            html.push('d="' + duration + '"');
                            html.push('date="' + edate + '"');
                            html.push('did="' + developerid + '"');
                            html.push('></LineItem>');
                            html.push('</logs>');
                            console.log(html.join(''));
                            var editlogXML = html.join(' ');

                            var json = '{"editlogXML":' + JSON.stringify(editlogXML) + '}';
                            console.log(json);

                            //console.log(json);
                            $.ajax({
                                type: 'POST',
                                url: '/API/Log/GetLogsUpdate',
                                data: json,
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function(data) {

                                    //alert("Data Updated Successfully");
                                    $('.alert-danger').hide();

                                    $('#tblDeveloperLog').load('/Home/GetTodaysLog');

                                    $('#message').html('<div class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Log Record Updated  Successfully </div>');

                                },
                                error: function() {

                                    $('.alert-success').hide();

                                    $('#message').html('<div class="alert alert-danger"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> something went wrong while  saving. try again!!</div>');
                                }
                            });
                        }

                    });

                    dialog.close();

                }

                else if(duration==""){
                    alert("Please enter correct timeline before saving(Work start time should be less than work end time).")
                }

                else{
                    alert("Fill out all the blanks before applying for saving");
                }
            }

        },{
            cssClass:'btn-warning',
            label: 'Close',
            action: function(dialog) {
                dialog.close();
            }
        }
        ]
    });

    dialogAddItem.open();


}


//loading projectsname in dropdown
function getprojectname() {
    url= '/API/Log/GetAllProjectName';
    var id='@HttpContext.Current.User.Identity.GetUserId()';

    $.get(url,{developerid:id},function(data){
        console.log(data);
        var options = [];
        for (var i = 0; i < data.length; i++) {
            options.push('<option value="',
                data[i].Id, '">',
                data[i].Name, '</option>');
        }
        $("#projects").html(options.join(''));
    });
}



// function for subtracting 1 minute from starttime before checking for  timeline errors





