'use client'

import { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"

const predefinedCategories = [
  "Technology", "Health", "Sports", "Cultural",
]

export default function CategorySelector({setValue}) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setValue("category", selectedCategories); // Update form data
  }, [selectedCategories, setValue]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="w-full max-w-md">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between"
            aria-expanded={isOpen}
            aria-label="Select categories"
          >
            <span className="truncate">
              {selectedCategories.length > 0
                ? `${selectedCategories.length} categor${selectedCategories.length === 1 ? 'y' : 'ies'} selected`
                : 'Select Categories'}
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0 bg-white" align="start">
          <ScrollArea className="h-[300px] p-4">
            {predefinedCategories.map((category) => (
              <div key={category} className="flex items-center space-x-3 mb-3 ">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label 
                  htmlFor={category} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </Label>
              </div>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {/* <div className="mt-2 text-sm text-muted-foreground h-6 overflow-hidden">
        {selectedCategories.length > 0 && (
          <div className="truncate">
            Selected: {selectedCategories.join(', ')}
          </div>
        )}
      </div> */}
    </div>
  )
}