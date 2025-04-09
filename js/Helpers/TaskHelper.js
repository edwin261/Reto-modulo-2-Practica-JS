function GenerateUniqueIdentifier(idRecords){
    let guid = '';
    do{
        guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, 
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }while(!ValidateGeneratedIdentifier(idRecords, guid));
    return guid;
}

function ValidateGeneratedIdentifier(idRecords, id){
    return idRecords.filter((obj) => obj.id == id) ? true : false;
}

function ChangeDisplayValue(records, displayValue){
    let element;
    records.forEach((record) => {
        element = element = document.getElementById(`row_${record.id}`);
        element.style.display = displayValue;
    });
}

function UpdateCompletedValue(id, completed){
    document.getElementById(`completedValue_${id}`).innerText = completed ? "Completada" : "Pendiente";
    document.getElementById(`checkbox_${id}`).checked = completed;
    document.getElementById(`label_${id}`).innerText = completed ? "Quitar completada" : "Marcar como completada";
}