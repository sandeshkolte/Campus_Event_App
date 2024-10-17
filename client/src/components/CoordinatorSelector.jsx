'use client'

import React, { useState, useEffect } from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useCoordinator } from "@/hooks/useCoordinator";
import { baseUrl } from "@/common/common";
import axios from "axios";
import debounce from "debounce";

// Custom hook to handle user search
function useSearchUsers(searchTerm) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = debounce(async (searchTerm) => {
      if (searchTerm) {
        setLoading(true);
        try {
          const response = await axios.post(baseUrl + "/api/user/getallusers", {
            search: searchTerm,
          });
          setData(response.data.response);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setData([]);
      }
    }, 300); // 300ms debounce

    fetchUsers(searchTerm); // Call fetchUsers when searchTerm changes

    return () => {
      fetchUsers.clear(); // Cleanup debounce function
    };
  }, [searchTerm]);

  return { data, loading };
}

export default function CoordinatorSelector({ setValue }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { selectedCoordinators, addCoordinator, removeCoordinator } = useCoordinator();
  const { data, loading } = useSearchUsers(searchTerm); // Use custom hook for search

  useEffect(() => {
    setValue("coordinator", selectedCoordinators);
  }, [selectedCoordinators, setValue]);

  const toggleCoordinator = (value) => {
    if (selectedCoordinators.includes(value)) {
      removeCoordinator(value);
    } else {
      addCoordinator(value);
    }
  };

  const handleRemoveCoordinator = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    removeCoordinator(value);
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value); // Just update the search term, the hook will handle the data fetching
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
          <div className="flex-1 text-left flex items-center flex-wrap gap-1 max-w-[250px] overflow-hidden">
            {selectedCoordinators.length > 0 ? (
              selectedCoordinators.map((value) => (
                <Badge
                  key={value}
                  variant="secondary"
                  className="mr-1 mb-1 flex items-center bg-gray-100 shadow-lg rounded-xl px-2 py-1"
                >
                  <span className="truncate max-w-[100px]">
                    {data.find((c) => c._id === value)?.firstname}{" "}
                    {data.find((c) => c._id === value)?.lastname}
                  </span>
                  <span
                    className="ml-1 cursor-pointer ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => handleRemoveCoordinator(e, value)}
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </span>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Select coordinators...</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-white">
        <Command>
          <CommandInput
            placeholder="Search coordinators..."
            value={searchTerm}
            onValueChange={handleSearchTermChange} // Set the search term on change
          />
          <CommandList>
            {loading && <CommandEmpty>Loading...</CommandEmpty>}
            {!loading && searchTerm && data.length === 0 && (
              <CommandEmpty>No coordinator found.</CommandEmpty>
            )}
            {!loading && (
              <CommandGroup>
                {data.map((coordinator) => (
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
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
