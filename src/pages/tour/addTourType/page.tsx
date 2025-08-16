import { useGetTourTypesQuery } from "../../../redux/features/api/tour/tour.api";

export default function AddTourType ()
{
  const { data } = useGetTourTypesQuery();
  console.log( data );
  
  return (
    <div className="text-muted-foreground">
      add Tour type
    </div>
  )
}
