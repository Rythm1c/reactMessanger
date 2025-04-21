import supabase from "./SupabaseClient";

export const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
        email: email,   // use `username` as email here
        password: password
    });
    if (error)
        alert(error.message);
    else
        alert('Check your email for confirmation.');
}

export const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    });

    if (error) {
        alert('Google sign-in failed: ' + error.message);
    }
}

export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error)
        alert(error.message);

    else {
        alert("signed in successfully");
        window.localStorage.setItem('user', JSON.stringify(data.user));
    }

}

export const logout = async () => {
    await supabase.auth.signOut();
    window.localStorage.removeItem('user');
}