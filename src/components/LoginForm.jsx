import { useState } from "react";
import { useForm } from "react-hook-form";

import "../styles/LoginForm.css";
import { apiLoginUser } from "../api/users";

export const LoginForm = ({ onSignUp }) => {
  //   const user = useUserContext();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (formData) => {
    try {
      const userId = await apiLoginUser(formData);
      console.log(userId);
      if (userId.error) {
        setError(userId.error);
      } else {
        // user.setLoggedIn(userId.id);
        //console.log("24: ", userId);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="box">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="text">
          {error && <p className="text_center">{error}</p>}
        </div>
        <h1>Login</h1>
        <div className={`input_box ${errors.password ? "error" : ""}`}>
          <input
            id="email"
            type="email"
            autoComplete="on"
            placeholder="Email address"
            className="form_text"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error_message">{errors.email.message}</p>
          )}
        </div>
        <div className={`input_box ${errors.password ? "error" : ""}`}>
          <input
            id="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
            className="form_text"
            {...register("password", {
              required: "Please enter password",
            })}
          />
          {errors.password && (
            <p className="error_message">{errors.password.message}</p>
          )}
        </div>

        <button className="button" type="submit">
          Login to your account
        </button>
      </form>
      <button onClick={onSignUp} className="singup">
        Don't have an account? <span className="signup_link">Sign Up</span>
      </button>
    </div>
  );
};
