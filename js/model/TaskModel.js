class Task{
    constructor(name, completed){
        this.name = name;
        this.completed = completed;
        this.id = 0;
    }
    
    setId(idRecords){
        this.id = GenerateUniqueIdentifier(idRecords);
    }
}