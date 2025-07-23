import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ModeToggle } from "../components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { type Locale, locales, parseFormat } from "../utils/parse";
import { CopyButton } from "../components/ui/copy-button";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [value, setValue] = useState("");
  const [selectedLocale, setSelectedLocale] = useState<Locale>("en-US");

  const format = useMemo(() => {
    return parseFormat(value, { locale: selectedLocale });
  }, [value, selectedLocale]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative bg-background flex flex-col gap-4 justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold text-center leading-tight">
          date-fns-parse
        </h1>

        <div className="min-w-64 max-w-96 relative">
          <Input placeholder="e.g. 03/04/2025" onChange={onChange} />
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center mr-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <code className="text-xs bg-accent p-1 rounded-md">
                  {selectedLocale}
                </code>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((locale) => (
                  <DropdownMenuCheckboxItem
                    key={locale}
                    checked={locale === selectedLocale}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLocale(locale);
                      }
                    }}
                  >
                    {locale}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-row items-center gap-2",
            format ? "visible" : "invisible"
          )}
        >
          <code className="bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {format}
          </code>
          <CopyButton value={format ?? ""} />
        </div>
      </div>
      <ModeToggle className="absolute bottom-4 left-4" />
    </div>
  );
}
