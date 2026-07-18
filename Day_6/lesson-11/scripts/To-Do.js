const result = [];


function updatedList(){
    let todoHtml = '';

    for(let i = 0 ; i < result.length; i++){
        todoHtml += `<p>${result[i]}</p> `;
    }

    document.querySelector('.js-div')
        .innerHTML = todoHtml;
}


function addTodo(){
    const text = document.querySelector('.js-input');
    const name = text.value;
    result.push(name);
    console.log(result);
    text.value = "";

    updatedList();
}