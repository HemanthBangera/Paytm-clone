import {Link} from "react-router-dom"

export default function BottomWarning({label,buttontext,to}){
    return (
        <div className="flex justify-center py-2 text-sm ">
            <div>
                {label}
            </div>
            <Link to={to} className="underline pl-1 cursor-pointer">
            {buttontext}
            </Link>

        </div>
    )
}