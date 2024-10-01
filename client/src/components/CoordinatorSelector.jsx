"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import useAdminInfo from "@/hooks/useAdminInfo"; 
import { useCoordinator } from "@/hooks/useCoordinator";

export function CoordinatorSelector({ setValue }) {
  const [open, setOpen] = React.useState(false);

  // Use context instead of local state
  const { selectedCoordinators, addCoordinator, removeCoordinator } =useCoordinator();

  // Fetch the adminInfo and map the data to use _id and fullname
  const adminInfo = useAdminInfo();
  const coordinators = adminInfo.length > 0 ? adminInfo : [];

  React.useEffect(() => {
    setValue("coordinator", selectedCoordinators); // Set the value of coordinators field
  }, [selectedCoordinators, setValue]);

  const toggleCoordinator = (value) => {
    if (selectedCoordinators.includes(value)) {
      removeCoordinator(value);
    } else {
      addCoordinator(value);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedCoordinators.length > 0 ? (
            <div className="flex flex-wrap gap-1 max-w-[250px] overflow-hidden ">
              {selectedCoordinators.map((value) => (
                <Badge key={value} variant="secondary" className="mr-1 mb-1">
                  {coordinators.find((c) => c._id === value)?.firstname}{" "}
                  {coordinators.find((c) => c._id === value)?.lastname}
                  <div
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        removeCoordinator(value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => removeCoordinator(value)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ))}
            </div>
          ) : (
            "Select coordinators..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search coordinators..." />
          <CommandList>
            <CommandEmpty>No coordinator found.</CommandEmpty>
            <CommandGroup>
              {coordinators.map((coordinator) => (
                <CommandItem
                  key={coordinator._id}
                  onSelect={() => toggleCoordinator(coordinator._id)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCoordinators.includes(coordinator._id)}
                      onCheckedChange={() => toggleCoordinator(coordinator._id)}
                    />
                    <span>
                      {coordinator.firstname} {coordinator.lastname}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
