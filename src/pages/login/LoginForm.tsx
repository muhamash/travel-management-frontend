import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValue, type SubmitErrorHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import NavIcon from "../../assets/icons/NavIcon";
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
import { useLoginMutation } from "../../redux/features/api/auth/auth.api";

const loginSchema = z.object( {
  email: z.email().min( 2 ).max( 50 ),
  password: z.string().min( 6 ).max( 50 ),
} );


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form"> )
{
  const form = useForm<z.infer<typeof loginSchema>>( {
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  } );

  const [ loginUser, { isLoading, error } ] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitErrorHandler<FieldValue> = async ( data: z.infer<typeof loginSchema> )=>{
    console.log( data );

    try
    {
      const result = await loginUser().unwrap();
      console.log( result, { isLoading, error } );

      if ( !result?.data?.isVerified && !result?.data?.isBlocked )
      {
        navigate("/verify")
      }
      else
      {
        navigate("/")
      }

      toast.success( "Registered successfully!!", {
        description: "Welcome aboard! You can now log in to your account.",
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
    catch ( error )
    {
      toast.error( error?.data?.message || "Login failed", {
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

      console.log(error)
    }
  }


  return (
    <div className={cn(
      "flex flex-col gap-6",
      "bg-teal-700/50 backdrop-blur-md border border-gray-500 rounded-lg shadow-lg md:px-10 py-5 p-3",
      className
    )} >
      <Form {...form}>
        <form onSubmit={form.handleSubmit( onSubmit )} {...props}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <NavIcon />
                </div>
                <span className="sr-only">Travel Inc.</span>
              </a>
              <h1 className="text-xl text-center md:text-4xl font-bold text-muted-foreground">Welcome to Travel Inc.</h1>
              <div className="text-center text-sm md:text-md text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link className="underline underline-offset-4 text-red-700 font-bold bg-background px-3 py-2 rounded-md" to={"/register"}>Sign up</Link>
              </div>
            </div>

            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={( { field } ) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} type="email" />
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
              <Button type="submit" className="w-full cursor-pointer">
                Register
              </Button>
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div>
            <div className="">
              <Button variant="outline" type="button" className="w-full text-muted-foreground cursor-pointer">
                Continue with Google
              </Button>

            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}