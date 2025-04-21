import supabase from "./SupabaseClient";

export const fetchContacts = async (user_id) => {
    const { data, error } = await
        supabase
            .from('contacts')
            .select('user_id, contact_id')
            .eq('user_id', user_id);
    if (error) alert(error.message);

    return data;

}

async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `chat-uploads/${fileName}`;

    const { data, error } = await supabase
        .storage
        .from("chat-uploads")
        .upload(filePath, file);

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    return {
        url: `${supabase.storage.from("chat-uploads").getPublicUrl(filePath).data.publicUrl}`,
        type: file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "file"
    };
}


export const sendMessage = async (
    sender,
    receiver,
    content,
    file = null) => {

    let upload = null;
    if (file) {
        upload = await uploadFile(file);
    }

    const { data, error } = await supabase
        .from('messages')
        .insert([{
            sender,
            receiver,
            content,
            file_url: upload?.url || null,
            file_type: upload?.type || null
        }]);

    if (error) console.error(error);

    return data;
}

export const fetchMessages = async (user1, user2) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender.eq.${user1},receiver.eq.${user1}`)
        .or(`sender.eq.${user2},receiver.eq.${user2}`)
        .order('created_at', { ascending: true });

    if (error) console.error(error);

    return data;
}

export const handleAvatarUpload = async (user_id, file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user_id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

    if (uploadError) {
        alert('Upload failed: ' + uploadError.message);
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

    // Update avatar URL in users table
    updateUserAvatar(user_id, data.publicUrl);
}

async function getUserByEmail(email) {
    const { data: users, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

    if (error || !users) {
        alert("User not found");
        return null;
    }

    console.log(users);

    return users;
}

export const getUserById = async (id) => {
    const { data: users, error } = await supabase
        .from('users')
        .select('id, email, username, avatar_url')
        .eq('id', id)
        .single();

    if (error || !users) {
        alert("User not found");
        return null;
    }

    return users;
}

export const updateUsername = async (id, username) => {
    // Update avatar URL in users table
    const { error: updateError } = await supabase
        .from('users')
        .update({ username: username })
        .eq('id', id);

    if (updateError) {
        alert('Error saving avatar: ' + updateError.message);
    } else {
        alert('username updated!');
    }
}
export const updateUserAvatar = async (id, avatar_url) => {
    // Update avatar URL in users table
    const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: avatar_url })
        .eq('id', id);

    if (updateError) {
        alert('Error saving avatar: ' + updateError.message);
    } else {
        alert('Avatar updated!');
    }
}

export const addContactToList = async (user_id, email) => {

    let users = await getUserByEmail(email);

    const { error } = await supabase
        .from("contacts")
        .insert([{
            user_id: user_id,
            contact_id: users.id
        }]);

    if (error) return alert(error.message);
}

