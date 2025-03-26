import supabase from "./SupabaseClient";

export const fetchContacts = async (setContacts) => {
    const { data, error } = await supabase
        .from('users')
        .select('id, username');
    if (!error) setContacts(data);
}

export const sendMessage = async (sender, receiver, text) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([{ sender, receiver, text }]);

    if (error) console.error(error);
    return data;
}

export const deleteMessage = async (messageId) => {
    const { error } = await supabase
        .from('messages')
        .delete()
        .match({ id: messageId });
    // if (!error) setMessages(messages.filter(msg => msg.id !== messageId));
    if (error) console.error(error);
}

export const fetchMessages = async (user1, user2, setMessages) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender.eq.${user1},receiver.eq.${user1}`)
        .or(`sender.eq.${user2},receiver.eq.${user2}`)
        .order('timestamp', { ascending: true });

    if (error) console.error(error);

    setMessages(data);
}


/* export const uploadProfilePicture = async (file, userId) => {
    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${userId}`, file);

    if (error) console.error(error);
    return data;
}

export const getProfilePicture = async (userId) => {
    return supabase.storage.from('avatars').getPublicUrl(`public/${userId}`);
}

 */