import supabase from "./SupabaseClient";

export const fetchContacts = async (setContacts) => {
    const { data, error } = await
        supabase
            .from('users')
            .select('id, username');
    if (!error) setContacts(data);
}

async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `chat-images/${fileName}`;

    const { data, error } = await supabase.storage.from("chat-images").upload(filePath, file);

    if (error) {
        console.error("Error uploading file:", error);
        return null;
    }

    return `${supabase.storage.from("chat-images").getPublicUrl(filePath).data.publicUrl}`;
}

// for private files
/* export const downloadImage = async (url) => {
    const { data, error } = await supabase.storage.from("chat-images").download(url);

    if (error) {
        console.error("Error downloading file:", error);
        return null;
    }

    const blob = new Blob([data], { type: data.type });
    return URL.createObjectURL(blob);
} */

export const sendMessage = async (sender, receiver, text, image = null) => {

    let imageURL = null;
    if (image) {
        imageURL = await uploadImage(image);
    }

    const { data, error } = await supabase
        .from('messages')
        .insert([{ sender, receiver, text, imageURL }]);

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

