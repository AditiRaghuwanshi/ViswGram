"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import Loader from "../../components/shared/Loader";
import { SignupValidation } from "../../lib/validation";
import { useCreateUserAccount, useSignInAccount } from "../../lib/React-Query/queries";
import { useUserContext } from "../../context/AuthContext";





// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const  navigate = useNavigate();
  

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
  
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

   if(!newUser) {
    return toast({ title: ' Sign up failed... Please try again.'});
   }
   const session = await signInAccount({
    email: values.email,
    password: values.password,
   })

   if(!session) {
    return toast({title: 'Sign in failed. Please try again.'})
   }

   const isLoggedIn = await checkAuthUser();

   if(isLoggedIn) {
    form.reset();

    navigate('/')
   } else {
    return toast({title: 'Sign up failed. please try again.'})
   }
 }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex gap-1">
          <img src="/assets/images/like.png" alt="logo"></img>
          <h1>ViswGram</h1>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-red-300 small-medium md:base-regular mt-2">
          To use VisawGram, please enter the following details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4 rounded-xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
             {
              isCreatingAccount  ? (
                <div className="flex-center gap-2 ">
                  <Loader />Loading...
                </div>
              ):"Sign up" 
             }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-red-300 text-small-semibold ml-1">
            Log in
            </Link>
          </p>



        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
