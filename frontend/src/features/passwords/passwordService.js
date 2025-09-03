import axios from "axios";

const API_URL = "http://localhost:5000/api/passwords/"

const createPassword = async(passwordData, token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, passwordData, config)

    return response.data
}

const getPassword = async(token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,  config)

    return response.data
}

const deletePassword = async(passwordId, token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + passwordId,  config)

    return response.data
}

const passwordService = { createPassword, getPassword, deletePassword }
export default passwordService