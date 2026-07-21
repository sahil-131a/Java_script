const result = [];


function updatedList(){
    let todoHtml = '';

    result.forEach(function(value , index){
        todoHtml += `
       
        <div>${value.name}</div>
        <div >${value.doDate}</div>
        <button class = "delete-todo-button" onclick = "
            result.splice(${index} , 1)
            updatedList();
            "
        >Delete</button>
        
         `
    })

    document.querySelector('.js-div')
        .innerHTML = todoHtml;
}


function addTodo(){
    const nameInput = document.querySelector('.js-input');
    const doDateInput = document.querySelector('.js-date');
    
    const name = nameInput.value;
    const doDate = doDateInput.value;

    result.push({
        //name: name,
        //doDate: doDate
        name,
        doDate
    });
    
    nameInput.value= "";
    doDateInput.value = "";

    updatedList();
}