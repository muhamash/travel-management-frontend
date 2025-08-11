import
    {
        Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage
    } from "@/components/ui/form";
import
    {
        InputOTP,
        InputOTPGroup,
        InputOTPSlot,
    } from "@/components/ui/input-otp";
import { useForm, type FieldValues } from "react-hook-form";
import { InputOTPSeparator } from "../../components/ui/input-otp";

export default function OtpForm ()
{
    const form = useForm();

    const onSubmit = async ( data: FieldValues ) =>
    {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form id="otp-form" onSubmit={form.handleSubmit( onSubmit )} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="pin"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
