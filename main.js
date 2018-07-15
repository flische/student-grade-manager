$(document).ready(initializeApp);
var studentsArray = [];

function initializeApp() {
    addClickHandlersToElements();
}

function addClickHandlersToElements() {
    // add all click handlers to here
    $('.addButton').on('click', handleAddClicked);
    $('.cancelButton').on('click', handleCancelClick);
}

function handleAddClicked() {
    //param is the event object from the click
    addStudent();
}

function handleCancelClick() {
    clearAddStudentFormInputs();
}

function addStudent() {
    var eachStudentObject = {};
    var eachStudentName = $('#studentName').val();
    var eachStudentCourse = $('#course').val();
    var eachStudentGrade = $('#studentGrade').val();
    eachStudentObject.name = eachStudentName;
    eachStudentObject.course = eachStudentCourse;
    eachStudentObject.grade = eachStudentGrade;
    studentsArray.push(eachStudentObject);
    clearAddStudentFormInputs();
    updateStudentList();
    console.log(studentsArray);
}

function clearAddStudentFormInputs() {
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('');
}

function renderStudentOnDom(array) {
    for (var i = 0; i < array.length; i++) {
        var tableRow = $('<tr>');
        var tableName = $('<td>');
        var tableCourse = $('<td>');
        var tableGrade = $('<td>');
        var tableButton = $('<td>');
        var deleteButton = $('<button>', {
            class: 'btn btn-danger deleteButton',
            id: i,
            text: 'Delete'
        });
        deleteButton.on('click', deleteEntry);
        tableButton.append(deleteButton);
        tableName.text(array[i].name);
        tableCourse.text(array[i].course);
        tableGrade.text(array[i].grade);
        tableRow.append(tableName, tableCourse, tableGrade, tableButton);
    }
    $('tbody').append(tableRow);
}

function deleteEntry(){
    this.closest('tr').remove();
    var deleteIndex = $(this).attr('id');
    studentsArray.splice(deleteIndex, 1);
}


function updateStudentList() {
    // param is the array of student objects
    renderStudentOnDom(studentsArray);
    var avgGrade = calculateGradeAverage(studentsArray);
    $('.avgGrade').text(avgGrade);
    // renderGradeAverage();
}

//this function loops through the global student array and calculates average grade then returns the value
    // param is the array of student objects
    // returns a number (average grade)
function calculateGradeAverage(array) {
    var total = 0;
    for(var i = 0; i < array.length; i++){
        total += parseInt(array[i].grade);
    }
    var averageGrade = total / array.length;
    return averageGrade;
}
