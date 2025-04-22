import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const savePassword = async() => {
        await fetch("http://localhost:3000/",{method: "DELETE", headers:{"content-type":"application/json"}, body:JSON.stringify({id:form.id})})
        setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        await fetch("http://localhost:3000/",{method: "POST", headers:{"content-type":"application/json"}, body:JSON.stringify({...form, id: uuidv4()})})
     //   localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
     //   console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
    }

    const deletePassword = async(id)=>{
        console.log("deleting id",id)
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        let res = await fetch("http://localhost:3000/",{method: "DELETE", headers:{"content-type":"application/json"}, body:JSON.stringify({id})})
       // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }  

    const editPassword = (id)=>{
        setform({...passwordArray.filter(item=>item.id===id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
       // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }

    const showPassword = () => {
        console.log(ref.current.src)
        passRef.current.type = "text"
        if (ref.current.src.includes("/src/assets/eyeoff.svg")) {
            ref.current.src = "./src/assets/eye.svg"
            passRef.current.type = "password"
        }
        else {
            ref.current.src = "./src/assets/eyeoff.svg"
        }
    }

    const copyText = (e) => {
        navigator.clipboard.writeText(e)
        toast('🦄 Copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition="Bounce"
            />

            <div className="py-10 mx-auto max-w-2xl text-center min-h-[85vh] text-white">
            <span className="font-bold text-2xl">&lt;Pass</span><span className='font-bold text-2xl text-green-300'>Aves/&gt; </span>
                <p className='font-bold'>The Password Manager</p>

                <div className="manager flex flex-col items-center p-5 gap-4  bg-pink-600">

                    <input onChange={handleChange} className='border rounded-md w-full px-2' name='site' value={form.site} type="text" placeholder='Enter Website' />

                    <div className="flex gap-3 w-full justify-around relative">

                        <input onChange={handleChange} className='w-full border rounded-md px-2' type="text" name="username" value={form.username} placeholder='Enter Username' />
                        <input onChange={handleChange} className='w-full border rounded-md px-2' ref={passRef} type="password" name='password' value={form.password} placeholder='Enter Password' />

                        <span className='absolute right-2 top-1 cursor-pointer' >  <img className='' onClick={showPassword} ref={ref} width={18} src="./src/assets/eye.svg" alt="eye" /></span>

                    </div>

                    <button onClick={savePassword} className='hover:font-extrabold font-bold flex justify-center items-center gap-1.5 border border-white rounded-md w-1/4  cursor-pointer'>
                        <span><img width={20} src="./src/assets/add.svg" alt="add" /></span>Save</button>
                </div>
                <div className="passwords border-t p-4">
                    <h2 className='font-bold text-green-300'>SAVED PASSWORDS</h2>
                    {passwordArray.length === 0 && <div className='my-4 font-bold'>No passwords saved!</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full my-4">
                            <thead >
                                <tr>
                                    <th>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' text-white'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center w-1/4'><div><a target='_blank' href={item.site}>{item.site}</a></div></td>
                                        <td className='text-center w-1/4'><div className='flex justify-center gap-1 '><span>{item.username}</span><span><img onClick={() => { copyText(item.username) }} className='cursor-pointer' width={25} src="./src/assets/copy.svg" alt="" /></span></div></td>
                                        <td className='text-center w-1/4'><div className='flex justify-center gap-1 '> <span>{"*".repeat(item.password.length)}</span><span><img onClick={() => { copyText(item.password) }} className='cursor-pointer' width={25} src="./src/assets/copy.svg" alt="" /></span></div> </td>
                                        <td className='w-1/4 text-center'><div className='flex justify-center gap-1'><span><img onClick={()=>{editPassword(item.id)}} width={25} src="./src/assets/edit.svg" alt="" /></span><span><img onClick={()=>{deletePassword(item.id)}} width={25} src="./src/assets/delete.svg" alt="" /></span></div></td>                                   
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>


        </>


    )
}

export default Manager
