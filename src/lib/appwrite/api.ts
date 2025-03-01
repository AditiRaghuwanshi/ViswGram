// import { ID, Query } from 'appwrite';

// import { INewUser } from "../../types";
// import { account, appwriteConfig, databases, storage} from "./config";
// import { avatars } from './config';
// // import { Query } from '@tanstack/react-query';


// export async function createUserAccount(user: INewUser) {

//     try {
//         const newAccount = await account.create(
//             ID.unique(),
//             user.email,
//             user.password,
//             user.name
        
//         );

//         if(!newAccount) throw Error;

//         const avatarUrl = avatars.getInitials(user.name);

//         const newUser = await saveUserToDB({
//             accountId: newAccount.$id,
//             name: newAccount.name,
//             email: newAccount.email,
//             username: user.username,
//             imageUrl: avatarUrl,
//         })

//         return newUser;

//     } catch(error) {
//         console.log(error);
//         return error;
//     }

// }

// export async function saveUserToDB(user: {
//     accountId: string;
//     email: string;
//     name: string;
//     imageUrl: string;
//     username?: string;

// }) {
//     try{
//         const newUser = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             ID.unique(),
//             user,

//         )
//            return newUser;
//     } 
//     catch (error) {
//         console.log(error);
//     }

// }


// export async function SignInAccount(user: {
//     email:string;
//     password: string;
// }) {
//     try {
//         const session = await account.createEmailPasswordSession(user.email, 
//             user.password);

//             return session;
        

//     } catch(error) {
//         console.log(error);
//     }
// }

// export async function getCurrentUser() { 
//     try {

//         const currentAccount = await account.get();
//         if(!currentAccount) throw Error;

//         const currentUser = await databases.listDocuments(

//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal("accountId", currentAccount.$id)]
//         )

//         if(!currentUser) throw Error;
//         return currentUser.documents[0];

//     } catch(error) {
//         console.log(error);
//         return null;
//     }
    
// }















import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import {  INewUser } from "../../types";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SIGN IN
// export async function signInAccount(user: { email: string; password: string }) {
//   try {
//     const session = await account.createEmailPasswordSession(user.email, user.password);

//     return session;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function signInAccount(user: { email: string; password: string }) {
    try {
      // Clear any active sessions
      await account.deleteSessions();
  
      // Use the correct method name to create an email/password session
      const session = await account.createEmailPasswordSession(
        user.email,
        user.password
      );
  
      console.log("Session created:", session);
      return session;
    } catch (error) {
      console.error("Sign-in error:", error.message || error);
      return null;
    }
  }

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
