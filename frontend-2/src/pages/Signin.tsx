import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signin(){
    const [email,setEmail]=useState<string>(" ");
    const [passwd,setPasswd]=useState<string>(" ");
    const navigate=useNavigate();


    return(

        <div className="bg-red-100 min-h-screen bg- flex flex-col justify-center py-12  px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Signin To Your Account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                    {"Or "}
                    <Link to={"/signup"}
                        className="font-medium text-blue-500 hover:text-blue-500 ">
                        {"Create a New Account"}
                    </Link>
                </p>
            </div>


            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="email" className=" flex justify-start">Email</label>
                        <Input type="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    
                    <div className="grid w-full max-w-sm items-center gap-1.5 py-5  ">
                        <label htmlFor="email" className=" flex justify-start">Password</label>
                        <Input type="email" id="email" placeholder="Password" onChange={(e)=>setPasswd(e.target.value)}/>
                    </div>

                    <Button onClick={async()=>{
                        try{
                            const res=await axios.post(`${BACKEND_URL}/api/user/login`,{
                                email,
                                password:passwd

                            })
                            console.log(res.data.token);
                            if(!res.data.success)
                            {
                                alert("user not found")
                            }
                            else{
                                localStorage.setItem("usertoken",res.data.token);
                                console.log(localStorage.getItem("token"))
                          
                            navigate("/home");
                            }
                            //@ts-ignore
                            
                        }
                        catch{
                            window.alert("error");
                        }

                    }}>Sign In</Button>
                </div>
            </div>
        </div>

    )

}