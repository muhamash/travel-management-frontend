/* eslint-disable @typescript-eslint/no-unused-vars */
 
import
    {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
    } from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
}

export function RemoveTourTypeAlert (  { children, onConfirm }: IProps )
{
    const handleConfirm = () =>
    {
        onConfirm();
    };
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} className="m-1">
                    <Trash2Icon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-red-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}