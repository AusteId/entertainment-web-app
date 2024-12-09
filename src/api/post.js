import axios from "axios";

const urlUsers = "http://localhost:7777/users";

export const addUser = async (data) => {
    const response = await axios.post(urlUsers, data);
    return response.data;
}