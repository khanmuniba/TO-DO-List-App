const inputbox = document.getElementById("inputbox");
const addbtn = document.getElementById("addbtn");
const todoList = document.getElementById("todoList");

let editToDo = null;

const addToDo = () => {
    const inputText = inputbox.value.trim();
    if (inputText.length <= 0) {
        alert("You must add something in your To-Do");
        return false;
    }

    if (addbtn.value === "Edit") {
        // Update the existing item's text and reset the state
        editToDo.previousElementSibling.innerHTML = inputText;
        addbtn.value = "Add";
        inputbox.value = "";
        editToDo = null; // Clear the edit reference
        return;
    }

    // Creating list item
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating Edit button
    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.classList.add("btn", "editbtn");
    li.appendChild(editbtn);

    // Creating Delete button
    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    deletebtn.classList.add("btn", "deletebtn");
    li.appendChild(deletebtn);

    // Append list item to the to-do list
    todoList.append(li);
    inputbox.value = "";

    savelocaltodo(inputText);
};

const updateToDo = (e) => {
    if (e.target.innerHTML === "Remove") {
        // Remove from localStorage
        const itemText = e.target.previousElementSibling.previousElementSibling.innerHTML;
        removeFromLocalStorage(itemText);

        // Remove from webpage
        todoList.removeChild(e.target.parentElement);
    } else if (e.target.innerHTML === "Edit") {
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value = "Edit";
        editToDo = e.target; // Save reference to the Edit button
    }
};

const savelocaltodo = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];  // If no items in localStorage, create an empty array
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));  // Get existing items from localStorage
    }
    todos.push(todo);  // Add the new to-do item to the array
    localStorage.setItem("todos", JSON.stringify(todos));  // Save the updated array back to localStorage
};

const getlocaltodo = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];  // If no items in localStorage, create an empty array
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));  // Get existing items from localStorage
        todos.forEach((todo) => {
            // Creating list item
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            // Creating Edit button
            const editbtn = document.createElement("button");
            editbtn.innerText = "Edit";
            editbtn.classList.add("btn", "editbtn");
            li.appendChild(editbtn);

            // Creating Delete button
            const deletebtn = document.createElement("button");
            deletebtn.innerText = "Remove";
            deletebtn.classList.add("btn", "deletebtn");
            li.appendChild(deletebtn);

            // Append list item to the to-do list
            todoList.append(li);
        });
    }
};

const removeFromLocalStorage = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter((item) => item !== todo); // Remove the specific item
    localStorage.setItem("todos", JSON.stringify(todos));  // Update localStorage
};

document.addEventListener('DOMContentLoaded', getlocaltodo);
addbtn.addEventListener("click", addToDo);
todoList.addEventListener("click", updateToDo);
