 
import { useCustomToast } from "../../../components/layouts/MyToast";
import { defaultTourValues, type TourFormValues } from "../../../constants/createTour";
import { useAddTourMutation, useGetDivisionQuery, useGetTourTypesQuery } from "../../../redux/features/api/tour/tour.api";
import TourForm from "./TourForm";

export default function AddTourPage ()
{
  const {  data: divisionData, isLoading: divisionDataLoading } = useGetDivisionQuery();
  const { data: tourTypes, isLoading: tourTypesLoading } = useGetTourTypesQuery();

  const [ addTour ] = useAddTourMutation();
  const { showToast, updateToast } = useCustomToast();
  
  const selectorData = {
    divisionData,
    divisionDataLoading,
    tourTypes,
    tourTypesLoading
  }
  
  const handleSubmit = async ( data: TourFormValues ) =>
  {
    console.log( data );
    const toastId = showToast( {
      message: "Trying to create a tour!",
      type: "info"
    } );

    try 
    {
      const res = await addTour(data).unwrap();
      console.log( res );


      updateToast( toastId, {
        message: res?.message,
        type: "success"
      } );
    }
    catch ( error )
    {
      console.log( error );
      updateToast( toastId, {
        message: error?.data?.message,
        type: "error"
      } );
    }

  }

  return (
    <div className="text-muted-foreground">
      <p className="text-2xl text-center py-10 uppercase">Add Tour form</p>

      <TourForm selectorData={selectorData} initialValues={defaultTourValues} onSubmit={handleSubmit}/>
    </div>
  )
}