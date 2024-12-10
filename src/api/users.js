export const apiLoginUser = async (formData) => {
  try {
    const user = await getUserByEmail(formData.email);

    if (user) {
      const pass = formData.password === user.password;

      if (!pass) {
        return { error: "Incorrect email or password. Try again " };
      }

      return { id: user.id };
    } else {
      return { error: "Incorrect email or password. Try again " };
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
    return { error: "Unexpected error" };
  }
};
