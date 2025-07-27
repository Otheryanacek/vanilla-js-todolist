# Technology Stack

## Core Technologies
- **HTML5**: Semantic markup for application structure
- **CSS3**: Styling with modern features (flexbox, gradients, transitions)
- **Vanilla JavaScript (ES6+)**: Core application logic without frameworks

## Browser APIs Used
- **localStorage**: For persistent todo storage across sessions
- **DOM API**: Direct DOM manipulation for dynamic content
- **Event API**: Event listeners for user interactions

## External Dependencies
- **Google Fonts**: Roboto font family for typography
- No JavaScript frameworks or libraries - pure vanilla implementation

## Development Approach
- No build system required - direct file serving
- No package manager dependencies
- No compilation or transpilation needed
- Static file hosting compatible

## Common Commands
Since this is a static web application with no build process:

### Local Development
```bash
# Simply open index.html in a web browser
# Or serve via local HTTP server:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Deployment
```bash
# Deploy to GitHub Pages or any static hosting
# No build step required - upload files directly
```

## Browser Compatibility
- Modern browsers supporting ES6+ features
- localStorage API support required
- CSS3 features (flexbox, gradients, transitions)