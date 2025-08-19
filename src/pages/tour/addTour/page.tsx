 
 
import { useState } from "react";
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
  const [ thumbnails, setThumbnails ] = useState( [] );
  
  const selectorData = {
    divisionData,
    divisionDataLoading,
    tourTypes,
    tourTypesLoading
  }
  
  const handleSubmit = async ( data: TourFormValues ) =>
  {
    const toastId = showToast( { message: "Trying to create a tour!", type: "loading", autoClose: false } );

    try
    {
      const formData = new FormData();
      formData.append( "data", JSON.stringify( data ) );

      thumbnails.forEach( ( file: File ) =>
      {
        formData.append( "files", file );
      } );

      // const res = await axios.post( "http://localhost:3000/api/v1/tour/create-tour", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   withCredentials: true
      // } );

      const res = await addTour( formData ).unwrap();

      console.log(res)

      updateToast( toastId, { message: res?.message, type: "success" } );
      console.log( res.data );
    } catch ( error )
    {
      console.log( error );
      updateToast( toastId, {
        message: error?.data?.message,
        type: "error"
      } );
    }
  };

  return (
    <div className="text-muted-foreground">
      <p className="text-2xl text-center py-10 uppercase">Add Tour form</p>

      <TourForm selectorData={selectorData} initialValues={defaultTourValues} onSubmit={handleSubmit} setThumbnails={ setThumbnails } />
    </div>
  )
}