"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/database/server_db";

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
	const supabase = createClientComponentClient();

    const [session, setSession] = useState(initialSession);
    const [user, setUser] = useState(initialSession?.user || null);
    const [loading, setLoading] = useState(true);

	const signUp = async (email, password, name, isMale, birthMonth, birthYear) => {
        try {
            const authSignUp = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
                },
            });
    
            if (authSignUp.error) { // Auth error
                console.log("Auth signup error");
                console.log(authSignUp.error);
                return { status: 1, data: authSignUp.error };
                // Depending on which error code it is, we could set status to something different
            }
            if (!authSignUp?.user) {
                return { status: 1, data: "Auth user does not exist"}
            }
    
            const status = await createUser({
                auth_id: authSignUp.user.id,
                name: name,
                is_male: isMale,
                b_month: birthMonth,
                b_year: birthYear,
            });
    
            return status; 
        } catch (e) {
            return { status: 1, data: e};
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
