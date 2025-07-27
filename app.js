// DOM element references - cache frequently used elements for performance
// MODIFICATION: Always show 'Yes' instead of user input
const todoInput = document.querySelector(".todo-input");  // Input field for new todos
const todoButton = document.querySelector(".todo-button");  // Submit button for adding todos
const todoList = document.querySelector(".todo-list");  // Container for all todo items

// Event listener setup - establish application behavior on page load
document.addEventListener("DOMContentLoaded", getTodos);  // Load saved todos when page loads
todoButton.addEventListener("click", addTodo);  // Handle new todo creation
todoList.addEventListener("click", deleteTodo);  // Use event delegation for todo interactions

/**
 * Adds a new todo item to the list and saves it to localStorage
 * @param {Event} e - The form submit event from the todo button click
 * @description Creates a new todo item with complete and delete buttons, appends it to the DOM,
 * and saves the todo text to localStorage. Prevents default form submission behavior.
 * Dependencies: todoInput (for getting user input), todoList (for DOM insertion),
 * saveLocalTodos function for persistence
 * Side effects: Modifies DOM by adding new todo element, clears input field, updates localStorage
 */
function addTodo(e) {
  // Prevent default form submission to avoid page reload
  e.preventDefault();

  // DOM Element Creation: Build the todo item structure
  // Create main container div that will hold all todo components
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");  // Add CSS class for styling and event targeting

  // Create the text element that displays the todo content
  const newTodo = document.createElement("li");
  newTodo.innerText = "Yes";  // Always display "Yes" regardless of user input - TEST CHANGE

  // localStorage Data Flow: Persist the todo before DOM manipulation
  // Save to localStorage first to ensure data persistence even if DOM operations fail
  saveLocalTodos("Yes");

  // Apply styling class and attach to container
  newTodo.classList.add("todo-item");  // CSS class for todo text styling
  todoDiv.appendChild(newTodo);  // Attach text element to container

  // Clear input field for next todo entry
  todoInput.value = "";  // Reset form state for better UX

  // DOM Element Creation: Build interactive buttons
  // Create completion toggle button with checkmark symbol
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `✓`;  // Unicode checkmark for visual feedback
  completedButton.classList.add("complete-btn");  // CSS class for styling and event handling
  todoDiv.appendChild(completedButton);  // Attach to todo container

  // Create deletion button with X symbol
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `✗`;  // Unicode X for delete action
  trashButton.classList.add("trash-btn");  // CSS class for styling and event targeting
  todoDiv.appendChild(trashButton);  // Attach to todo container

  // DOM Insertion: Add completed todo structure to the page
  // Append the fully constructed todo item to the main todo list container
  todoList.appendChild(todoDiv);  // Makes the todo visible and interactive
}

/**
 * Handles todo item interactions for completion and deletion
 * @param {Event} e - The click event from todo list interactions
 * @description Processes clicks on complete and delete buttons within todo items.
 * For delete buttons: adds fall animation, removes from localStorage, and removes from DOM.
 * For complete buttons: toggles the completed visual state.
 * Dependencies: removeLocalTodos function for localStorage management
 * Side effects: Modifies DOM by removing elements or toggling CSS classes, updates localStorage
 */
function deleteTodo(e) {
  // Event Handling: Get the clicked element from the event target
  const item = e.target;  // The specific button that was clicked

  // User Interaction Processing: Handle delete button clicks
  if (item.classList[0] === "trash-btn") {
    // DOM Navigation: Get the parent todo container element
    const todo = item.parentElement;  // Navigate up to the todo div container

    // Visual Feedback: Add CSS classes for smooth deletion animation
    todo.classList.add("fall");  // Triggers CSS fall animation
    todo.classList.add("completed");  // Adds visual completion state during deletion

    // localStorage Data Flow: Remove from persistent storage before DOM removal
    // Update localStorage first to maintain data consistency
    removeLocalTodos(todo);

    // DOM Manipulation: Set up animated removal from the page
    // Listen for CSS transition completion before removing element
    todo.addEventListener("transitionend", () => {
      todo.remove();  // Remove element from DOM after animation completes
    });
  }

  // User Interaction Processing: Handle completion toggle button clicks
  if (item.classList[0] === "complete-btn") {
    // DOM Navigation: Get the parent todo container element
    const todo = item.parentElement;  // Navigate up to the todo div container

    // Visual State Toggle: Switch between completed and active states
    // Toggle CSS class to show/hide completion styling (strikethrough, opacity)
    todo.classList.toggle("completed");  // Adds or removes completed visual state
  }
}

/**
 * Saves a new todo item to localStorage
 * @param {string} todo - The todo text to be saved
 * @description Retrieves existing todos from localStorage, adds the new todo to the array,
 * and saves the updated array back to localStorage. Creates empty array if no todos exist.
 * Dependencies: localStorage API for data persistence
 * Side effects: Updates localStorage with new todo data
 */
function saveLocalTodos(todo) {
  let todos;

  // localStorage Data Flow: Check if todos already exist in browser storage
  if (localStorage.getItem("todos") === null) {
    // Initialize empty array if no previous todos exist
    todos = [];  // First-time user or cleared storage scenario
  } else {
    // Parse existing JSON string back into JavaScript array
    todos = JSON.parse(localStorage.getItem("todos"));  // Deserialize stored data
  }

  // Array Manipulation: Add new todo to the existing collection
  todos.push(todo);  // Append new todo text to the end of the array

  // localStorage Data Flow: Persist updated array back to browser storage
  // Convert JavaScript array to JSON string for storage compatibility
  localStorage.setItem("todos", JSON.stringify(todos));  // Serialize and save data
}

/**
 * Removes a todo item from localStorage
 * @param {HTMLElement} todo - The todo DOM element to be removed from storage
 * @description Retrieves existing todos from localStorage, finds and removes the matching todo
 * by comparing the text content, then saves the updated array back to localStorage.
 * Dependencies: localStorage API for data persistence
 * Side effects: Updates localStorage by removing the specified todo item
 */
function removeLocalTodos(todo) {
  let todos;

  // localStorage Data Flow: Retrieve current todos from browser storage
  if (localStorage.getItem("todos") === null) {
    // Handle edge case where no todos exist (shouldn't happen during deletion)
    todos = [];  // Initialize empty array as fallback
  } else {
    // Parse existing JSON string back into JavaScript array
    todos = JSON.parse(localStorage.getItem("todos"));  // Deserialize stored data
  }

  // DOM Navigation: Extract todo text from the DOM element structure
  // Access the first child (li element) and get its text content for matching
  const todoIndex = todo.children[0].innerText;  // Get todo text from li element

  // Array Manipulation: Find and remove the matching todo from the array
  // Use indexOf to find the todo text, then splice to remove exactly 1 item
  todos.splice(todos.indexOf(todoIndex), 1);  // Remove matching todo from array

  // localStorage Data Flow: Persist updated array back to browser storage
  // Convert updated JavaScript array to JSON string and save
  localStorage.setItem("todos", JSON.stringify(todos));  // Serialize and save updated data
}

/**
 * Loads and displays all saved todos from localStorage on page load
 * @description Retrieves todos from localStorage and recreates the DOM elements for each todo item.
 * Creates complete todo structure with text, complete button, and delete button for each saved item.
 * Called automatically when the DOM content is loaded.
 * Dependencies: todoInput (for clearing value), todoList (for DOM insertion), localStorage API
 * Side effects: Modifies DOM by adding all saved todo elements, clears input field
 */
function getTodos() {
  let todos;

  // localStorage Data Flow: Retrieve all saved todos from browser storage
  if (localStorage.getItem("todos") === null) {
    // Handle first-time users or cleared storage scenarios
    todos = [];  // Initialize empty array when no saved data exists
  } else {
    // Parse stored JSON string back into JavaScript array
    todos = JSON.parse(localStorage.getItem("todos"));  // Deserialize saved todo data
  }

  // Array Processing: Iterate through each saved todo and recreate DOM elements
  todos.forEach(function (todo) {
    // DOM Element Creation: Build the todo item structure (same as addTodo)
    // Create main container div that will hold all todo components
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");  // Add CSS class for styling and event targeting

    // DOM Element Creation: Create the text element that displays the todo content
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;  // Set saved todo text as content
    newTodo.classList.add("todo-item");  // CSS class for todo text styling
    todoDiv.appendChild(newTodo);  // Attach text element to container

    // Form State Management: Clear input field (defensive programming)
    todoInput.value = "";  // Ensure input is clean after loading todos

    // DOM Element Creation: Build interactive buttons (same structure as addTodo)
    // Create completion toggle button with checkmark symbol
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `✓`;  // Unicode checkmark for visual feedback
    completedButton.classList.add("complete-btn");  // CSS class for styling and event handling
    todoDiv.appendChild(completedButton);  // Attach to todo container

    // Create deletion button with X symbol
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `✗`;  // Unicode X for delete action
    trashButton.classList.add("trash-btn");  // CSS class for styling and event targeting
    todoDiv.appendChild(trashButton);  // Attach to todo container

    // DOM Insertion: Add reconstructed todo structure to the page
    // Append the fully constructed todo item to the main todo list container
    todoList.appendChild(todoDiv);  // Makes the saved todo visible and interactive
  });
}
