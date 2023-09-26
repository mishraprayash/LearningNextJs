import {getDataFromToken} from "@/helpers/getDatafromToken"
export default function UserProfile({params}: any){

    return (
        <div className="flex flex-col  items-center justify-center min-h-screen py-2">
            <h1 className="text-black text-2xl mb-5">Profile</h1>
            <hr />
            <p className="text-white font-bold bg-black rounded px-1 py-2">Profile
            <span className="bg-orange-500  text-black ml-1 px-1 rounded"> {params.id}</span>
            </p>
            
        </div>
    )
}