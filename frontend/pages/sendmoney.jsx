import { useSearchParams } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchparam] = useSearchParams();
    const name = searchparam.get("name");
    const id = searchparam.get("id");
    const [amount,setAmount] = useState(0);
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const handletransaction = async ()=>{
        try {const response = await axios.post(`${API_URL}/api/vi/account/transfer`,
            {
                to: id,
                amount: amount
            },{
                headers:{
                    Authorization : "Bearer "+localStorage.getItem("token"),
                }
            }
        )
        setMessage(response.data.message);
        setIsError(false);
        setTimeout(() => setMessage(null), 3000);
        }
        catch(error){
            const errorMessage = error.response?.data?.message || "Transaction failed";
            setMessage(errorMessage);
            setIsError(true);

            setTimeout(() => setMessage(null), 3000);
        }
    }

    return <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div classNameName="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button
                        onClick={handletransaction}    
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-500 text-white">
                        Back to Home
                     </button>
                </div>
                </div>
        </div>
      </div>
      {message && (
                <div className={`top-1/20 fixed p-4 rounded-lg shadow-lg ${isError ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                    {message}
                </div>
            )}
    </div>
}