 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquareCheckBig, XCircle } from "lucide-react";
import { useForm, type FieldValue, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import
    {
        Form,
        FormControl,
        FormDescription,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
    } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useRegisterMutation } from "../../redux/features/api/auth/auth.api";
 
const formSchema = z.object( {
    name: z.string().min( 2 ).max( 50 ),
    email: z.email().min( 2 ).max( 50 ),
    password: z.string().min( 6 ).max( 50 ),
    confirmPassword: z.string().min( 6 ).max( 50 ),
} ).refine( ( data ) => data.password === data.confirmPassword, {
    message: "password do not match!",
    path: [ "confirmPassword" ]
} );

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"form"> )
{
    const [ registerUser, { isLoading, error } ] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    } );

    const onSubmit: SubmitHandler<FieldValue> = async ( data: z.infer<typeof formSchema> ) =>
    {
        try
        {
            const result = await registerUser( data ).unwrap();
            console.log( result, { isLoading, error } );

            navigate("/verify", {state: result?.data?.email})
            
            toast.success( `Registered successful : ${result?.message}`, {
                icon: <SquareCheckBig className="text-yellow-500" />,
                style: {
                    background: "rgba(30, 73, 34, 0.532)", // semi-transparent white
                    backdropFilter: "blur(12px) saturate(180%)", // glass effect
                    WebkitBackdropFilter: "blur(12px) saturate(180%)",
                    border: "1px solid rgba(8, 67, 94, 0.25)",
                    color: "#ffffff",
                    borderRadius: "16px",
                    padding: "14px 18px",
                    fontWeight: "500",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                },
                duration: 4000,
            } );
        }
        catch ( error: unknown )
        {
            toast.error( error?.data?.message || "Registration failed", {
                description: "Please check your details and try again.",
                icon: <XCircle className="text-red-500" />,
                // unstyled: true,
                // classNames: {
                //     description: "text-white",
                // },
                style: {
                    background: "rgba(255, 0, 212, 0.15)", // semi-transparent white
                    backdropFilter: "blur(12px) saturate(180%)", // glass effect
                    WebkitBackdropFilter: "blur(12px) saturate(180%)",
                    border: "1px solid #fca5a5",
                    color: "#6c0505",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    fontWeight: "500",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
                duration: 4500,
            } );
            
            console.log( error )
        }

        console.log( data );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit( onSubmit )}
                className={cn( "flex flex-col gap-6 text-gray-500", className )}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold text-muted-foreground">
                        Registration to your account
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your info below to register to your account
                    </p>
                </div>

                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email" {...field} type="email"/>
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Your password" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Re type your password" type="password" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display confirm password field.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full cursor-pointer">
                        Register
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Have an account?{" "}
                    <Link className="underline underline-offset-4" to="/login">
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    );
}