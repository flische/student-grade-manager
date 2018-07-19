$(document).ready(initializeApp);
var student_array = [];

function initializeApp() {
    addClickHandlersToElements();
    getDataFromServer();
    $(document).ajaxStart(function(){
        $('.fa-spin').show();
    });
    $(document).ajaxComplete(function(){
        $('.fa-spin').hide();
    });
    // $('#editEntry').modal({show:false});
}

function addClickHandlersToElements() {
    $('.addButton').on('click', handleAddClicked);
    $('.cancelButton').on('click', handleCancelClick);
    $('.getDataFromServerButton').on('click', getDataFromServer);
}

function handleAddClicked() {
    if ($('#studentName').val() === '' && $('#course').val() === '' && $('#studentGrade').val() === '') {
        return;
    }
    addStudent();
}

function addStudent() {
    var eachStudentObject = {};
    var eachStudentName = $('#studentName').val();
    var eachStudentCourse = $('#course').val();
    var eachStudentGrade = $('#studentGrade').val();
    eachStudentObject.name = eachStudentName;
    eachStudentObject.course = eachStudentCourse;
    eachStudentObject.grade = eachStudentGrade;
    student_array.push(eachStudentObject);
    clearAddStudentFormInputs();
    updateStudentList();
    sendNewStudentData(eachStudentObject);
    console.log(student_array);
}

function clearAddStudentFormInputs() {
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('');
}

function updateStudentList() {
    renderStudentOnDom(student_array[student_array.length-1]);
    var avgGrade = calculateGradeAverage(student_array);
    $('.avgGrade').text(avgGrade);
}

function calculateGradeAverage(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += parseInt(array[i].grade);
    }
    var averageGrade = parseInt(total / array.length);
    if(isNaN(averageGrade)){
        averageGrade = 0;
    }
    return averageGrade;
}

function handleCancelClick() {
    clearAddStudentFormInputs();
}

function renderStudentOnDom(eachStudentObject) {
        var tableRow = $('<tr>');
        var tableName = $('<td>');
        var tableCourse = $('<td>');
        var tableGrade = $('<td>');
        var editButtonTD = $('<td>');
        var updateButton = $('<button>', {
            class: 'btn btn-warning updateButton',
            id: eachStudentObject.id,
            text: 'Update'
        });
        updateButton.on('click', function(){
            $('#editModal').modal({show:true});
            // handleEditEntryButton();
        });
        var deleteButtonTD = $('<td>');
        var deleteButton = $('<button>', {
            class: 'btn btn-danger dButton',
            id: eachStudentObject.id,
            text: 'Delete'
        });
        deleteButton.on('click', function(){
            $('#deleteConfirmModal').modal({show:true});
            var closestRow = this.closest('tr');
            $('.confirmWarningMessage').text(`Are you sure you want to delete ${eachStudentObject.name}?`);
            $('#confirmDelete').on('click', function(){
                $(closestRow).remove();
                deleteStudentData(eachStudentObject);
                handleDeleteButton(eachStudentObject);
            });
            $('#cancelRequest').on('click', function(){
                return;
            })
        });
        editButtonTD.append(updateButton);
        deleteButtonTD.append(deleteButton);
        tableName.text(eachStudentObject.name);
        tableCourse.text(eachStudentObject.course);
        tableGrade.text(eachStudentObject.grade);
        tableRow.append(tableName, tableCourse, tableGrade, editButtonTD, deleteButtonTD);
        $('tbody').append(tableRow);
}

function handleDeleteButton(currentStudent){
    student_array.splice(currentStudent, 1);
    var avgGrade = calculateGradeAverage(student_array);
    $('.avgGrade').text(avgGrade);
    deleteStudentData(currentStudent);
}

// function handleEditEntryButton(currentStudent){
//     var studentName = ('#studentName');
//     var course = ('#course');
//     var studentGrade = ('#studentGrade');
//     $(this).studentName.val('');
//     $(this).course.val('');
//     $(this).studentGrade.val('');
// }

function getDataFromServer(){
    var theData = {
        api_key: 'ejGxYw96BE'
    };
    var ajaxOptions = {
        dataType: 'json',
        data: theData,
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        success: function(response){
            var responseArray = response.data;
            for(i=0; i < responseArray.length; i++){
                student_array = responseArray;
                renderStudentOnDom(responseArray[i]);
            }
            var avgGrade = calculateGradeAverage(student_array);
            $('.avgGrade').text(avgGrade);
            console.log(response);
        },
        error: function(){
            $('#errorModal').modal({show:true});
            console.log('error');
        }
    };
    $.ajax(ajaxOptions);
}

function sendNewStudentData(eachStudentObject){
    var studentData = {
        api_key: 'ejGxYw96BE',
        name: eachStudentObject.name,
        course: eachStudentObject.course,
        grade: eachStudentObject.grade,
        id: student_array[student_array.length -1].id+1
    };
    var ajaxOptions = {
        dataType: 'json',
        data: studentData,
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/sgt/create',
        success: function(){
            console.log('student added successfully!');
        },
        error: function(){
            $('#errorModal').modal({show:true});
            console.log('ERROR');
        }
    };
    $.ajax(ajaxOptions);
}

function deleteStudentData(eachStudentObject){
    var theData = {
        api_key: 'ejGxYw96BE',
        student_id: eachStudentObject.id
    };
    var ajaxOptions = {
        dataType: 'json',
        data: theData,
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/sgt/delete',
        success: function(){
            console.log('student deleted');
            console.log(response);
        },
        error: function(){
            $('#errorModal').modal({show:true});
            console.log('error');
        }
    };
    $.ajax(ajaxOptions);
}

// var data = {q: search, maxResults: count};
// var url = "http://s-apis.learningfuze.com/hackathon/youtube/search.php";
// apis.ajax(data, url, callback);

// http://learning-fuze.github.io/project-apis/hackathon/api-obj.js