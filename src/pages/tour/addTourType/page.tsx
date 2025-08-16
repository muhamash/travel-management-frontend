import
  {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";
import { useCustomToast } from "../../../components/layouts/MyToast";
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "../../../redux/features/api/tour/tour.api";
import { AddTourTypeModal } from "./addTourTypeModal";
import { RemoveTourTypeAlert } from "./removeTourTypeAlert";

 
export default function AddTourType ()
{
  const { data } = useGetTourTypesQuery();
  console.log( data );
  const { showToast, updateToast } = useCustomToast();
  const [ deleteTypes ] = useRemoveTourTypeMutation();

  const handleDelete = async ( id: string ) =>
  {
    console.log( id )
    const toastId = showToast( {
      type: "loading",
      message: "trying to delete the tour type!",
      autoClose: false
    } );

    try 
    {
      const res = await deleteTypes( id );
      
      console.log(res)
      updateToast( toastId, {
        type: "success",
        message: res.data.message
      } );
    }
    catch ( error )
    {
      console.log( error )

      updateToast( toastId, {
        type: "error",
        message: error?.data?.message || "Failed to delete tour type!!",
      } );
    }
  };

  return (
    <div className="flex flex-col max-w-7xl gap-8">
      <div className="flex justify-between items-center text-muted-foreground">
        <p>Tour types</p>
        <AddTourTypeModal />
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
                  <RemoveTourTypeAlert onConfirm={()=> handleDelete(item.id)}>
                  </RemoveTourTypeAlert>
                </TableRow>
              ) )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}