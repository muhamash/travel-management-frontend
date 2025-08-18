import { defaultTourValues, type TourFormValues } from "../../../constants/createTour";
import { useGetDivisionQuery, useGetTourTypesQuery } from "../../../redux/features/api/tour/tour.api";
import TourForm from "./TourForm";

export default function AddTourPage ()
{
  const {  data: divisionData, isLoading: divisionDataLoading } = useGetDivisionQuery();
  const {  data: tourTypes,  isLoading: tourTypesLoading } = useGetTourTypesQuery();

  console.log( divisionData, tourTypes );
  
  const handleSubmit = async ( data: TourFormValues ) =>
  {
    console.log( data );
  }

  return (
    <div className="text-muted-foreground">
      <p>Add Tour form</p>

      <TourForm initialValues={defaultTourValues} onSubmit={handleSubmit}/>
    </div>
  )
}