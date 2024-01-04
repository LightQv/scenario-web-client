import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CustomRouter from "./components/routes/CustomRouter";
import customHistory from "./services/history";
import "./services/i18n.js";
import { MovieGenres } from "./contexts/GenresContext.jsx";
import { AppTheme } from "./contexts/ThemeContext.jsx";
import { AuthHandler } from "./contexts/UserContext.jsx";
import { UserViews } from "./contexts/ViewContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomRouter history={customHistory}>
      <AppTheme>
        <AuthHandler>
          <MovieGenres>
            <UserViews>
              <App />
            </UserViews>
          </MovieGenres>
        </AuthHandler>
      </AppTheme>
    </CustomRouter>
  </React.StrictMode>
);
