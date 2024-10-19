import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverComponent({trigger,content}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">{trigger}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white ">
        {content}
      </PopoverContent>
    </Popover>
  )
}
