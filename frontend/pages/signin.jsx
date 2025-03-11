import Heading from "../components/header"
import SubHeading from "../components/subheading"
import InputBox from "../components/inputbox"
import Button from "../components/button"
import BottomWarning from "../components/buttonwarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [showpopup,setShowpopup] = useState(false);
    const navigate = useNavigate();

    const handlesignin = async () => {
        try {const response = await axios.post("http://localhost:3000/api/vi/user/signin",{
            username,
            password
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
                    <Heading label="Sign in"/>
                    <SubHeading label="Enter your credentials to access your account"/>
                    <InputBox onPress={(e)=>{
                        setUsername(e.target.value);
                    }}  label="Email" placeholder={"Eg:hemanthbangera@gmail.com"}/>
                    <InputBox onPress={(e)=>{
                        setPassword(e.target.value);
                    }}  placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={handlesignin}  label="Sign in"/>
                    </div>
                    <BottomWarning label="Don't have an account?" buttontext="Sign up" to={"/signup"}/>
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