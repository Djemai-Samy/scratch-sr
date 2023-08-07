# Scratch SSR

NOTE: This is just a fun project i'm working on, and should not be used for production !

![Logo of Scratch Frameword](https://djemai-samy.com/projects/personal/scratch/scratch.png)

Scratch is a package designed to simplify the process of rendering React applications using Server-Side Rendering (SSR) and client-side rendering.

With a set of components, hooks, and utilities, Scratch streamlines the implementation of routing, data management, and document head content, providing developers with a seamless way to create dynamic and SEO-friendly applications.

It's better used with Scratch Framework ans scratch-cli for more streamlined experience.

[You can explore the official page for a quick start](https://djemai-samy.com/projects/scratch)

A full documentation will be added soon.

## Why Use Scratch

### Effortless SSR and Client-Side Rendering

Scratch takes the complexity out of both server-side rendering and client-side rendering, offering a unified approach for rendering your React application regardless of the platform.

### Routing

You can use Filebased routing to simplify the creation of your pages.

Or use the React Router Dom by providing routes and their corresponding components, giving you control over the navigation flow of your application.

### Data Management

The you can inject initial data that will be accessible by the props of your Pages Components.

You also can use the hook useData to retrieve and share data across components while ensuring consistent and up-to-date information.

### SEO Optimization

The Head component, based on React Helmet, empowers you to manage document head content such as titles, metadata, and other essential tags to enhance your application's SEO performance.

For server side, the data of helmet is retrieved at the same time as the rendered app.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Hooks](#hooks)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package using npm:

```bash
npm install scratch
```

## Usage

On Server Side: server-entry.js for exemple:

1. Enable File based Routing
2. Prepare data for the route:
   - url: The url or the request ()
   - data: The data to send to the client
3. If it's a client navigation request send the json data
4. Render the application
5. Return html as response with:
   1. headers provided from helmet
   2. The CSS styles if its exists
   3. the client Javascript bundle
   4. An input with the data as json (This is just an exemple, you should secure it)
   5. The element where the app is rendered.

```javascript
// Import the required modules
import http from 'http';
import { renderServer } from "scratch";

// 1. Optional: File-based routing
const context = require.context("path/to/pages", true, /\.jsx$/);

// Define the router function to handle incoming requests
async function router(req, res) {
  // 2. Prepare data to be sent to the client
  const data = {
    url: req.url,
    data: 'Everything you want!'
  };
  const jsonData = JSON.stringify(data);

  // 3. If the request is for JSON data, send JSON response
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(jsonData);
  }

  // 4. Otherwise, render the app for initial page load
  const { headers, render } = await renderServer({ context, data });

  // 5. Build the HTML response
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        ${headers.meta} <!-- 5.1 Headers defined in the app -->
        ${headers.link} <!-- 5.1 Headers defined in the app -->
        ${headers.title} <!-- 5.1 Headers defined in the app -->

        <link rel='stylesheet' href='/your-style.css' /> <!-- 5.3 Update the  stylesheet -->
        <script defer src='/client-entry.js'></script> <!-- 5.4 Update the client entry script -->
        
      </head>
      <body>
         <!-- 5.4 Initial Data -->
        <input type='hidden' id='jsonData' value="${jsonData}" />
        
         <!-- 5.5 Rendered App -->
        <div id="root">${render}</div>
      </body>
    </html>
  `);
}

// Create an HTTP server that listens on port 8080
http.createServer(router).listen(8080);
```

Remember to replace, '/your-style.css', and '/client-entry.js' with the actual paths to your stylesheet, and client entry script. Also, update the comments accordingly.

---

On client side: clent-entry.js for exemple:

```javascript
// Import the required module
import { renderClient } from "scratch";

// Optional: File-based routing
const context = require.context("path/to/pages", true, /\.jsx$/);

// Fetch the JSON data embedded in the HTML
const jsonData = JSON.parse(document.querySelector('#jsonData').value);

// Find the root element in the HTML where the app will be rendered
const rootElement = document.querySelector('#root');

// Render the app on the client side using the fetched data
renderClient({ context, data: jsonData }, { rootElement });
```

---

When using File based Routing, you can create your Main Component using `pages/_app.jsx`:

```javascript
import "../style.css";
import classes from "../App.module.css";
import { Head, Link } from "scratch";

const index = ({ children }) => {

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="description" content="Your description" />
        <title>Your title</title>
      </Head>

      <nav>
        <Link className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
          Home
        </Link>
        <Link
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/random"
        >
          Random
        </Link>
      </nav>

      <main style={{minHeight:"100vh"}}>{children}</main>
    </>
  );
};
export default index;
```

You can now create pages like `pages/index.jsx` and export a default functional Component:

```javascript
const index = (initialProps) => {

  return (
    <div>
      <h1>{initialProps.data}<h1>
    </div>
  );
};
export default index;
```

## Components

### Link

The `Link` component is a wrapper around React Router's NavLink. It simplifies navigation between routes within your application.

### Head

The Head component is a wrapper for React Helmet, helping you manage document head content such as titles and metadata.

---

## Hooks

### useData

The `useData` hook provides a convenient way to access data from the `DataContext`.

It simplifies data retrieval and is particularly useful when handling data that needs to be shared across components.

---

---

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
