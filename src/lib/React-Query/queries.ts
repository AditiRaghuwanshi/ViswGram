import {
    useQuery, useMutation, useQueryClient, useInfiniteQuery
} from '@tanstack/react-query'
import { INewUser } from '../../types'
import { createUserAccount } from '../appwrite/api'
import { signInAccount } from "../../lib/appwrite/api";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    });
}



export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user),
    });
}



// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
//     useInfiniteQuery,
//   } from "@tanstack/react-query";
  
//   import { createUserAccount } from '../appwrite/api'
//   import { signInAccount } from "../../lib/appwrite/api";
//   import { INewUser } from "../../types";
  
//   // ============================================================
//   // AUTH QUERIES
//   // ============================================================
  
//   export const useCreateUserAccount = () => {
//     return useMutation({
//       mutationFn: (user: INewUser) => createUserAccount(user),
//     });
//   };
  
//   export const useSignInAccount = () => {
//     return useMutation({
//       mutationFn: (user: { email: string; password: string }) =>
//         signInAccount(user),
//     });
//   };