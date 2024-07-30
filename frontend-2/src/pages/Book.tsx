import { SetStateAction, useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../shadcn/ui/dialog"
import { Spinner } from "../components/Spinner";
import { flushSync } from "react-dom";
import { Label } from "../shadcn/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { Calendar } from "../shadcn/ui/calendar";
import { RadioGroup, RadioGroupItem } from "../shadcn/ui/radio-group";

import {DatePicker} from "react-date-picker"


type detail = {
  date: string,
  slot: string,
  price: number,
  available: boolean,
  id: number,
  turfid: number,
  area: string,
  city: string,
  images:string[],
  sports:string[]
  turfName:string,
  state:string
}[];

type turfDetails = {
  turfName: string,
  images: string,
  
  state: string,
  
  sports: [],
};


// export const Book = () => {
//   const [search] = useSearchParams();
//   const [flag, setFlag] = useState(false);
//   const [details, setDetails] = useState<detail>([]);
//   const [turfDetails, setTurfDetails] = useState<turfDetails>();
//   const [date, setDate] = useState<string>("");
//   const [slot, setSlot] = useState<string>("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [availabitility, setAvailability] = useState(false);

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const handleOptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleSubmit = async () => {
//     console.log("Called");

//     if (selectedOption === "cash" || selectedOption === "") {
//       openDialog();
//     } else {
//       try {
//         const check1 = await handlecheck(); // Await the asynchronous function handlecheck
//         console.log("availabitility:", availabitility);

//           const response = await axios.post(`${BACKEND_URL}/api/user/payment`, {
//             turfName: details[0]?.turfName,
//             area: details[0]?.area,
//             state: details[0]?.state,
//             city: details[0]?.city,
//             date: date,
//             slot: slot,
//             mode: selectedOption
//           }, {
//             headers: {
//               Authorization: localStorage.getItem("usertoken")
//             }
//           });

//           console.log(response.data);
//           window.location = response.data.url;
//       } catch (error) {
//         console.error("Error during the post request:", error);
//       }
//     }
//   };

//   const closeDialog = () => {
//     setIsOpen(false);
//   };

//   const handlecheck = async () => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/user/book`, {
//         turfId: search.get("id"),
//         slot,
//         date
//       }, {
//         headers: {
//           Authorization: localStorage.getItem("usertoken")
//         }
//       });

//       if (res.data.success === true) {
//         console.log("HI");

//       flushSync(() => {
//       setAvailability(true);
// });
       
//         console.log("availbefore:", availabitility);
      
//         closeDialog();

//       } else {
//         setAvailability(false);
//         alert("error");
//       }
//     } catch (error) {
//       console.error("Error during the booking request:", error);
//       setAvailability(false);
//     }
//   };

//   useEffect(() => {
//     console.log(search.get("id"));
//     axios.get(`${BACKEND_URL}/api/turfdetails/getslot?id=${search.get("id")}`, {
//       headers: {
//         Authorization: localStorage.getItem("usertoken"),
//       }
//     }).then((data) => {
//       console.log(data.data);
  
//       setDetails(data.data);
//       setFlag(true);
//     });
//   }, [search]);

//   if (!flag) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Spinner />
//       </div>
//     );
//   }

//   if(details.length==0)
//   {
//     return(
//         <>
//             <NavBar val="turfs" />

//             < div className="w-full text-white mt-48">
//                 No slots available
//             </div>
//         </>
        

//     )
//   }
//     return (
//         <>
//             <NavBar val="turfs" />
//             <div className="max-w-4xl mx-auto mt-24 p-5 bg-white shadow-lg rounded-lg  border-4 border-violet-400 ">
//               <h1>{details[0].turfName}</h1>
//         <img src={details[0]?.images[0]} alt="Turf Image" className="w-full h-64 object-cover rounded-lg" />
       
//           <div className="mt-6 space-y-4">
//             <label  className="block text-sm font-medium text-gray-700 ">Select Date</label>
//             <input type="date" onChange={(e)=>{console.log(e.target.value);setDate(e.target.value)}} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//           </div>
//           <div className="mt-6">
//             <label htmlFor="slot" className="block text-sm font-medium text-gray-700">Select Slot</label>
          
//             <select id="slot" name="slot" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             onChange={(e)=>{
//               console.log(e.target.value)
//               setSlot(e.target.value)
//             }}
//             >
//               <option>Click</option>
//               {details.map((x)=><option>{x.slot}</option>)}
//             </select>
//           </div>
//           <div>
//               <h1>Select an Option</h1>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       key="option1"
//                       value="cash"
//                       checked={selectedOption === 'cash'}
//                       onChange={handleOptionChange}
//                       name="options"
//                     />
//                     Cash
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       key="option2"
//                       value="card"
//                       checked={selectedOption === 'card'}
//                       onChange={handleOptionChange}
//                       name="options"
//                     />
//                     Card
//                   </label>
//                 </div>
//             </div>
//           <div>
           
//           <div>
//               <Button className=" mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={handleSubmit}>Book Now</Button>

//               <Dialog open={isOpen} >
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Confirm Booking</DialogTitle>
//                   </DialogHeader>
//                   <DialogDescription>
//                     Are You Sure?.
//                   </DialogDescription>
//                   <DialogFooter className="flex justify-between">
//                   <Button onClick={closeDialog}>Close</Button>
//                   <Button onClick={handlecheck}>Confirm</Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           <Button className="mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={()=>{navigate("/turfs")}} >Back</Button>
//         </div>
//       </div>

    
        
//         </>
        
//     )
// }



//  */
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export  function Book() {
  const [search] = useSearchParams();
  const [flag, setFlag] = useState(false);
  const [details, setDetails] = useState<detail>([]);

  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [availabitility, setAvailability] = useState(false);
  




  const openDialog = () => {
    setIsOpen(true);
  };

  const handleOptionChange = (val:string) => {
    setSelectedOption(val);
    console.log(val)
  };

  const handleSubmit = async () => {
    console.log("Called");

    if (selectedOption === "cash" || selectedOption === "") {
      openDialog();
    } else {
      try {
        const check1 = await handlecheckcard(); // Await the asynchronous function handlecheck
        console.log("availabitility:", availabitility);
          const response = await axios.post(`${BACKEND_URL}/api/user/payment`, {
            turfName: details[0]?.turfName,
            area: details[0]?.area,
            state: details[0]?.state,
            city: details[0]?.city,
            date: date,
            slot: slot,
            mode: selectedOption
          }, {
            headers: {
              Authorization: localStorage.getItem("usertoken")
            }
          });

          console.log(response.data);
          window.location = response.data.url;
      } catch (error) {
        console.error("Error during the post request:", error);
      }
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  const handlecheckcard = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/book`, {
        turfId: search.get("id"),
        slot,
        date,
        card:"card",
      }, {
        headers: {
          Authorization: localStorage.getItem("usertoken")
        }
      });

      if (res.data.success === true) {
        console.log("HI");

      flushSync(() => {
      setAvailability(true);
});
       
        console.log("availbefore:", availabitility);
      
        closeDialog();

      } else {
        setAvailability(false);
        alert("error");
      }
    } catch (error) {
      console.error("Error during the booking request:", error);
      setAvailability(false);
    }
  };




  const handlecheck = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/book`, {
        turfId: search.get("id"),
        slot,
        date
      }, {
        headers: {
          Authorization: localStorage.getItem("usertoken")
        }
      });

      if (res.data.success === true) {
        console.log("HI");

      flushSync(() => {
      setAvailability(true);
});
       
        console.log("availbefore:", availabitility);
      
        closeDialog();

      } else {
        setAvailability(false);
        alert("error");
      }
    } catch (error) {
      console.error("Error during the booking request:", error);
      setAvailability(false);
    }
  };

  useEffect(() => {
    console.log(search.get("id"));
    axios.get(`${BACKEND_URL}/api/turfdetails/getslot?id=${search.get("id")}`, {
      headers: {
        Authorization: localStorage.getItem("usertoken"),
      }
    }).then((data) => {
      console.log(data.data);
  
      setDetails(data.data);
      setFlag(true);
    });
  }, [search]);

  if (!flag) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  if(details.length==0)
  {
    return(
        <>
            <NavBar val="turfs" />

            < div className="w-full text-white mt-48">
                No slots available
            </div>
        </>
        

    )
  }
  return (
    <>
    <NavBar val="turfs" />
    <div className="flex flex-col min-h-dvh mt-20 bg-red-700">
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <img
          src={details[0].images[0]}
          alt="Turf"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{details[0].turfName}</h1>
          <p className="max-w-[600px] text-lg md:text-xl lg:text-2xl mt-4 text-center">
            Experience the best playing surface for your next event or match. Book your slot now.
          </p>
        </div> */}
      </section>
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col items-start">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{details[0].turfName}</h2>
              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mt-4">
                Our premium turf is designed for the ultimate playing experience. With a soft, even surface and superior
                drainage, you'll enjoy a smooth and consistent game every time.
              </p>
              <ul className="mt-6 space-y-4 text-lg md:text-xl lg:text-2xl">
                <li className="flex items-center space-x-3">
                  <DotIcon className="w-6 h-6 text-primary" />
                  <span>{`${details[0].area},${details[0].city},${details[0].state}`}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <DotIcon className="w-6 h-6 text-primary" />
                  <span>Expertly maintained and groomed</span>
                </li>
                <li className="flex items-center space-x-3">
                  <DotIcon className="w-6 h-6 text-primary" />
                  <span>Suitable for all skill levels</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-xl shadow-lg p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Book Your Slot</h3>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <input type="date" onChange={(e)=>{console.log(e.target.value);setDate(e.target.value)}} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                  </div>
                  <div>
                    <Label htmlFor="time">Time Slot</Label>
                    <Select onValueChange={(val)=>{setSlot(val);console.log(val)}}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {details.map((val)=>{
                          return <SelectItem value={val.slot} >{val.slot}</SelectItem>

                        })}

                       
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="payment">Payment Method</Label>
                  <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="card" id="card" className="peer sr-only" onClick={(e)=>handleOptionChange("card")}/>
                      <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCardIcon className="mb-3 h-6 w-6" />
                        Card
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="cash" id="cash" className="peer sr-only" onClick={(e)=>handleOptionChange("cash")}/>
                      <Label
                        htmlFor="cash"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <DollarSignIcon className="mb-3 h-6 w-6" />
                        Cash
                      </Label>
                    </div>
                  </RadioGroup>



                </div>
                <Button className=" mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={handleSubmit}>Book Now</Button>
                   
               <Dialog open={isOpen} >
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>Confirm Booking</DialogTitle>
                  </DialogHeader>
                   <DialogDescription>
                    Are You Sure?.
                 </DialogDescription>
                 <DialogFooter className="flex justify-between">
                 <Button onClick={closeDialog}>Close</Button>
                 <Button onClick={handlecheck}>Confirm</Button>
               </DialogFooter>
                 </DialogContent>
               </Dialog>
              
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
    </>
  )
}

//@ts-ignore

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
//@ts-ignore

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
//@ts-ignore

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
//@ts-ignore

function DotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
  )
}
//@ts-ignore

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}






