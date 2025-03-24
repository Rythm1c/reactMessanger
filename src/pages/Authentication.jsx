import { useState } from "react";


function Authentication() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isSignUp ? "Signing Up" : "Logging In", formData);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white ">
            <div className="w-96 bg-gray-800 shadow-lg p-1">
                <div>
                    <div className="text-center text-xl">
                        {isSignUp ? "Sign Up" : "Login"}
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 border-none text-white rounded-[2px] p-1"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 border-none text-white rounded-[2px] p-1"
                        />
                        <button type="submit" className=" py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-[2px]">
                            {isSignUp ? "Sign Up" : "Login"}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline">
                            {isSignUp ? "Login" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Authentication
