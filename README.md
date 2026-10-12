# Weather Dashboard App 

A clean, lightweight, and fully responsive weather dashboard web application built with vanilla JavaScript. It fetches live, real-time weather data for any city worldwide using the public Open-Meteo API—requiring **no API keys or sign-ups**.

---

## Features

- **Live City Search:** Search for any city worldwide and instantly retrieve up-to-date weather metrics.
- **Dynamic Weather Display:** Shows the current temperature, weather description, visual weather emoji icon, humidity, and wind speed.
- **Loading State:** Displays a clear loading indicator while network requests are in progress.
- **Robust Error Handling:** Wraps fetch requests in `try/catch` blocks and provides user-friendly error messages for invalid city names or network failures (preventing uncaught console exceptions).
- **No API Key Required:** Runs completely out-of-the-box using public Open-Meteo geocoding and forecast endpoints.
- **Fully Responsive Design:** Clean layout optimized for both mobile smartphones and desktop screens.

---

## Tech Stack

- **HTML5** (Semantic markup)
- **CSS3** (Flexbox, custom styling, responsive layout)
- **JavaScript (ES6+)** (`async/await`, Fetch API, DOM manipulation)
- **APIs:** Open-Meteo Geocoding & Forecast APIs

---

## Project Structure

```text
weather-dashboard/
├── index.html        # Main HTML structure and UI layout
├── style.css         # Styling, layout, and responsive media adjustments
├── script.js         # Asynchronous fetch logic, error handling, and DOM rendering
├── .gitignore        # Specifies untracked files to ignore
├── image.png         # screenshot
└── README.md         # Project documentation and setup instructions
