import Heading from "../components/header"
import SubHeading from "../components/subheading"
import InputBox from "../components/inputbox"
import Button from "../components/button"
import BottomWarning from "../components/buttonwarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {
    const [firstname,setfirstname] = useState("");
    const [lastname,setlastname] = useState("");
    const [password,setpassword] = useState("");
    const [username,setusername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showpopup,setShowpopup] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;


    const handleSignup = async ()=>{
        try {const response = await axios.post(`${API_URL}/api/vi/user/signup`,{
            username,
            firstname,
            lastname,
            password,
        })
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");
    }
        catch(error){
            setErrorMessage(error.response?.data?.message || "Something went wrong")
            setShowpopup(true);
        }
    }
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign up"/>
                    <SubHeading  label="Enter your information to create an account"/>
                    <InputBox onPress = {(e) =>{
                        setfirstname(e.target.value)
                    }}
                    label="First Name" placeholder="Eg:Hemanth"/>
                    <InputBox onPress = {(e) =>{
                        setlastname(e.target.value)
                    }}
                    label="Last Name" placeholder="Eg:Bangera"/>
                    <InputBox onPress = {(e) =>{
                        setusername(e.target.value)
                    }}
                    label="Email" placeholder={"Eg:hemanthbangera@gmail.com"}/>
                    <InputBox onPress = {(e) =>{
                        setpassword(e.target.value)
                    }}
                    placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={handleSignup} 
                        label="Sign up"/>
                    </div>
                    <BottomWarning label="Already have an account?" buttontext="Sign in" to={"/signin"}/>
                </div>
            </div>
            {showpopup && (
                <div className="absolute top-1/13 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border border-gray-300 w-72 text-center">
                        <p className="text-red-500">{errorMessage}</p>
                        <button onClick={() => setShowpopup(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Close
                        </button>
                </div>
            )}
        </div>
    )
}