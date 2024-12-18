import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../components/shared/Button";
import { useUserContext } from "../service/UserContextProvider";

import "../styles/LoginForm.css";
import { apiLoginUser } from "../api/users";

import logo from "/assets/logo.svg";

export const LoginForm = ({ onSignUp }) => {
  const userData = useUserContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
        navigate("/");
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

      <div className="box md:w-[25rem]">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="text">
            {error && !errors.email && !errors.password && (
              <p className="text_center">{error}</p>
            )}
          </div>
          <h1 className="heading-login">Login</h1>
          <div className={`input_box ${errors.password ? "error" : ""}`}>
            <input
              id="email"
              type="email"
              aria-label='Enter your email address'
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
           {/* Display the required error message */}
  {errors.email && errors.email.type === "required" && (
    <p className="error_message required_error">{errors.email.message}</p>
  )}
  
  {/* Display the pattern error message */}
  {errors.email && errors.email.type === "pattern" && (
    <p className="error_message pattern_error">{errors.email.message}</p>
  )}
</div>
          <div className={`input_box ${errors.password ? "error" : ""}`}>
            <input
              id="password"
              type="password"
              aria-label='Enter your password'
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

          <div className="  pb-[1.5rem] text-center">
            <Button
              type={"submit"}
              className="w-[320px] sm:w-[320px] md:w-[400px] lg:w-[500px]"
            >
              Login to your account
            </Button>
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

{
  /* <button type='button' onClick={onSignUp} className='singup w-full'>
            Don't have an account? <span className='signup_link'>Sign Up</span>
          </button> */
}
