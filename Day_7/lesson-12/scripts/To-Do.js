const result = [];


function updatedList(){
    let todoHtml = '';

    result.forEach((value , index) => {
        todoHtml += `
       
        <div>${value.name}</div>
        <div>${value.doDate}</div>
        <button class = "delete-todo-button js-delete-button">
        Delete
        </button>       
        `
    })

    document.querySelector('.js-div')
        .innerHTML = todoHtml;

    document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton , index) =>{
        deleteButton.addEventListener('click' , () =>{
            result.splice(index , 1);
            updatedList();
        });
    });    
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


document.querySelector('.js-add-button')
    .addEventListener('click' , () => {
        addTodo();
    })
    