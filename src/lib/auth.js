import { supabase } from './supabaseClient';

/**
 * Signs up a new user, validates password, and checks for existing nickname.
 * Relies on a DB trigger to create the user's profile.
 */
export const signUpWithEmail = async (email, password, fullName, nickname) => {
 // Password validation
 const uppercaseRegex = /[A-Z]/;
 const specialCharRegex = /[^A-Za-z0-9$*]/;
 if (!uppercaseRegex.test(password)) throw new Error('Password must contain at least one uppercase letter.');
 if (!specialCharRegex.test(password)) throw new Error('Password must contain at least one special character.');
 if (password.includes('$') || password.includes('*')) throw new Error('Password cannot contain "$" or "*" characters.');

 // Check if nickname exists
 const { data: existingProfile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('nickname', nickname.toLowerCase())
    .single();
 if (existingProfile) throw new Error('Nickname already exists');

 // Sign up the user
 const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            full_name: fullName,
            nickname: nickname.toLowerCase(),
        }
    }
 });
 if (error) throw error;
 return data;
};

/**
 * Signs in a user with their email and password.
 */
export const signInWithEmail = async (email, password) => {
 const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 if (error) throw error;
 return data;
};

/**
 * Signs in a user with their nickname and password.
 * This requires the 'get_email_from_nickname' database function to be created.
 */
export const signInWithUsername = async (nickname, password) => {
 const { data: emailData, error: rpcError } = await supabase.rpc('get_email_from_nickname', {
    p_nickname: nickname.toLowerCase()
 });

 if (rpcError || !emailData) {
    throw new Error('Invalid nickname or password.');
 }

 const { data, error } = await supabase.auth.signInWithPassword({
    email: emailData,
    password: password,
 });

 if (error) {
    throw error;
 }
 return data;
};


/**
 * Signs out the current user.
 */
export const signOutUser = async () => {
 const { error } = await supabase.auth.signOut();
 if (error) throw error;
};

// --- PROFILE DATA FUNCTIONS FOR DASHBOARD ---

/**
 * Gets the currently authenticated user from Supabase.
 */
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

/**
 * Fetches the logged-in user's complete profile from the 'profiles' table.
 */
export const getUserProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
    return data;
};

/**
 * Updates a user's profile in the 'profiles' table.
 */
export const updateProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date() })
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
    return data;
};

/**
 * Uploads a new avatar image to Supabase Storage and returns the public URL.
 */
export const uploadAvatar = async (userId, file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return data.publicUrl;
};


/**
 * Fetches a public profile by nickname.
 */
export const getPublicProfileByNickname = async (nickname) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('nickname', nickname)
        .eq('is_public', true)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching public profile:', error);
        throw error;
    }
    return data;
};

