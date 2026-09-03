/*
 CONCEPT: TODO LIST — GENERATING HTML WITH LOOPS + DOM RE-RENDERING
 - This is your first real "app" that combines: arrays, objects, loops, DOM, and template literals.
 - PATTERN: "Data → Generate HTML → Render to DOM"
   1. Store data in a JavaScript array (the "source of truth")
   2. Loop through the array to BUILD an HTML string
   3. Set innerHTML to RENDER that HTML string on the page
   4. When data changes, RE-GENERATE the HTML and re-render (call updatedList again)
 - This "re-rendering" pattern is the foundation of how frameworks like React work!
*/

// The 'result' array is the DATA MODEL — it stores all todo items.
// Each item will be an object with 'name' and 'doDate' properties.
const result = [];


/*
 updatedList() — RE-RENDERS the entire todo list whenever data changes.
 CONCEPT: Loop through data to build HTML dynamically.
 - Start with an empty string (todoHtml = '')
 - For each item, CONCATENATE more HTML onto that string using +=
 - Finally, set innerHTML of the container to the full HTML string
 - This completely REPLACES the old HTML every time — simple but effective.
*/
function updatedList(){
    let todoHtml = '';

    for(let i = 0 ; i < result.length; i++){
        /*
         Template literal creates HTML for each todo item.
         ${result[i].name} and ${result[i].doDate} insert the data into the HTML.
         
         CONCEPT: INLINE onclick WITH DYNAMIC INDEX
         - onclick="result.splice(${i}, 1)" uses ${i} to embed the current index.
         - When the HTML is rendered, ${i} is REPLACED with the actual number (0, 1, 2...).
         - So the rendered HTML becomes: onclick="result.splice(0, 1)" for the first item.
         - splice(index, 1) removes 1 element at that index from the array.
         - After removing, we call updatedList() to re-render the list without that item.
        */
        todoHtml += `
       
        <div>${result[i].name}</div>
        <div >${result[i].doDate}</div>
        <button class = "delete-todo-button" onclick = "
            result.splice(${i} , 1)
            updatedList();
            "
        >Delete</button>
        
         `
    }

    // Replace ALL the HTML inside the container with the newly generated HTML
    document.querySelector('.js-div')
        .innerHTML = todoHtml;
}


/*
 addTodo() — reads user input, creates a todo object, adds it to the array, and re-renders.
 CONCEPT: Reading from DOM → Updating Data → Re-rendering
*/
function addTodo(){
    // Get references to the input elements
    const nameInput = document.querySelector('.js-input');
    const doDateInput = document.querySelector('.js-date');
    
    // Read the current values from the inputs
    const name = nameInput.value;
    const doDate = doDateInput.value;

    /*
     Push a new object into the result array.
     CONCEPT: SHORTHAND OBJECT PROPERTIES
     - When the variable name matches the property name, you can use shorthand:
       { name: name, doDate: doDate } → { name, doDate }
     - This is just syntactic sugar — works exactly the same way.
    */
    result.push({
        //name: name,
        //doDate: doDate
        name,       // Shorthand for name: name
        doDate      // Shorthand for doDate: doDate
    });
    
    // Clear the inputs after adding (good UX — user doesn't have to manually clear)
    nameInput.value= "";
    doDateInput.value = "";

    // Re-render the list to show the new item
    updatedList();
}