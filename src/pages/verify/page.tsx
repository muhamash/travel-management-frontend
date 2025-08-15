import
  {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card";
import { CheckCircle2, XCircleIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useCustomToast } from "../../components/layouts/MyToast";
import { Button } from "../../components/ui/button";
import OtpForm from "./otpForm";

const RESEND_DELAY = 10; 

const MESSAGES = {
  notVerified: "You are not verified!",
  otpPrompt: "Let’s verify who you are!",
  otpHint: "Please enter the OTP sent to your email",
  success: "Verification Successful!"
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast, updateToast } = useCustomToast();

  const [status, setStatus] = useState<"initial" | "otp" | "verified">("initial");
  const [timer, setTimer] = useState(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect( () =>
  {
    // Countdown logic
    if ( timer > 0 )
    {
      countdownRef.current = setInterval( () =>
      {
        setTimer( ( prev ) =>
        {
          if ( prev <= 1 )
          {
            clearInterval( countdownRef.current! );
            return 0;
          }
          return prev - 1;
        } );
      }, 1000 );
    }

    // Before unload logic
    const handleBeforeUnload = ( event: BeforeUnloadEvent ) =>
    {
      if ( timer > 0 && status !== "verified" )
      {
        event.preventDefault();
        event.returnValue = `Your OTP will expire in ${ timer } seconds. Are you sure you want to leave?`;
      }
    };
    window.addEventListener( "beforeunload", handleBeforeUnload );

    return () =>
    {
      // Cleanup both timer and event listener
      if ( countdownRef.current ) clearInterval( countdownRef.current );
      window.removeEventListener( "beforeunload", handleBeforeUnload );
    };
  }, [ timer, status ] );

  const handleSendOtp = useCallback(async () => {
    if (timer > 0) return;

    setTimer(RESEND_DELAY); 
    try {
      const toastId = showToast({
        type: "loading",
        message: "Sending OTP...",
        autoClose: false
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); 

      updateToast(toastId, {
        type: "success",
        message: "OTP Sent Successfully"
      });

      setStatus("otp");
    }
    catch ( err )
    {
      showToast({
        type: "error",
        message: `Something went wrong: ${(err as Error).message}`
      });
      setTimer(0); 
    }
  }, [timer, showToast, updateToast]);

  const handleOtpSuccess = useCallback(() => setStatus("verified"), []);
  const handleContinue = useCallback(() => navigate("/"), [navigate]);

  return (
    <div className="min-h-screen grid place-content-center bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30 rounded-2xl animate-fadeIn">
        {status === "verified" ? (
          // ✅ Success Step
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <CheckCircle2 className="text-green-500 w-16 h-16 animate-bounce" />
            <h2 className="text-2xl font-bold text-green-700">{MESSAGES.success}</h2>
            <p className="text-gray-700">
              You have successfully verified your identity 🎉
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        ) : status === "otp" ? (
          // ✅ OTP Step
          <>
            <CardHeader className="text-center">
              <CardTitle className="font-semibold text-xl">
                {MESSAGES.otpPrompt}
              </CardTitle>
              <CardDescription className="font-mono text-sm">
                {MESSAGES.otpHint}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OtpForm onSuccess={handleOtpSuccess} />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button
                form="otp-form"
                type="submit"
                className="bg-violet-500 hover:bg-violet-600 text-white shadow-lg cursor-pointer"
              >
                Submit
              </Button>
              <Button
                variant="outline"
                disabled={timer > 0}
                onClick={handleSendOtp}
                className={`${timer > 0 ? "bg-black text-slate-300 cursor-progress" : "bg-pink-800 text-white cursor-pointer "}`}
              >
                {timer > 0 ? `Resend in ${ formatTime( timer ) }` : "Resend OTP"}
              </Button>
            </CardFooter>
          </>
        ) : (
          // ✅ Initial Step
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <XCircleIcon className="text-rose-600 w-16 h-16 animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-700">{MESSAGES.notVerified}</h2>
            <p className="text-gray-600">
              We want to send an OTP to your email 📧{" "}
              <span className="text-lg font-semibold text-rose-700">
                {location?.state}
              </span>
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
              onClick={handleSendOtp}
              disabled={timer > 0}
            >
              {timer > 0 ? "Sending..." : "Yes, send it!"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};