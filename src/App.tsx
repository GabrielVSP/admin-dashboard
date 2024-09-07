import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import Home from "./pages/home/home";
import Tasks from "./pages/tasks/tasks";
import Users from "./pages/users/users";
import { db } from "./firebase/firebase";
import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Plus, PlusCircle, X } from "lucide-react";

export default function App() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [company, setCompany] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [error, setError] = useState<string>()

  const user = useUser()
  const userPrimaryEmail = user.user?.primaryEmailAddress?.emailAddress

  const companies = collection(db, 'company')

  async function checkCompany() {

    try {

      if (userPrimaryEmail) {

        const queryObj = query(companies, where('user', '==', userPrimaryEmail))

        const querySnapshot = await getDocs(queryObj);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data().name);
          setCompany(doc.data().name)
        });

      }

    } catch (e) {

      return new Error('Impossible to fetch Firestore');

    }

  }

  checkCompany()
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (companyName === '' || companyName === null) setError('Name cannot be null')
    if (companyName.length > 45 || companyName.length < 1) setError('Name must contain 1-45 characters')

      const docRef = await addDoc(companies, {
        id: crypto.randomUUID(),
        name: companyName,
        user: userPrimaryEmail,
        created_at: serverTimestamp()  
    });

  }

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

        {isModalOpen &&

          <div className="absolute w-full h-screen flex justify-center items-center bg-[#000000ad]">

            <div className="p-3 w-1/4 bg-white flex justify-center flex-col rounded-md">

              <div className="flex justify-between items-center p-2 w-full">
                <h2 className="font-bold text-xl">Create company</h2>
                <Button variant='default' size='icon' onClick={toggleModal}><X size={20} /></Button>
              </div>

              <form method="post" className="w-full flex flex-col items-center mt-3" onSubmit={handleSubmit}>

                <div className="flex flex-col w-3/4 mb-2">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" placeholder="Company name" maxLength={45} required className="border border-gray-500 rounded-sm p-1 w-full" onChange={(e) => setCompanyName(e.target.value)}/>
                  {error &&
                    <p className="my-1 text-red-400">{error}</p>
                  }
                </div>

                <Button><input type="submit" value="Create" /></Button>

              </form>

            </div>

          </div>

        }

        <Router>

          <header className="w-full p-3 flex justify-between items-center shadow-sm">

            <h2 className="font-semibold text-lg">DASHBOARD - {company}</h2>

            <nav className="flex items-center justify-around">

              <div className="flex items-center p-1">

                {company !== '' ?

                  <>
                    <Link to='/' className="p-1">Home</Link>
                    <Link to='/users' className="p-1">Users</Link>
                    <Link to='/tasks' className="p-1">Tasks</Link>
                  </>

                  :
                  <>
                    <Button className="p-'" onClick={toggleModal}><PlusCircle className="p-1" /> Create company</Button>
                  </>
                }


              </div>

              <UserButton />

            </nav>

          </header>


          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/tasks' element={<Tasks />} />

          </Routes>

        </Router>

      </SignedIn>

    </>

  );
}