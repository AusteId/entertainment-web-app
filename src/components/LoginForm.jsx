import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/shared/Button";
import { useUserContext } from "../service/UserContextProvider";

import "../styles/LoginForm.css";
import { apiLoginUser } from "../api/users";

import logo from "/assets/logo.svg";

export const LoginForm = ({ onSignUp }) => {
  const userData = useUserContext();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (formData) => {
    try {
      const userId = await apiLoginUser(formData);
      if (userId.error) {
        setError(userId.error);
      } else {
        userData.setUserLoggedIn(userId.id);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="logo-login" />
      </div>
      <div className="box   md:w-[25rem] ">
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
                required: "Can't be empty",
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
                required: "Can't be empty",
              })}
            />
            {errors.password && (
              <p className="error_message">{errors.password.message}</p>
            )}
          </div>
          <div className="  pb-[1.5rem] px-[1.5rem] text-center">
            <Button type={"submit"}>Login to your account</Button>
          </div>

          <div
            onClick={onSignUp}
            className="inline-block text-center pb-[2rem] cursor-pointer w-full"
          >
            <p className="text-white text-bm font-outfit font-light">
              Don't have an account?
              <span className="text-red pl-[0.5rem] font-outfit font-light">
                <a href="#">Sign Up</a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

