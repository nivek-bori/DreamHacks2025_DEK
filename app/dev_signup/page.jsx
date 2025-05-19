"use client";

import React from "react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const { signUp } = useAuth();
    const router = useRouter();
    
    const [step, setStep] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [formData, setFormData] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        birthMonth: null,
        birthYear: null,
    });

    const handleSelectChange = (e) => {
        setSelectedMonth(e.target.value);
    }

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle next and back
    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const allSet = formData.every(item => item !== null && item !== undefined && item !== '');
        const month = (selectedMonth === null);
        if (allSet === false || month === false) {
            alert("Please fill all the text boxes and/or choose a valid month");
            return;
        }

        signUp(e.email, e.password, e.birthMonth, e.birthYear);
        // Actual DB stuff for other fields

        console.log("Final form data:", formData);
        alert("Form submitted!");

        router.push("/")
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h1>Sign Up</h1>
            <h2>Step {step} of 2</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <>
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                        <br />
                        <br />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                        <br />
                        <br />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <br />
                        <br />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <br />
                        <br />
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <select value={selectedMonth} onChange={handleSelectChange}>
                        <option value={null} disabled>Select a month</option>
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
                        <br />
                        <br />
                        <input type="number" name="birthYear" placeholder="Birth Year" value={formData.birthYear} onChange={handleChange} required />
                        <br />
                        <br />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>{" "}
                        <button type="submit">Submit</button>
                    </>
                )}
            </form>
        </div>
    );
}
''