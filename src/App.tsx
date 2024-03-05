import './App.css'
import AppBar from "./components/AppBar";
import {Route, Routes} from "react-router-dom";
import AddContact from "./components/AddContact";
import Contacts from "./components/Contacts";


function App() {

  return (
    <>
        <header>
            <AppBar/>
        </header>
        <main>
            <Routes>
                <Route path='/' element={<Contacts/>}/>
                <Route path='new-contact' element={<AddContact/>}/>
                <Route path='/contacts/:id/edit' element={<AddContact/>}/>
            </Routes>
        </main>
    </>
  )
}

export default App
