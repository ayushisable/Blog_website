import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { use } from "react";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          // console.log("--------login",userData);
          dispatch(login({ userData }));
        } else {
          // console.log("--------logout",userData);
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error); // Log the error
        //dispatch(logout()); // Or handle the error differently, maybe show a message
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen bg-gray-400 border-8">
      <div className="w-full block ">
        <Header />
        <main className="text-2xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;