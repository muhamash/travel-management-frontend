import { Button } from "@/components/ui/button";
import
    {
        Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from "@/components/ui/dialog";
import
    {
        Form,
        FormControl,
        FormDescription,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
    } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCustomToast } from "../../../components/layouts/MyToast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { z } from "zod";
import { Textarea } from "../../../components/ui/textarea";
import { useAddDivisionMutation } from "../../../redux/features/api/tour/tour.api";
import ImageUploader from "./ImageUploader";

const divisionSchema = z.object( {
    name: z
        .string()
        .trim()
        .min( 1, "Division name is required" )
        .max( 50, "Must be at most 50 characters" ),
    description: z
        .string()
        .trim()
        .min( 1, "Division description is required" )
        .max( 50, "Must be at most 50 characters" ),
    image: z
        .instanceof( File, { message: "Image is required" } ), 
} );

type DivisionForm = z.infer<typeof divisionSchema>;

export function AddDivisionModal() {
    const form = useForm<DivisionForm>( {
        resolver: zodResolver( divisionSchema ),
        defaultValues: {
            name: "",
            description: "",
            image: undefined,
        },
        mode: "onChange",
    } );

    const { showToast } = useCustomToast();
    const [ addDivision ] = useAddDivisionMutation();
    // const [ image, setImage ] = useState();

    const closeRef = useRef<HTMLButtonElement>( null );
    const onSubmit = async ( data: DivisionForm ) =>
    {
        try
        {

            const res = await addDivision( data ).unwrap();

            console.log(data, res)
            showToast( {
                type: "success",
                message: res?.message || "Division created successfully!",
            } );

            form.reset();
            closeRef.current?.click();
    
        } catch ( error: never )
        {
            console.error( error );
            showToast( {
                type: "error",
                message: error?.data?.message || "Failed to create division!",
            } );
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline">
                    Add division type
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] text-muted-foreground">
                <Form {...form}>
                    <form id="division-type" onSubmit={form.handleSubmit( onSubmit )} noValidate>
                        <DialogHeader>
                            <DialogTitle>Add division </DialogTitle>
                            <DialogDescription>
                                Enter a name for the division and save changes.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 pb-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>division  name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Dhaka"
                                                {...field}
                                                type="text"
                                                required
                                                aria-invalid={!!form.formState.errors.name}
                                            />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your public display division .
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>division type name</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g., Adventure description"
                                                {...field}
                                                type="text"
                                                required
                                                aria-invalid={!!form.formState.errors.name}
                                            />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your public display division description.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <ImageUploader
                                            onUpload={( file ) => field.onChange( file )}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* <ImageUploader onUpload={setImage} /> */}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                disabled={!form.formState.isValid || form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? "Saving..." : "Save changes"}
                            </Button>

                            {/* Hidden DialogClose for programmatic close */}
                            <DialogClose asChild>
                                <button type="button" ref={closeRef} className="hidden" />
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
