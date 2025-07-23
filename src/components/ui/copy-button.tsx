import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

interface CopyButtonProps extends ComponentProps<typeof Button> {
  value: string;
}

export function copyToClipboard(value: string) {
  return navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant as any}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className
      )}
      onClick={async () => {
        await copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <ClipboardCheckIcon className="text-green-500" />
      ) : (
        <ClipboardIcon />
      )}
    </Button>
  );
}
