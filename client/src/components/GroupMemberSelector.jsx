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
import { useMember } from "@/hooks/useMember";

export function MemberSelector({ setValue }) {
  const [open, setOpen] = React.useState(false);

  // Use context instead of local state
  const { selectedMembers, addMember, removeMember } =useMember();

  // Fetch the adminInfo and map the data to use _id and fullname
  const adminInfo = useAdminInfo();
  const Members = adminInfo.length > 0 ? adminInfo : [];

  React.useEffect(() => {
    setValue("Member", selectedMembers); // Set the value of Members field
  }, [selectedMembers, setValue]);

  const toggleMember = (value) => {
    if (selectedMembers.includes(value)) {
      removeMember(value);
    } else {
      addMember(value);
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
          {selectedMembers.length > 0 ? (
            <div className="flex flex-wrap gap-1 max-w-[250px] overflow-hidden ">
              {selectedMembers.map((value) => (
                <Badge key={value} variant="secondary" className="mr-1 mb-1">
                  {Members.find((c) => c._id === value)?.firstname}{" "}
                  {Members.find((c) => c._id === value)?.lastname}
                  <div
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        removeMember(value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => removeMember(value)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ))}
            </div>
          ) : (
            "Select Members..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search Members..." />
          <CommandList>
            <CommandEmpty>No Member found.</CommandEmpty>
            <CommandGroup>
              {Members.map((Member) => (
                <CommandItem
                  key={Member._id}
                  onSelect={() => toggleMember(Member._id)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedMembers.includes(Member._id)}
                      onCheckedChange={() => toggleMember(Member._id)}
                    />
                    <span>
                      {Member.firstname} {Member.lastname}
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
