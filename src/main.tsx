import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import  QueryProvider  from "./lib/React-Query/QueryProvider";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <QueryProvider>
    <AuthProvider>
     <App />
    </AuthProvider>

    </QueryProvider>
    
   
    </BrowserRouter>

)