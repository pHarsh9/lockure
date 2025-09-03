import { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PasswordItem from '../components/PasswordItem'
import PasswordForm from '../components/PasswordForm'
import Spinner from '../components/Spinner'
import { getPassword, reset } from '../features/passwords/passwordSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const { passwords , isLoading, isError, isSuccess, message } = useSelector((state)=> state.passwords)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
      return
    }
    dispatch(getPassword())
    return ()=>{
      dispatch(reset())
    }
  },[user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }


  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Password Dashboard</p>
      </section>
      <PasswordForm />
      <section className="content">
        {passwords.length > 0 ? (
          <div className="goals">
            {Array.isArray(passwords) && passwords.map((password) => (
              <PasswordItem key={password._id} password={password} />
            ))}
          </div>
        ) : (
          <h3>You have not set any passwords</h3>
        )}
      </section>
    </>

  )
}

export default Dashboard

