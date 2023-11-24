'use client'
import React from 'react'
import {useForm} from 'react-hook-form'

const Login = () => {
    const{
        handleSubmit,
        register,
        
        formState:{error},
    }=useForm();
    const submitHandler =()=>{
        window.alert('Login Successful')
    }
    const handleButtonClick = () => {
        router.push("/users");
      };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 rounded-lg overflow-hidden">
        <div className="relative w-[380px] h-[420px] bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute w-[380px] h-[420px] bg-gradient-to-r
         from-blue-500 via-blue-500 to transparent top-[50%] left-[50%] animate-spin-slow origin-bottom-right">
        </div>
        <div className="absolute w-[380px] h-[420px] bg-gradient-to-r
         from-blue-500 via-blue-500 to transparent top-[50%] left-[50%] animate-spin-delay origin-bottom-right">
        </div>
       
        <div className=" absolute inset-1 bg-gray-800 rounded-lg  z-10 p-5">
            <form onSubmit={handleSubmit(submitHandler)}>
                <h2 className="text-xl font-semibold text-blue-500 text-center mb-12">
                    Login</h2>
                <div className="relative flex flex-col mb-12">
                    <input 
                    type="email"
                    id="email"
                    autoFocus
                    placeholder=''
                    className='relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent
                     text-gray 100 outline-none px-2 peer'
                     {...register('email',{
                        required: 'Please Enter Email',
                        pattern: {
                            value:"",
                            message:'Please Enter Valid Email'
                        },
                     })}
                    />
                    {error &&(
                        <div className="text-red-500 text-xs absolute -bottom-5">
                            {error.message}
                        </div>
                    )}
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute 
                    h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"/>
                    <label className='peer-focus:font-medium absolute text-sm duration-500 transform translate-y-8 scale-75 top-3
                     left-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:text-gray-500
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'
                     htmlFor='email'> 
                    Enter Username</label>
                </div>
                <div className="relative flex flex-col mb-12">
                    <input 
                    type="password"
                    id="password"
                    placeholder=''
                    className='relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent
                     text-gray 100 outline-none px-2 peer'
                     {...register('password',{
                        required: 'Please Enter Password',
                        minLength:{
                            value:5,
                            message:"Password must be more than 4 characters"
                        }
                     })}
                    />
                    {error &&(
                        <div className="text-red-500 text-xs absolute -bottom-5">
                            {error.message}
                        </div>
                    )}
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute 
                    h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"/>
                    <label className='peer-focus:font-medium absolute text-sm duration-500 transform translate-y-8 scale-75 top-3
                     left-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:text-gray-500
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'
                     htmlFor='password'> 
                    Password</label>
                </div>
               <button type="submit"
               onClick={handleButtonClick}
               className="py-3 text-gray-100 bg-blue-500 w-full rounded hover:bg-blue-600 hover:scale-100 duration-100">LOGIN</button>
            </form>
            </div>
        </div>
      
    </div>
  )
}

export default Login

// import Image from 'next/image'

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.js</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore the Next.js 13 playground.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
