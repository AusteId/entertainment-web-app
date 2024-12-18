import axios from 'axios';
import { API_USERS_URL } from '../helpers/constants';
import { checkPassword } from '../utils/passwordHash';

export const apiLoginUser = async (formData) => {
  try {
    const user = await getUserByEmail(formData.email);

    if (user) {
      const pass = await checkPassword(formData.password, user.password);

      if (!pass) {
        return { error: 'Incorrect email or password. Try again ' };
      }

      return { id: user.id };
    } else {
      return { error: 'Incorrect email or password. Try again ' };
    }
  } catch (e) {}
};

/**
 * Naudotojo paieška pagal el. pašto adresą
 * @param {*} email
 * @returns objektas user {email, password}
 * @returns stringas "User not found" arba "Unexpected error"
 */
export const getUserByEmail = async (email) => {
  try {
    // Gaunam visus userius is db
    const res = await axios.get(API_USERS_URL);
    // Ieškom...
    const user = res.data.find((usr) => usr.email === email);

    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};

/**
 * Naudotojas pagal id
 * @param {*} userId
 * @returns objektas - user
 */
export const apiGetUserById = async (userId) => {
  try {
    // Gaunam visus userius is db
    const res = await axios.get(`${API_USERS_URL}/${userId}`);

    return res.data;
  } catch (e) {
    return { error: 'Unexpected error' };
  }
};
