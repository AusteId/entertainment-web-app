import axios from "axios";

const urlUsers = "http://localhost:7777/users";

export const getByEmail = async (email) => {
    const response = await axios.get(`${urlUsers}?email=${email}`);
    return response.data;
}