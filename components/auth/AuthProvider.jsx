"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

/* 
	This is a wrapper around our whole website that allows components in the website to access auth data
	The onAuthStateChange function is a listener for auth changes
	The AuthContext is just a way of transmitting data from this component to child components
		In a dsdchild component, call the function getAuthContext to get the data
*/

// Create a context for authentication
const AuthContext = createContext();

// Listener of auth changes w/ context functionality
export function AuthProvider({ children, initialSession }) {
	const router = useRouter();
	const supabase = createClientComponentClient({
        cookieOptions: {
            secure: process.env.production === true,
            httpOnly: true,
            sameSite: 'strict'
            }
    });

    const [session, setSession] = useState(initialSession);
    const [user, setUser] = useState(initialSession?.user || null);
    const [loading, setLoading] = useState(true);

    // Auth provider doesn't actually provide these functions - they are for refernce

	const signUp = async (email, password, name, isMale, birthMonth, birthYear) => {
        let authData;
        try {
            const { data: retAuthData, error: authError } = await supabase.auth.signUp({
                email: email, // formData.email
                password: pass, // formData.password
                options: {
                    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
                }
            });
            authData = retAuthData;
    
            if (authError || !authData?.user) {
                if (process.env.production === true) {console.log("SIGN UP AUTH ERROR A");}
                return 1;
            }
        } catch (e) {
            if (process.env.production === true) {
                console.log("SIGN UP AUTH ERROR");
                console.log(e.message);
            }
            return 1;
        }
    
        // Try db
        try {
            const user = await createUser({
                id: authData.user.id,
                name: name,
                email: email,
                is_male: is_male,
                b_month: b_month,
                b_year: b_year,
            });
            
            if (user) {
                return 0;
            } else {
                if (process.env.production === true) {console.log("SIGN UP DB ERROR");}
                return 1;
            }
        } catch (e) {
            if (process.env.production === true) {
                console.log("SIGN UP DB ERROR");
                console.log(e.message);
            }
            return 1;
        }
    };

    const signIn = async (email, password) => {
        try {
            const response = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            if (response.error) {
                console.error("Sign-in error:", response.error.message);
                return response;
            }
            
            console.log("Sign-in successful, redirecting...");
            router.push("/timeline");
            return response;
        } catch (error) {
            console.error("Exception during sign-in:", error);
            return { error };
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };
    
    const resetPassword = async (email) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
            });
            
            return { data, error };
        } catch (error) {
            console.error("Password reset error:", error);
            return { error };
        }
    };

    useEffect(() => {
        // Set initial state
        if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
        }
        setLoading(false);

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user || null);
            setLoading(false);
        });

        // Unsubscribe the listener on exit
        return () => {
            subscription.unsubscribe();
        };
    }, [initialSession, supabase]);

    // Context value
    const value = {
        session,
        user,
        loading,
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        resetPassword: resetPassword,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
