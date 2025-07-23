import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useMemo, useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { parseDateStringToFormats } from "@/utils/parse";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [value, setValue] = useState("");

  const formats = useMemo(() => {
    return parseDateStringToFormats(value);
  }, [value]);

  return (
    <div className="relative bg-background flex flex-col gap-4 justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold text-center leading-tight">
          date-fns-parse
        </h1>

        <div className="min-w-64 max-w-96 relative">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="e.g. 2025-07-23"
              value={value}
              onValueChange={(value) => setValue(value)}
            />
            {formats.interpretations.length === 0 ? (
              <CommandList>
                <CommandEmpty
                  className={cn(value === "" && "text-muted-foreground")}
                >
                  {value === ""
                    ? "Please enter a date/time string"
                    : "No results found."}
                </CommandEmpty>
              </CommandList>
            ) : (
              <CommandList>
                {formats.interpretations.map((interpretation) => (
                  <CommandItem
                    key={interpretation.format}
                    className="flex justify-between"
                    onSelect={() => {
                      navigator.clipboard.writeText(interpretation.format);
                      toast.success("Copied to clipboard", {
                        description: interpretation.format,
                      });
                    }}
                  >
                    {interpretation.format}
                    <CommandShortcut>
                      {format(new Date(), interpretation.format)}
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        </div>
      </div>
      <ModeToggle className="absolute bottom-4 left-4" />
    </div>
  );
}
