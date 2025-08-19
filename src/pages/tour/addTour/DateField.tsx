import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import
    {
        FormLabel
    } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'


export function DateField ( {
  label,
  value,
  onChange,
    placeholder,
  onDisable,
}: {
  label: string
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
}) {
    return (
        <div className="flex flex-col gap-2">
            <FormLabel>{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={`justify-start text-left font-normal w-full ${ !value ? 'text-muted-foreground' : '' }`}
                        type="button"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format( value, 'PPP' ) : placeholder || 'Pick a date'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={value} onSelect={onChange} initialFocus disable={ onDisable } />
                </PopoverContent>
            </Popover>
        </div>
    );
}