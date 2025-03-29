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

/* export const deleteMessage = async (messageId) => {
    const { error } = await supabase
        .from('messages')
        .delete()
        .match({ id: messageId });
    // if (!error) setMessages(messages.filter(msg => msg.id !== messageId));
    if (error) console.error(error);
} */

export const fetchMessages = async (user1, user2) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender.eq.${user1},receiver.eq.${user1}`)
        .or(`sender.eq.${user2},receiver.eq.${user2}`)
        .order('timestamp', { ascending: true });

    if (error) console.error(error);

    return data;
}

async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `chat-uploads/${fileName}`;

    const { data, error } = await supabase.storage.from("chat-uploads").upload(filePath, file);

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    return {
        url: `${supabase.storage.from("chat-uploads").getPublicUrl(filePath).data.publicUrl}`,
        type: file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "file"
    };
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

/* export const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `chat-images/${fileName}`;

    const { data, error } = await supabase.storage.from("chat-images").upload(filePath, file);

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    return `${supabase.storage.from("chat-images").getPublicUrl(filePath).data.publicUrl}`;
} */