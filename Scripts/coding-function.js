getall();
var isNew = true; // determine whether the current operation is for adding a new record or updating an existing if adding it bydefault true and if it updating it set false
function addProject() {
    var url = '';
    var data = '';
    var method;
    // above variables will be used to store the URL, data, and HTTP method for the AJAX call.

    if ($('#name').val() == '' || $('#fee').val() == '') {    //checking validation
        alert('Please fill all required fields.');
        return false;
    }

    if (isNew == true) {
        url = '/lolc/save';
        data = "{coursename:'" + $('#name').val() + "',fee:'" + $('#fee').val() + "'}";
        method = 'POST';
    }
    else {
        url = '/lolc/save';
        data = "{coursename:'" + $('#name').val() + "',fee:'" + $('#fee').val() + "',id:'" + ID + "'}";
        method = 'POST';
    }

    $.ajax({
        type: method,
        url: url,
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        data: data,

        success: function (data)
        {
            if (isNew) {
                alert("Data Save successfully");
              
                getall();
            }
            else {
                alert('Data updated successfully!');
                window.location.reload();
                getall();
            }
            $('#name').val('');
            $('#fee').val('');
        }
    })
}

function getall() {
    //destroy if any  existing data table before creating a new 
    $('#tbl-school').dataTable().fnDestroy();
    // Create a new data table using the DataTables plugin and Ajax to retrieve data from the server
    $('#tbl-school').dataTable({
        "ajax": {
            "url": '/lolc/GetCourses',
            "type": "GET",
            "datatype": "JSON"
        },
        "columns": [
            { data: "coursename" },
            { data: "fee" },
            {
                data: "id", "render": function (data) {
                    return '<button class="btn btn-success" onclick="get_course(' + data + ')">Edit</button>';
                }
            },
            {

                data: "id", "render": function (data) {
                    return '<button class="btn btn-danger" onclick="get_delete(' + data + ')">Delete</button>';
                }
            }

        ]
    })

}

function get_course(id) {
    $.ajax({
        type: 'GET',
        url: '/lolc/Edit?Id=' + id,
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            isNew = false;
            ID = data.id;
            $('#name').val(data.coursename);
            $('#fee').val(data.fee);
            $('#save').text('Update');
        }
    });
}

function get_delete(id) {
    $.ajax({
        type: 'POST',
        url: '/lolc/Remove?Id=' + id,
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert("Delted")
            getall();
        }
    });

}