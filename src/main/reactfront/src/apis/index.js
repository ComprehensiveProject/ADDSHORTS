import axios from "axios";

export const signInApi = async (data) => {

    const response = await axios.post("http://localhost:8080/api/auth/signIn", data).catch((error) => null);
    if(!response){
        return null;
    }

    return response.data;
}

export const signUpApi = async (data) => {
    const response = await axios.post('http://localhost:8080/api/auth/signUp', data).catch((error) => null);
    if(!response){
        return null;
    }

    return response.data;
}