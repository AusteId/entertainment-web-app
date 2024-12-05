

const SignUpForm = () => {
    return (
        <section className="grid border rounded-[1.25rem] bg-darkBlue w-[25rem] h-[26.125rem]">
            <h1 className="text-white">Sign Up</h1>
            <form className="grid">
                <input type="text" placeholder="Email address"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Repeat password"/>
                <button className="text-white">Create an account</button>
            </form>
            <p className="text-white">Already have an account?<span><a href="#"></a></span></p>
        </section>
    );
}

export default SignUpForm;