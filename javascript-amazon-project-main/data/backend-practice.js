/*
 CONCEPT: XMLHttpRequest — Your first backend request!
 - This file demonstrates how to make an HTTP GET request to a server.
 - XMLHttpRequest (XHR) is the traditional way to fetch data from APIs.

 HOW IT WORKS (step by step):
 1. Create a new XMLHttpRequest object
 2. Add an event listener for when the response arrives ('load' event)
 3. Open a connection: specify the HTTP method (GET) and the URL
 4. Send the request

 IMPORTANT: This is ASYNCHRONOUS — meaning:
 - xhr.send() fires the request and IMMEDIATELY moves to the next line.
 - The 'load' callback runs LATER, when the server's response arrives.
 - Code after xhr.send() does NOT wait for the response.

 HTTP Methods:
 - GET  → retrieve/read data from the server
 - POST → send/create new data on the server
 - PUT  → update existing data on the server
 - DELETE → remove data from the server
*/

const xhr = new XMLHttpRequest();

// Step 1: Set up what happens when the response arrives
xhr.addEventListener('load' , () => {
    console.log(xhr.response);   // xhr.response contains the server's response as a string
}) 

// Step 2: Open a GET request to the URL
xhr.open('GET' , 'https://supersimplebackend.dev/hello');

// Step 3: Send the request (this is non-blocking — code continues immediately)
xhr.send();
