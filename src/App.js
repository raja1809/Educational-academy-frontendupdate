import { BrowserRouter, Route, Routes } from "react-router-dom";
import job from './assets/shanka1.jpg';
import NavBar from "./components/NavBar";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const imageStyle = {
  display: 'block', // Ensures the image has its own line
  margin: 'auto', // Sets the margin to 'auto' on all sides, centering it
  width:'50%',
  height: '50%'

};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/" element={
          <div>
            <NavBar/>
            
            <img src={job} alt="Company Logo" style={imageStyle} />
          </div>
          
        }/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
