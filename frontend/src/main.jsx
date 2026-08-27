import React from "react";
import ReactDOM from "react-dom/client";
// HashRouter (not BrowserRouter) because GitHub Pages has no server to
// fall back to index.html for routes like /rooms or /admin — it can
// only serve files that actually exist. Hash-based URLs (e.g.
// #/rooms) never hit the server for routing, so they always work.
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./styles/main.css";
import "./styles/responsive.css";
import "./styles/auth.css";
import "./styles/admin.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
