import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    return (
        <form className={cn( "flex flex-col gap-6", className )} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-muted-foreground">Registration to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your info below to register to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label className="text-pink-900" htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                    Register
                </Button>
                
            </div>
            <div className="text-center text-sm text-gray-400">
                Have an account?{" "}
                <Link className="underline underline-offset-4" to={"/login"}>Login</Link>
            </div>
        </form>
    );
}
