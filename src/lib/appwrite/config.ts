import { Client, Account, Databases, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);


// import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// export const appwriteConfig = {
//     projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
//     url: import.meta.env.VITE_APPWRITE_URL, // Might be undefined
// };

// export const client = new Client();

// // Safely set the endpoint only if it exists
// if (appwriteConfig.url) {
//     client.setEndpoint(appwriteConfig.url);
// } else {
//     console.warn('Appwrite URL is missing. Endpoint not set.');
// }

// client.setProject(appwriteConfig.projectId);

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export const avatars = new Avatars(client);
