/* eslint-disable @typescript-eslint/no-unused-vars */
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
      <p className="text-2xl text-center py-10 uppercase">Add Tour form</p>

      <TourForm initialValues={defaultTourValues} onSubmit={handleSubmit}/>
    </div>
  )
}