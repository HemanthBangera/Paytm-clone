import {useState} from "react"
import Button from "./button";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const User = () => {
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/vi/user/bulk?filter="+filter)
        .then(response => {
            setUsers(response.data.user)
        })
    },[filter])

    return (
        <>
            <div className="my-2">Users</div>
            <div>
                <input type="text" onChange={(e)=>{setFilter(e.target.value)}} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map(user => <Userinfo user={user}/>)}
            </div>
        </>
    )
}

function Userinfo({user}){
    const navigate = useNavigate();
    return (<div className="flex justify-between mt-2">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={()=>{
                navigate("/sendmoney?id="+user._id+"&name="+user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>)
}