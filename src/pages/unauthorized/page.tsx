import { Link } from "react-router";

export default function UnAuthorizedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
         <p className="text-xl text-muted-foreground"> Unauthorized people!!</p>
          <Link className="px-5 py-2 bg-cyan-600 text-white shadow-accent-foreground shadow-lg" to={"/"}>Home</Link>
    </div>
  )
}
