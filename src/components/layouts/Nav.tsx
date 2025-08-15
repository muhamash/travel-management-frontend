import { Button } from "@/components/ui/button"
import
  {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import
  {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Link } from "react-router"
import Logo from "../../assets/icons/NavIcon"
import { authApi, useLogoutMutation, useUserDataQuery } from "../../redux/features/api/auth/auth.api"
import { useAppDispatch } from "../../redux/hooks"
import { ModeToggle } from "./ThemeToggler"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", active: true, role: "PUBLIC" },
  { href: "/about", label: "About",  role: "PUBLIC" },
  { href: "/admin", label: "Dashboard",  role: "ADMIN" },
  { href: "/user", label: "Dashboard",  role: "USER" },
]

import { useLocation, useNavigate } from "react-router"

export default function Nav() {
  const { data, isLoading, error } = useUserDataQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/login");
  };

  // Determine which links to show
  const filteredLinks = navigationLinks.filter(link =>
    link.role === "PUBLIC" || link.role === data?.data?.role
  );

  console.log(data?.data?.role)

  return (
    <header className="border-b bg-ring">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-2">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                {/* burger icon */}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {filteredLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        className="py-1.5"
                        active={location.pathname === link.href}
                        asChild
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop Menu */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {filteredLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      active={location.pathname === link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      asChild
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="text-sm text-muted-foreground">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <Button asChild size="sm" className="text-sm text-primary-foreground">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

