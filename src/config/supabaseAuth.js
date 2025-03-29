import supabase from "./SupabaseClient";
import bcrypt from "bcryptjs";

export const signUp = async (username, pass) => {
    if (pass.length < 6) {
        alert("password length is too short");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(pass, salt);
    const { data, error } = await supabase.from('users').insert([
        { username: username.trim(), password_hash: hashedPassword }
    ]);
    if (error) alert(error.message);
    else alert('User registered successfully!');
}

export const login = async (username, password) => {
    const { data, error } = await supabase.from('users')
        .select('*')
        .eq('username', username)
        .single();
    if (error || !data) return alert('User not found');

    const passwordMatch = bcrypt.compareSync(password, data.password_hash);
    if (!passwordMatch) return alert('Invalid password');

    if (data) console.log("signed in successfully");

    window.localStorage.setItem('user', JSON.stringify(data));
}

export const logout = async () => {
    await supabase.auth.signOut();
}