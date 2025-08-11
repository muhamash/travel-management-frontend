import
  {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card";
import { XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import OtpForm from "./otpForm";

export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ confirm, setConfirm ] = useState<boolean>( true );
  
  console.log(location)

  useEffect(() => {
    // if (!location.state) {
    //   navigate("/");
    // }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen grid place-content-center bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30 rounded-2xl animate-fadeIn">
        {confirm ? (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <XCircleIcon className="text-rose-600 w-16 h-16 animate-bounce" />
            <h2 className="text-2xl font-bold text-muted-foreground">You are not verified!!</h2>
            <p className="text-card-foreground">
              We wanted to send an OTP password to your Email : {location?.state}
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-shadow-muted-foreground cursor-pointer"
              onClick={() => navigate("/")}
            >
              Yes sure!
            </Button>
          </div>
        ) : (
          <>
            <CardHeader className="text-center">
              <CardTitle className=" font-semibold text-xl">
                Let’s verify who you are!
              </CardTitle>
              <CardDescription className="font-mono text-sm">
                Please enter the OTP sent to your email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OtpForm onSuccess={() => setConfirm(true)} />
            </CardContent>
            <CardFooter>
              <Button
                form="otp-form"
                type="submit"
                className="ml-auto cursor-pointer bg-violet-500 hover:bg-violet-600 text-white shadow-lg"
              >
                Submit
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
