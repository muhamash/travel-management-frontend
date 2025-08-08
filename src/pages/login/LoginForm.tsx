import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Link } from "react-router"
import NavIcon from "../../assets/icons/NavIcon"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <NavIcon/>
              </div>
              <span className="sr-only">Travel Inc.</span>
            </a>
            <h1 className="text-xl md:text-4xl font-bold text-muted-foreground">Welcome to Travel Inc.</h1>
            <div className="text-center text-md md:text-xl text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link className="underline underline-offset-4 text-red-700 font-bold bg-background px-3 py-2 rounded-md" to={"/register"}>Sign up</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Login
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
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}