"use client"

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getEventsId } from "@/lib/events/events";
import { createUser } from "@/lib/database/server_db";

export default function Signup() {
    const supabase = createClientComponentClient({
        cookieOptions: {
            secure: true,
            httpOnly: true,
            sameSite: 'strict'
        }
    });
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        gender: "",
        birthMonth: "",
        birthYear: "",
        conditions: []
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleConditionToggle = (condition) => {
        setFormData(prevData => {
            const updatedConditions = [...prevData.conditions];
            const index = updatedConditions.indexOf(condition);
            
            if (index !== -1) {
                updatedConditions.splice(index, 1);
            } else {
                updatedConditions.push(condition);
            }
            
            return {
                ...prevData,
                conditions: updatedConditions
            };
        });
    };

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    const signUp = async (e) => {
        e.preventDefault();
        const date = new Date();

        const email = formData.email;
		const pass = formData.password;
		const name = formData.email;
		const isMale = formData.gender == "male";
        const currentAge = date.getFullYear() + date.getMonth() - 12 * parseInt(formData.birthYear) - parseInt(formData.birthMonth);
        const conditions = formData.conditions;

        const event_ids = await getEventsId(currentAge, isMale, conditions);

        console.log("Sign up A");
        let authData;
		try {
			const { data: retAuthData, error: authError } = await supabase.auth.signUp({
				email: email, // formData.email
				password: pass, // formData.password
				options: {
					emailRedirectTo: `auth_signin/${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
				}
			});
			authData = retAuthData;
	
			if (authError || !authData?.user) {
                console.log("SIGN UP AUTH ERROR A");
				setStatus(1);
				return;
			}
		} catch (e) {
			if (true) {
				console.log("SIGN UP AUTH ERROR");
				console.log(e.message);
			}
			setStatus(1);
			return;
		}
	
		console.log("Sign up B");
		try {
			const user = await createUser({
				id: authData.user.id,
				email: email,
                events: event_ids,
			});
			
			if (user) {
                console.log(user);
				setStatus(0); 
			} else {
				if (true) {console.log("SIGN UP DB ERROR");}
				setStatus(1);
			}
		} catch (e) {
			if (true) {
				console.log("SIGN UP DB ERROR");
				console.log(e.message);
			}
			setStatus(1);
			return;
		}

        console.log("Sign up C");
        if (status === 0) {
            router.push("/signIn");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full min-h-screen bg-[#f9f9f9]">
            <div className="p-[2.8rem] rounded-[2rem] w-[35rem] bg-[#eeecda] shadow-lg">
                {status === "error" && (
                    <div className="bg-[#e33f3f]/10 rounded-[0.4rem] py-[0.3rem] mb-4">
                        <p className="text-center font-[700] text-[#e33f3f]">There was an issue signing up, please try again</p>
                    </div>
                )}

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-[3rem] font-bold text-[#98479a]">
                        SIGN UP
                    </h1>
                    <div className="flex gap-2">
                        <button 
                            onClick={prevStep} 
                            className={`w-8 h-8 rounded-full border pb-[0.11rem] pl-[0.07rem] border-[#98479a] bg-[#98479a] flex items-center justify-center text-[#f9f9f9] ${step === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                            disabled={step === 1}
                        >
                            &lt;
                        </button>
                        <button 
                            onClick={nextStep}
                            className={`w-8 h-8 rounded-full border pb-[0.11rem] pl-[0.1rem] border-[#98479a] bg-[#98479a] flex items-center justify-center text-[#f9f9f9] ${step === 2 ? 'opacity-30 cursor-not-allowed' : ''}`}
                            disabled={step === 2}
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                <form onSubmit={signUp} className="space-y-6">
                    {step === 1 && (
                        <>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-6 m-5">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full py-4 text-white text-[1.5rem] font-semibold rounded-[2rem] bg-[#008044] hover:bg-[#016335] transition-colors duration-300"
                                >
                                    Next
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-base text-gray-700">
                                    Already have an account? <Link href="/auth_signin" className="text-[#98479a] font-medium hover:underline">Sign In</Link>
                                </p>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="gender" className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">gender</label>
                                    <select
                                        id="gender"
                                        type="text"
                                        name="gender"
                                        value={formData.gender}
                                        placeholder="Enter your gender"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent"
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="birthMonth" className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">birth month</label>
                                    <select
                                        id="birthMonth"
                                        name="birthMonth"
                                        value={formData.birthMonth}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent"
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="birthYear" className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">birth year</label>
                                    <input
                                        id="birthYear"
                                        type="number"
                                        name="birthYear"
                                        value={formData.birthYear}
                                        placeholder="Enter your birth year"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-[#98479a] focus:border-transparent"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mt-4 space-y-2">
                                    <label className="block ml-1 text-[1.1rem] font-semibold text-[#98479a]">any other conditions?</label>
                                    <div className="mt-2 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div 
                                                onClick={() => handleConditionToggle('diabetic')}
                                                className={`w-5 h-5 rounded-full border border-[#98479a] flex items-center justify-center cursor-pointer ${formData.conditions.includes('diabetic') ? 'bg-[#98479a]' : 'bg-white'}`}
                                            >
                                                {formData.conditions.includes('diabetic') && <span className="text-sm text-white">✓</span>}
                                            </div>
                                            <span className="text-gray-700">diabetic</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div 
                                                onClick={() => handleConditionToggle('smokes')}
                                                className={`w-5 h-5 rounded-full border border-[#98479a] flex items-center justify-center cursor-pointer ${formData.conditions.includes('smokes') ? 'bg-[#98479a]' : 'bg-white'}`}
                                            >
                                                {formData.conditions.includes('smokes') && <span className="text-sm text-white">✓</span>}
                                            </div>
                                            <span className="text-gray-700">smokes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div 
                                                onClick={() => handleConditionToggle('asthma')}
                                                className={`w-5 h-5 rounded-full border border-[#98479a] flex items-center justify-center cursor-pointer ${formData.conditions.includes('asthma') ? 'bg-[#98479a]' : 'bg-white'}`}
                                            >
                                                {formData.conditions.includes('asthma') && <span className="text-sm text-white">✓</span>}
                                            </div>
                                            <span className="text-gray-700">asthma</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 m-5">
                                <button
                                    type="submit"
                                    className="w-full py-4 text-white text-[1.5rem] font-semibold rounded-[2rem] bg-[#008044] hover:bg-[#016335] transition-colors duration-300"
                                >
                                    Sign Up
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-base text-gray-700">
                                    Already have an account? <Link href="/auth_signin" className="text-[#98479a] font-medium hover:underline">Sign In</Link>
                                </p>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}