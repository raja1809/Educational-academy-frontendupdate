import { useEffect, useState } from "react"
import { UserDetailsApi } from "../Services/Api";
import NavBar from "../components/NavBar";
import { isAuthenticated, logout } from "../Services/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import App from "../dashboard/App";



export default function DashboardPage() {
    const navigate= useNavigate();

    const [user,setUser]=useState({name:"",email:"",localId:""});
    useEffect(()=>{ 
        if(isAuthenticated()){
            UserDetailsApi().then((response) => {
                setUser({name:response.data.users[0].displayName,
                    email:response.data.users[0].email,
                    localId:response.data.users[0].localId})
              }).catch((error) => {
                console.error('Error:', error);
              });
        }
        
          
    },[])
    
    const logoutUser =()=>{
        logout();
        navigate("/login");
    }
    
    if(!isAuthenticated()){
        //redirect to dashboard
        return <Navigate to="/login"/>
      }
      
    
    return(
        <div>
        <NavBar logoutUser={logoutUser}/>
        <main role="main" className="container mt-5">
            <div >
              <div className="text-center mt-5">
                <h3>Dashboard page</h3>
                { user.name && user.email && user.localId ?
                    (<div>
                        

                        <p className="text-bold " style={{ fontSize: '1.5em' , text:'Bold'}}  >Hi Shanka User 🙋‍♂️</p>
                        <App/>
                    </div>):<p> Loading...</p>
                }
              </div>
            </div>
        </main>
        </div>
    )
}