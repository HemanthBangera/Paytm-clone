import Appbar from "../components/appbar"
import {Balance} from "../components/balance"
import {User} from "../components/User"
import { useEffect,useState } from "react"
import axios from "axios"
export const Dashboard = () => {
    const [balance, setBalance] = useState("Loading...");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:3000/api/vi/account/balance", {
                    headers: { Authorization: "Bearer "+token }
                });

                setBalance(response.data.balance);

            } catch (error) {
                console.error("Failed to fetch balance:", error);
                setBalance("Error fetching balance");
            }
        };

        fetchBalance();
    }, []);

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={isNaN(balance) ? balance : balance.toFixed(3)} />
            <User />
        </div>
    </div>
}