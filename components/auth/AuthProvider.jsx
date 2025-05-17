"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

/* 
	This is a wrapper around our whole website that allows components in the website to access auth data
	The onAuthStateChange function is a listener for auth changes
	The AuthContext is just a way of transmitting data from this component to child components
		In a child component, call the function getAuthContext to get the data
*/

// Create a context for authentication
const AuthContext = createContext();

// Listener of auth changes w/ context functionality
export function AuthProvider({ children, initialSession }) {
	const router = useRouter();
	const supabase = createClientComponentClient();

    const [session, setSession] = useState(initialSession);
    const [user, setUser] = useState(initialSession?.user || null);
    const [loading, setLoading] = useState(true);

	const signUp = async (email, password) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
            },
        });
    };

    const signIn = async (email, password) => {
        // const response = await supabase.auth.signInWithPassword({
        //     email,
        //     password,
        // });
        
        // if (response.error) {
        //     console.error("Sign-in error:", response.error.message);
        //     return response;
        // }
        
        // router.push("/timeline");
        // return response;

        // try {
        //     const response = await supabase.auth.signInWithPassword({
        //         email,
        //         password,
        //     });
            
        //     if (response.error) {
        //         console.error("Sign-in error:", response.error.message);
        //         return response;
        //     }
            
        //     console.log("Sign-in successful, redirecting...");
        //     router.push("/timeline");
        //     return response;
        // } catch (error) {
        //     console.error("Exception during sign-in:", error);
        //     return { error };
        // }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
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