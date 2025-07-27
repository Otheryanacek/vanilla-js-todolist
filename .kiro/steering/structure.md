# Project Structure

## File Organization
```
/
├── index.html          # Main HTML file - application entry point
├── style.css           # All CSS styles and responsive design
├── app.js              # JavaScript logic and DOM manipulation
├── README.md           # Project documentation
├── LICENSE             # GPL v3 license file
└── .git/               # Git version control
```

## Architecture Pattern
- **Single Page Application (SPA)**: All functionality in one HTML page
- **Separation of Concerns**: HTML structure, CSS presentation, JS behavior
- **Event-Driven**: User interactions trigger JavaScript functions
- **Client-Side Storage**: localStorage for data persistence

## Code Organization

### HTML Structure (`index.html`)
- Semantic HTML5 elements
- Single form for todo input
- Container for dynamic todo list
- External resource links (fonts, CSS, JS)

### CSS Architecture (`style.css`)
- Global reset and base styles
- Component-based styling (header, form, todo items)
- Responsive design with flexbox
- CSS transitions for smooth animations
- Color scheme with gradient backgrounds

### JavaScript Structure (`app.js`)
- DOM element references at top
- Event listeners setup
- Core functions: `addTodo()`, `deleteTodo()`, `getTodos()`
- localStorage functions: `saveLocalTodos()`, `removeLocalTodos()`
- No classes or modules - functional approach

## Naming Conventions
- **CSS Classes**: kebab-case (`.todo-input`, `.complete-btn`)
- **JavaScript Variables**: camelCase (`todoInput`, `todoButton`)
- **Functions**: camelCase with descriptive names
- **Files**: lowercase with hyphens where appropriate

## Key Components
- **Todo Item**: Dynamically created div with text, complete, and delete buttons
- **Form**: Input field and submit button for adding todos
- **Local Storage**: JSON array of todo strings for persistence