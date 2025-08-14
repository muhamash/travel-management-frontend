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
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useCustomToast } from "../../components/layouts/MyToast";
import { Button } from "../../components/ui/button";
import OtpForm from "./otpForm";

// Step messages for maintainability
const MESSAGES = {
  notVerified: "You are not verified!",
  otpPrompt: "Let’s verify who you are!",
  otpHint: "Please enter the OTP sent to your email",
  success: "Verification Successful!"
};

export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast, updateToast } = useCustomToast(); 

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect( () =>
  {
    // if (!location.state) navigate("/");
    
    if ( otpSent )
    {
      const handleBeforeUnload = ( e: BeforeUnloadEvent ) =>
      {
        e.preventDefault();
        e.returnValue = ""; // This triggers the browser's "Are you sure?" dialog
      };

      window.addEventListener( "beforeunload", handleBeforeUnload );

      return () => window.removeEventListener( "beforeunload", handleBeforeUnload );
    }
  }, [ location.state, navigate ] );

  const handleSendOtp = useCallback( async () =>
  {

    try
    {
      // Show loading toast and store the ID so we can update it later
     const toastId = showToast( {
        type: "loading",
        message: "Sending OTP...",
        autoClose: false, // prevent it from disappearing automatically
      } );

      // Simulate OTP send delay
      await new Promise( ( resolve ) => setTimeout( resolve, 3000 ) );

      // Update toast to success
      updateToast( toastId, {
        // update existing toast
        type: "success",
        message: "OTP Sent Successfully",
      } );

      localStorage.setItem( "otpSent", "true" );
      setOtpSent( true );
    } catch ( err )
    {
      // Update toast to error
      showToast( {
        // id: toastId,
        type: "error",
        message: `Something went wrong: ${ ( err as Error ).message }`,
      } );

      localStorage.setItem( "otpSent", "false" );
      setOtpSent( false );
    }
  }, [ showToast ] );
  
  const handleOtpSuccess = useCallback(() => setVerified(true), []);
  const handleContinue = useCallback(() => navigate("/"), [navigate]);

  // Step 1: Initial confirmation
  const renderInitialStep = () => (
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
      >
        Yes, send it!
      </Button>
    </div>
  );

  // Step 2: OTP form
  const renderOtpStep = () => (
    <>
      <CardHeader className="text-center">
        <CardTitle className="font-semibold text-xl">{MESSAGES.otpPrompt}</CardTitle>
        <CardDescription className="font-mono text-sm">{MESSAGES.otpHint}</CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm onSuccess={handleOtpSuccess} />
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
  );

  // Step 3: Success
  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <CheckCircle2 className="text-green-500 w-16 h-16 animate-bounce" />
      <h2 className="text-2xl font-bold text-green-700">{MESSAGES.success}</h2>
      <p className="text-gray-700">You have successfully verified your identity 🎉</p>
      <Button
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen grid place-content-center bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30 rounded-2xl animate-fadeIn">
        {verified
          ? renderSuccessStep()
          : otpSent
          ? renderOtpStep()
          : renderInitialStep()}
      </Card>
    </div>
  );
}