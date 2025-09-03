import { useDispatch } from "react-redux"
import { deletePassword } from "../features/passwords/passwordSlice"
import { FaClone } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { toast } from "react-toastify"

const PasswordItem = ({ password }) => {
  const dispatch = useDispatch()

  const copy = (e) => {
    navigator.clipboard.writeText(e)
    toast("Password copied!")
  }

  return (
    <div className='goal'>
      <div>
        {new Date(password.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{password.text}</h2>
      <div onClick={() => copy(password.password)} className="password">
        <h4>{"•".repeat(password.password.length)}</h4>
        <FaClone />
      </div>
      <button onClick={() => dispatch(deletePassword(password._id))} className='close'>
        <RiDeleteBin5Fill/>
      </button>
    </div>
  )
}

export default PasswordItem
