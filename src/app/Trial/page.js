"use client";
import React from "react";
import { useState } from "react";
import Navbar from "../navbar/page.js";
import { companyOptions } from "./page.js";
import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";

const Trial = () => {
  const [status, setStatus] = useState("");
  const [dateIssued, setDateIssued] = useState("");
  const statusOptions = ["On It", "On Hold", "Done"];

  const generateCertificate = (e) => {
    e.preventDefault();

    const url = "http://localhost:2000/generate-pdf";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: companyName,
        dateIssued: dateIssued,
        expirationDate: expirationDate,
        vehicleMonitored: vehicle,
      }),
    })
      .then((response) => response.blob())
      .then((pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };
  const handleChange = (e) => {
    setAuthenticationCode(e.target.value.trim());

    console.log(authenticationCode);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(formData);
  };
  return (
    <>
      <div>
        <Navbar />
        {/* <div className="min-h-screen flex items-center justify-center bg-blue-100"> */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-100">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> 
          <form className="flex flex-col justify-between w-1/2 h-1/4">
            {/* <form className="space-y-6" action="#" method="POST"> */}

            <div className="mb-4">
              <label className="flex flex-row justify-between">
                Date Issued
                <input
                  type="date"
                  value={dateIssued}
                  onChange={(e) => setDateIssued(e.target.value)}
                  className=" bg-blue-300 color-black p-2 font-medium cursor-pointer w-1/2 h-1/4"
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="technician" className="text-gray-700">
                Technician:
              </label>
              <input
                type="text"
                id="technician"
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="supervisor" className="text-gray-700">
                Supervisor:
              </label>
              <input
                // type="password"
                id="supervisor"
                name="supervisor"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="technician" className="text-gray-700">
                Type:
              </label>
              <input
                type="text"
                id="technician"
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="technician" className="text-gray-700">
                Stock:
              </label>
              <input
                type="text"
                id="technician"
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mb-4">
              <label className="flex flex-row justify-between ">
                status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-1/2 h-1/4 bg-blue-300 color-black p-2 font-medium cursor-pointer"
                >
                  {statusOptions.map((option) => (
                    <option
                      value={option}
                      key={option}
                      className="w-1/2 h-1/4 bg-white text-black"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="w-1/2 h-1/4 text-black bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mb-5
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          justify-between items-center"
              onClick={generateCertificate}
            >
              Add New Entity
            </button>
            {/* <div>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded
         hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={verification}
              >
                {isLoading ? <CircularProgress /> : "VERIFY"}
              </button>
            </div>
            <div className="bg-red-100 text-red-600">{error}</div>
          </form> */}
          </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Trial;

{
  /* // "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import Navbar from "../app/Navbar/page";
// import Footer from "../app/Footer/page";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import CircularProgress from "@mui/material";



// const Verification = () => { */
}
{
  /* //   const router = useRouter();
//   const [authenticationCode, setAuthenticationCode] = useState("");
//   const [certificate, setCertificate] = useState({});
//   const [status, setStatus] = useState("");
//   const [expiryDate, setExpiryDate] = useState("") 
//   const [error, setError] = useState("")
//   const [isLoading, setLoading] = useState(false);
  
//   const handleButtonClick = () => { */
}
{
  /* //     router.push("/VerificationForm");
//   };
//   const handleChange = (e) => { */
}
{
  /* //     setAuthenticationCode(e.target.value.trim());

//     // console.log(authenticationCode);
//     // setFormData({ */
}
{
  /* //     //   ...formData,
//     //   [e.target.name]: e.target.value.trim(),
//     // });
//     // console.log(formData)
//   };

//   let verification = async (e) => {

//     try {

//     if (authenticationCode == ""){
//       setError("Please provide Authentication Code")
//     }

//       e.preventDefault();
//       let verificationResponse = await axios.get(
//         `https://api.fanset.net/analytics/certificate/${authenticationCode}`,
//         { timeout: 5000 }
        
//       );
//       if (verificationResponse.data) {
//         setLoading(false);
//       }
//       // console.log(verificationResponse.response)
//       if (certificate != null) {
//         router.push(
//           `/VerificationForm?status=${verificationResponse.data[0].status}&issueDate=${verificationResponse.data[0].dateIssued}&expiryDate=${verificationResponse.data[0].dateExpired}&companyName=${verificationResponse.data[0].companyName}`
          
//         );
//         return;
//       }
//       // if()
//         // else if(certificate = null){
//         //   alert("certificate does not exit");
//         // }
//       //  else {
//       // }
//     } catch (error) {
//       // console.log(error.response.data.message);
//       setError (error.message)
//     }
   
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             CERTIFICATE VERIFICATION
//           </h2>
//         </div>
//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6" action="#" method="POST">
//             <div className="mb-4">
//               <label htmlFor="companyName" className="text-gray-700">
//                 Company Name:
//               </label>
//               <input
//                 type="text"
//                 id="companyName"
//                 className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
//               ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
//                focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="authenticationCode" className="text-gray-700">
//                 Authentication Code:
//               </label>
//               <input
//                 // type="password"
//                 id="authenticationCode"
//                 name="authenticationCode"
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>

//             <div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded
//          hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                 onClick={verification}
//               >
//                 {isLoading ? <CircularProgress /> : "VERIFY"}
//               </button>
//             </div>
//             <div className="bg-red-100 text-red-600">{error}</div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Verification;
 */
}
