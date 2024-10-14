import * as React from "react";
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
import useSearchUsers from "@/hooks/useSearchUsers"; 
import { useCoordinator } from "@/hooks/useCoordinator";

export default function CoordinatorSelector({ setValue }) {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    
    const { selectedCoordinators, addCoordinator, removeCoordinator } = useCoordinator();

    const { data: searchedUsers, loading } = useSearchUsers(searchTerm);

    React.useEffect(() => {
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
                                        {searchedUsers.find((c) => c._id === value)?.firstname}{" "}
                                        {searchedUsers.find((c) => c._id === value)?.lastname}
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
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        {loading && <CommandEmpty>Loading...</CommandEmpty>}
                        {!loading && searchTerm && searchedUsers.length === 0 && (
                            <CommandEmpty>No coordinator found.</CommandEmpty>
                        )}
                        {!loading && (
                            <CommandGroup>
                                {searchedUsers.map((coordinator) => (
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