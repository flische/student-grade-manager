$(document).ready(initializeApp);
var student_array = [];

function initializeApp() {
    addClickHandlersToElements();
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
    console.log(student_array);

}

function clearAddStudentFormInputs() {
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('');
}

function updateStudentList() {
    renderStudentOnDom(student_array);
    var avgGrade = calculateGradeAverage(student_array);
    $('.avgGrade').text(avgGrade);
}

function calculateGradeAverage(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += parseInt(array[i].grade);
    }
    var averageGrade = total / array.length;
    return averageGrade;
}

function handleCancelClick() {
    clearAddStudentFormInputs();
}

function renderStudentOnDom(array) {
    for (var i = 0; i < array.length; i++) {
        var tableRow = $('<tr>');
        var tableName = $('<td>');
        var tableCourse = $('<td>');
        var tableGrade = $('<td>');
        var tableButton = $('<td>');
        var deleteButton = $('<button>', {
            class: 'btn btn-danger dButton',
            id: i,
            text: 'Delete'
        });
        deleteButton.on('click', handleDeleteButton);
        tableButton.append(deleteButton);
        tableName.text(array[i].name);
        tableCourse.text(array[i].course);
        tableGrade.text(array[i].grade);
        tableRow.append(tableName, tableCourse, tableGrade, tableButton);
    }
    $('tbody').append(tableRow);

}
function handleDeleteButton(){
    this.closest('tr').remove();
    var deleteIndex = $(this).attr('id');
    student_array.splice(deleteIndex, 1);

}
function getDataFromServer(){
    var the_data = {
        api_key: 'ejGxYw96BE'
    };
    var ajaxOptions = {
        dataType: 'json',
        data: the_data,
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/sgt/get',
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log('error');
        }
    };
    $.ajax(ajaxOptions);

}

// $(document).ready(initializeApp);
// var studentsArray = [];
//
// function initializeApp() {
//     addClickHandlersToElements();
// }
//
// function addClickHandlersToElements() {
//     // add all click handlers to here
//     $('.addButton').on('click', handleAddClicked);
//     $('.cancelButton').on('click', handleCancelClick);
// }
//
// function handleAddClicked() {
//     //param is the event object from the click
//     addStudent();
// }
//
// function handleCancelClick() {
//     clearAddStudentFormInputs();
// }
//
// function addStudent() {
//     var eachStudentObject = {};
//     var eachStudentName = $('#studentName').val();
//     var eachStudentCourse = $('#course').val();
//     var eachStudentGrade = $('#studentGrade').val();
//     eachStudentObject.name = eachStudentName;
//     eachStudentObject.course = eachStudentCourse;
//     eachStudentObject.grade = eachStudentGrade;
//     studentsArray.push(eachStudentObject);
//     clearAddStudentFormInputs();
//     updateStudentList();
//     console.log(studentsArray);
// }
//
// function clearAddStudentFormInputs() {
//     $('#studentName').val('');
//     $('#course').val('');
//     $('#studentGrade').val('');
// }
//
// function renderStudentOnDom(array) {
//     for (var i = 0; i < array.length; i++) {
//         var tableRow = $('<tr>');
//         var tableName = $('<td>');
//         var tableCourse = $('<td>');
//         var tableGrade = $('<td>');
//         var tableButton = $('<td>');
//         var deleteButton = $('<button>', {
//             class: 'btn btn-danger deleteButton',
//             id: i,
//             text: 'Delete'
//         });
//         deleteButton.on('click', deleteEntry);
//         tableButton.append(deleteButton);
//         tableName.text(array[i].name);
//         tableCourse.text(array[i].course);
//         tableGrade.text(array[i].grade);
//         tableRow.append(tableName, tableCourse, tableGrade, tableButton);
//     }
//     $('tbody').append(tableRow);
// }
//
// function deleteEntry(){
//     this.closest('tr').remove();
//     var deleteIndex = $(this).attr('id');
//     studentsArray.splice(deleteIndex, 1);
// }
//
//
// function updateStudentList() {
//     // param is the array of student objects
//     renderStudentOnDom(studentsArray);
//     var avgGrade = calculateGradeAverage(studentsArray);
//     $('.avgGrade').text(avgGrade);
//     // renderGradeAverage();
// }
//
// //this function loops through the global student array and calculates average grade then returns the value
//     // param is the array of student objects
//     // returns a number (average grade)
// function calculateGradeAverage(array) {
//     var total = 0;
//     for(var i = 0; i < array.length; i++){
//         total += parseInt(array[i].grade);
//     }
//     var averageGrade = total / array.length;
//     return averageGrade;
// }
