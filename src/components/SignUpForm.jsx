import { useForm } from "react-form-hook";

const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        < div className=" flex justify-center min-h-screen items-center">
            <section className="grid border rounded-[1.25rem] bg-darkBlue w-[25rem] h-[26.125rem]">
                <h1 className="text-white font-medium text-hl font-outfit pt-[2rem] pl-[2rem] pb-[2.5rem]">Sign Up</h1>
                <form className="grid" noValidate>
                    <div className="px-[2rem] pb-[1.5rem]">
                        <input type="email" placeholder="Email address" className="bg-darkBlue border-b border-lightBlue w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] placeholder:leading-[1.5] py-[0.25rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white" {...register("email", {
                            required: "Can't be empty",
                        })}/>
                    </div>
                    <div className="px-[2rem] pb-[1.5rem]">
                        <input type="password" placeholder="Password" className="bg-darkBlue border-b border-lightBlue w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white" {...register("password", {
                            required: "Can't be empty",
                        })}/>
                    </div>
                    <div className="px-[2rem] pb-[1.5rem]">
                        <input type="password" placeholder="Repeat password" className="bg-darkBlue border-b border-lightBlue w-full placeholder:font-outfit placeholder:font-light placeholder:text-bm h-[2.3125rem] pl-[1rem] pb-[1.12rem] caret-red text-white focus:outline-none focus:border-white" /> </div>
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