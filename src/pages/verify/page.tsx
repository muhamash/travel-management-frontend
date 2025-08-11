import
  {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import OtpForm from "./otpForm";

export default function VerifyPage() {
  return (
    <div className="grid place-content-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Let's verify who you are!</CardTitle>
          <CardDescription>Please enter your otp password</CardDescription>
        </CardHeader>
        <CardContent>
          <OtpForm />
        </CardContent>
        <CardFooter>
          <Button form="otp-form" type="submit" className="ml-auto cursor-pointer">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}