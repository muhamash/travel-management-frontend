import
  {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useGetTourTypesQuery } from "../../../redux/features/api/tour/tour.api";
import { AddTourTypeModal } from "./addTourTypeModal";

 
export default function AddTourType ()
{
  const { data } = useGetTourTypesQuery();
  console.log( data );

  return (
    <div className="flex flex-col max-w-7xl gap-8">
      <div className="flex justify-between items-center text-muted-foreground">
        <p>Tour types</p>
        <AddTourTypeModal/>
      </div>
      <div className="overflow-hidden  mx-auto w-full rounded-md border-1 border-accent text-muted-foreground shadow-2xl ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-violet-500">Name</TableHead>
              <TableHead className="text-violet-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data?.map( item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium w-full">{item.name}</TableCell>
                  <Button size={"icon"} className="m-1">
                    <Trash2Icon />
                  </Button>
                </TableRow>
              ) )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
