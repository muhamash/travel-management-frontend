/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import
    {
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage
    } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

export function ArrayField ( {
  name,
  control,
  label,
  placeholder,
  buttonLabel = 'Add',
}: {
  name: keyof TourFormValues
  control: any
  label: string
  placeholder?: string
  buttonLabel?: string
}) {
  const { fields, append, remove } = useFieldArray({ name: name as string, control })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel>{label}</FormLabel>
        <Button type="button" variant="secondary" size="sm" onClick={() => append('')}>
          <Plus className="h-4 w-4 mr-1" /> {buttonLabel}
        </Button>
      </div>
      <div className="space-y-2">
        {fields.map((f, idx) => (
          <div key={f.id} className="flex gap-2">
            <FormField
              name={`${name}.${idx}` as any}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" onClick={() => remove(idx)} className="shrink-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}