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
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCustomToast } from "../../../components/layouts/MyToast";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddTourTypeMutation } from "../../../redux/features/api/tour/tour.api";

const tourTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tour type name is required")
    .max(50, "Must be at most 50 characters"),
});

type TourTypeForm = z.infer<typeof tourTypeSchema>;

export function AddTourTypeModal() {
  const form = useForm<TourTypeForm>( {
    resolver: zodResolver( tourTypeSchema ),
    defaultValues: { name: "" },
    mode: "onChange",
  } );

  const { showToast } = useCustomToast();
  const [ addTourType ] = useAddTourTypeMutation();

  const onSubmit: SubmitHandler<TourTypeForm> = async ( data ) =>
  {
    
    try
    {
      const res = await addTourType( data );

      console.log( "Form submitted:", data, res );

      showToast( {
        type: "success",
        message: res.data?.message,
      } );

      form.reset();
    }
    catch ( error )
    {
      console.log( error )
      
      showToast( {
        type: "error",
        message: error.message || "Failed to create tour type!!",
      } );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          Add tour type
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] text-muted-foreground">
        <Form {...form}>
          <form id="tour-type" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
              <DialogTitle>Add tour type</DialogTitle>
              <DialogDescription>
                Enter a name for the tour type and save changes.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 pb-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour type name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Adventure"
                        {...field}
                        type="text"
                        required
                        aria-invalid={!!form.formState.errors.name}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display tour type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
