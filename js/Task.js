let taskList = [];

//Add a new record into 'taskList' array.
function CreateNewTask(){
    let name = document.getElementById("TaskName").value;
    let completed = document.getElementById("TaskCompleted").checked;
    let taskRecord = new Task(name, completed);
    taskRecord.setId(taskList.map((filObj) => filObj.id));
    taskList.push(taskRecord);
    
    AddNewRowToTable(taskRecord);
    ResetControls();
}

//After add a new Task record, clean the textbox value insert and change to unselected the checkbox element.
function ResetControls(){
    document.getElementById("TaskName").value = "";
    document.getElementById("TaskCompleted").checked = false;
}

//Delete a record from 'taskList' array.
function DeleteTask(idTask){
    if (window.confirm("¿Confirma que desea eliminar el registro seleccionado?")) {
        let index = -1;
    
        taskList.forEach((record) => {
            index++;
            if(record.id == idTask){
                taskList.splice(index, 1);
                RemoveTaskRow(idTask);
                return;
            }
        });
        FilterTaskRecords();
    }
}

//Update the record "completed" property from 'taskList' array.
function UpdateCompletedValueToTask(idTask){
    taskList.forEach((record) => {
        if(record.id == idTask){
            record.completed = !record.completed;
            UpdateRowCompletedValue(record); //Invoke a funtion to change front column "Completada" value table.
            return;
        }
    });
}

//Change the text in "Completada" front column table.
function UpdateRowCompletedValue(record){
    UpdateCompletedValue(record.id, record.completed);
    FilterTaskRecords();
}

//Filter records in base the "completed" Task property.
function FilterTaskRecords(){
    valueFilter = document.getElementById('TaskCompletedFilter').value;
    ShowAllTaskRecords();
    if(valueFilter == "")
        return;
    
    let recordsFiltered = taskList.filter((record) => record.completed != (valueFilter == 'true'));
    ChangeDisplayValue(recordsFiltered, "none");
}

//Show all task records created.
function ShowAllTaskRecords(){
    ChangeDisplayValue(taskList, "table-row");
}

//After create a new Task object record add the created record into front table.
function AddNewRowToTable(taskRecord){
    let table = document.getElementById('TaskRecordsBodyTable');
    let row = table.insertRow(); // Insert a new row at the end of the table
    row.id = `row_${taskRecord.id}`;
    row.insertCell().textContent = taskRecord.name;
    
    let newCell = row.insertCell();
    let completedValue = document.createElement('p');
    completedValue.textContent = taskRecord.completed ? "Completada" : "Pendiente";
    completedValue.id = `completedValue_${taskRecord.id}`;
    newCell.appendChild(completedValue);
    
    newCell = row.insertCell();
    let button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.setAttribute("style", "margin-right: 5%;");
    button.setAttribute("onclick", "DeleteTask('" + taskRecord.id + "')");
    newCell.appendChild(button);
    
    button = document.createElement('input');
    button.type = "checkbox";
    button.checked = taskRecord.completed;
    button.id = `checkbox_${taskRecord.id}`;
    button.setAttribute("onclick", "UpdateCompletedValueToTask('" + taskRecord.id + "')");
    newCell.appendChild(button);    
    
    let label = document.createElement('label');
    label.textContent = taskRecord.completed ? "Quitar completada" : "Marcar como completada";
    label.id = `label_${taskRecord.id}`;
    newCell.appendChild(label);    
}

//Remove the deleted record Task item from table front.
function RemoveTaskRow(id){
    document.getElementById(`row_${id}`).remove();
}