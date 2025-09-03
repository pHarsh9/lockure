import { useState } from "react"
import { useDispatch } from "react-redux"
import { createPassword } from '../features/passwords/passwordSlice'
import { GiPlatform } from 'react-icons/gi';
import { TbPassword } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";


const PasswordForm = () => {
  const [passwordData, setPasswordData] = useState({text:'', password:''})
  const { text , password } = passwordData
  const dispatch = useDispatch()
  
  const onChange = (e) => {
    setPasswordData((prevState)=>({
      ...prevState, [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createPassword(passwordData))
    setPasswordData({text:'', password:''})
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="icon" htmlFor="text"><span>Platform</span> <span><GiPlatform/></span></label>
          <input type="text" name="text" value={text} onChange={onChange} />
        </div>
        <div className="form-group">
          <label className="icon" htmlFor="text"><span>Password</span><span><TbPassword/></span></label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-block icon" type="submit"><span>Add Paasword</span> <span><RiLockPasswordFill/></span></button>
        </div>
      </form>

    </section>
  )
}

export default PasswordForm
