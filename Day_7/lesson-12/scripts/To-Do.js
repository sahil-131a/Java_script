/*
 CONCEPT: UPGRADED TODO LIST — forEach, querySelectorAll, addEventListener
 - This version upgrades the Day 6 todo list with Day 7 concepts:
   1. forEach() replaces the for loop (cleaner, more readable)
   2. addEventListener() replaces inline onclick="" for delete buttons
   3. querySelectorAll() selects ALL matching elements (not just the first one)

 KEY UPGRADE: EVENT DELEGATION via querySelectorAll + addEventListener
 - In the Day 6 version, delete buttons used inline onclick="result.splice(${i}, 1)".
 - Here, we generate the HTML WITHOUT onclick, then ATTACH event listeners after rendering.
 - This is cleaner because it separates HTML structure from behavior (event handling).
*/

const result = [];


function updatedList(){
    let todoHtml = '';

    /*
     CONCEPT: forEach() instead of for loop
     - array.forEach((value, index) => { ... })
     - 'value' = the current element (todo object)
     - 'index' = the position in the array (0, 1, 2...)
     - Cleaner than for(let i = 0; i < result.length; i++)
    */
    result.forEach((value , index) => {
        /*
         Notice: NO onclick in the button HTML!
         Instead, we give all delete buttons the same class ('js-delete-button')
         and attach event listeners AFTER the HTML is rendered (below).
        */
        todoHtml += `
       
        <div>${value.name}</div>
        <div>${value.doDate}</div>
        <button class = "delete-todo-button js-delete-button">
        Delete
        </button>       
        `
    })

    // Render the generated HTML
    document.querySelector('.js-div')
        .innerHTML = todoHtml;

    /*
     CONCEPT: querySelectorAll() + forEach() for event listeners
     - querySelectorAll('.js-delete-button') returns a NodeList of ALL matching elements.
     - Unlike querySelector (returns first match), querySelectorAll returns ALL matches.
     - We loop through each button with forEach and attach a click listener.
     
     CONCEPT: CLOSURE OVER 'index'
     - Each arrow function "remembers" the value of 'index' from its iteration.
     - This is called a CLOSURE — the function "closes over" the variable.
     - So the first button remembers index=0, second remembers index=1, etc.
     - When clicked, splice(index, 1) removes the correct item.
     - After removing, we call updatedList() to re-render the entire list.
    */
    document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton , index) =>{
        deleteButton.addEventListener('click' , () =>{
            result.splice(index , 1);  // Remove 1 element at the captured index
            updatedList();              // Re-render the list
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

/*
 CONCEPT: addEventListener on the ADD button too!
 - Even the "Add" button now uses addEventListener instead of inline onclick.
 - This is consistent with the Day 7 approach — all event handling in JS.
*/
document.querySelector('.js-add-button')
    .addEventListener('click' , () => {
        addTodo();
    })
    