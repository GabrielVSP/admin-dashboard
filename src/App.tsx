import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/home/home";
import Tasks from "./pages/tasks/tasks";

export default function App() {

  return (
    <>

      <SignedOut>

        <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-500">

          <div className="bg-white p-5 flex flex-col items-center rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-5">New to our services?</h2>
            <button className="p-1 bg-black text-white text-lg rounded-md hover:px-2 duration-300">
              <SignInButton />
            </button>
            <aside className="mt-5 text-gray-500 text-sm">You will be redirect to a third party site.</aside>
          </div>

        </main>

      </SignedOut>

      <SignedIn>

        <Router>

          <header className="w-full p-3 flex justify-between items-center shadow-sm">

            <h2 className="font-semibold text-lg">DASHBOARD</h2>

            <nav className="flex items-center justify-around">

              <div className="flex items-center p-1">
                <Link to='/' className="p-1">Home</Link>
                <Link to='/tasks' className="p-1">Tasks</Link>
              </div>

              <UserButton />

            </nav>

          </header>
          

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/tasks' element={<Tasks />} />

          </Routes>

        </Router>

      </SignedIn>

    </>

  );
}