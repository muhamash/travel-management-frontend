import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import
    {
        Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
    } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectContent } from '@radix-ui/react-select'
import { useMemo } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Select, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { defaultTourValues, type TourFormValues } from '../../../constants/createTour'
import { ArrayField } from './AddTourArrayField'
import { DateField } from './DateField'
import { TourSchema } from './tour.zod'

export default function TourForm ( {
    onSubmit,
    initialValues,
    selectorData
}: {
  onSubmit?: (values: TourFormValues) => void | Promise<void>
  initialValues?: Partial<TourSchema>
}) {
    const form = useForm<TourFormValues>( {
        resolver: zodResolver( TourSchema ),
        defaultValues: useMemo( () => ( { ...defaultTourValues, ...initialValues } ), [ initialValues ] ),
        mode: 'onBlur',
    } );

    // console.log( selectorData );

    const handleSubmit: SubmitHandler<TourFormValues> = async ( values ) =>
    {

        await onSubmit?.( values )

        if ( !onSubmit ) console.log( 'Submitting tour payload:', values )
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( handleSubmit )} className="grid gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Basics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tour title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Short description" className="min-h-[110px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* selector */}
                            <div className="flex flex-wrap justify-between items-center gap-4">

                                {/* select for division */}
                                <FormField
                                    control={form.control}
                                    name="division"
                                    render={( { field } ) => (
                                        <FormItem>
                                            <FormLabel>Select divisions</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Select a verified division" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                                                    w-[var(--radix-select-trigger-width)]  
                                                    max-h-60 overflow-y-auto               
                                                    border-white/20 p-2
                                                    bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30
                                                    backdrop-blur-md backdrop-saturate-150 shadow-lg rounded-md
"
                                                >
                                                    {selectorData?.divisionDataLoading ? (
                                                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                                                    ) : (
                                                        selectorData?.divisionData?.map( ( division ) => (
                                                            <SelectItem key={division.id} value={division.id}>
                                                                {division.name}
                                                            </SelectItem>
                                                        ) )
                                                    )}
                                                </SelectContent>

                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* select for tour types */}
                                <FormField
                                    control={form.control}
                                    name="tourType"
                                    render={( { field } ) => (
                                        <FormItem>
                                            <FormLabel>Select tour types</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Select a verified tour types" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent
                                                    className="
                                                    w-[var(--radix-select-trigger-width)]  
                                                    max-h-60 overflow-y-auto               
                                                    border-white/20 p-2
                                                    bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30
                                                    backdrop-blur-md backdrop-saturate-150 shadow-lg rounded-md
"
                                                >
                                                    {selectorData?.tourTypesLoading ? (
                                                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                                                    ) : (
                                                        selectorData?.tourTypes?.map( ( type ) => (
                                                            <SelectItem key={type.id} value={type.id}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ) )
                                                    )}
                                                </SelectContent>

                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="location"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Cox's Bazar" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="costFrom"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Starting Cost (BDT)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                {...field}
                                                onChange={( e ) => field.onChange( Number( e.target.value ) )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={( { field } ) => (
                                        <FormItem>
                                            <DateField
                                                label="Start Date"
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Pick start date"
                                                onDisable={( date ) =>
                                                    date > new Date()
                                                }
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={( { field } ) => (
                                        <FormItem>
                                            <DateField
                                                label="End Date"
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Pick end date"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Capacity & Policy</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="maxGuest"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Max Guests</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                {...field}
                                                onChange={( e ) => field.onChange( Number( e.target.value ) )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minAge"
                                render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Minimum Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                {...field}
                                                onChange={( e ) => field.onChange( Number( e.target.value ) )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ArrayField
                                name="images"
                                control={form.control}
                                label="Image URLs"
                                placeholder="https://..."
                                buttonLabel="Add URL"
                            />
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>What’s Included</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <ArrayField
                                name="included"
                                control={form.control}
                                label="Included"
                                placeholder="e.g., Transport"
                            />
                            <Separator />
                            <ArrayField
                                name="excluded"
                                control={form.control}
                                label="Excluded"
                                placeholder="e.g., Personal expenses"
                                buttonLabel="Add"
                            />
                            <Separator />
                            <ArrayField
                                name="amenities"
                                control={form.control}
                                label="Amenities"
                                placeholder="e.g., Hotel"
                            />
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Tour Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ArrayField
                                name="tourPlan"
                                control={form.control}
                                label="Itinerary Items"
                                placeholder="e.g., Day 1: Arrival"
                            />
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3 justify-end">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" disable={!form.formState.isValid || form.formState.isSubmitting} className={`${form.formState.isValid || !form.formState.isSubmitting ? "cursor-pointer" : "cursor-progress"}`}>{ form.formState.isSubmitting ? "Working.." : "Create"}</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}