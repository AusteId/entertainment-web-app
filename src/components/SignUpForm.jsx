import { useForm } from "react-hook-form";
import { useState } from "react";
import { getByEmail } from "../api/get";
import { addUser } from "../api/post";

const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const checkIfEmailExists = async (data) => {
        const email = data.email;
        const isUserExist = await getByEmail(email);
        if (isUserExist && isUserExist.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const formSubmitHandler = async (data) => {
        try {
            const isEmailExist = await checkIfEmailExists(data);
            if (!isEmailExist) {
                const newUser = await addUser(data);
                setUsers(prev => [...prev, newUser]);
                reset();
                setError("");
            } else {
                setError("email", { type: "manual", message: "This email already exists" });
            }
        }
        catch (error) {
            setError(error.message)
        }
    }

    return (
        < div className=" flex justify-center min-h-screen items-center">
            <section className="grid border rounded-[1.25rem] bg-darkBlue w-[20.4375rem] h-[26.25rem] md:w-[25rem] md:h-[26.125rem]">
                <h1 className="text-white font-medium text-hl font-outfit pt-[2rem] pl-[2rem] pb-[2.5rem]">Sign Up</h1>
                <form onSubmit={handleSubmit(formSubmitHandler)} className="grid" noValidate>
                    <div className="px-[2rem] pb-[1.5rem] relative">
                        <input type="email" placeholder="Email address" className={`text-bm bg-darkBlue border-b ${errors.password ? "border-red" : "border-lightBlue"} w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] placeholder:leading-[1.5] py-[0.25rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white`} {...register("email", {
                            required: "Can't be empty",
                            pattern: {
                                value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                        />
                        <p className="font-outfit text-red text-bs font-medium whitespace-nowrap absolute top-0 right-[3.06rem]">{errors.email?.message}</p>
                    </div>
                    <div className="px-[2rem] pb-[1.5rem] relative">
                        <input type="password" placeholder="Password" className={`text-bm bg-darkBlue border-b ${errors.password ? "border-red" : "border-lightBlue"} w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white`} {...register("password", {
                            required: "Can't be empty",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                message: "Password must contain both uppercase and lowercase letters",
                            }
                        })} />
                        <p className={`font-outfit text-red ${errors.password?.message.includes("empty") ? "text-bs" : "text-[0.7rem]"} font-medium whitespace-nowrap absolute top-0 right-[3.06rem]`}>{errors.password?.message}</p>
                    </div>
                    <div className="px-[2rem] pb-[1.5rem] relative">
                        <input type="password" placeholder="Repeat password" className={`text-bm bg-darkBlue border-b ${errors.password ? "border-red" : "border-lightBlue"} w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white`} {...register("repeatPassword", {
                            required: "Can't be empty",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                message: "Password must contain both uppercase and lowercase letters",
                            }
                        })} />
                        <p className={`font-outfit text-red ${errors.repeatPassword?.message.includes("empty") ? "text-bs" : "text-[0.7rem]"} font-medium whitespace-nowrap absolute top-0 right-[3.06rem]`}>{errors.repeatPassword?.message}</p></div>
                    <button className="text-white pb-[1.5rem]">Create an account</button>
                </form>
                <div className="inline-block text-center pb-[2rem]">
                    <p className="text-white text-bm font-outfit font-medium">Already have an account?<span className="text-red pl-[0.5rem] font-outfit font-medium"><a href="#">Login</a></span></p>
                </div>
            </section>
        </div>
    );
}

export default SignUpForm;