"use client";

import { QueryErrorStateProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "@/icons/Icons";
import { cn } from "@/lib/utils";

function extractErrorMessage(error: unknown): string | null {
  if (!error) return null;

  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    "data" in error &&
    error?.data &&
    typeof (error as any).data === "object"
  ) {
    const data = (error as any).data;
    if (typeof data.message === "string") {
      return data.message;
    }
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const first = data.errors[0];
      if (typeof first === "string") {
        return first;
      }
      if (first?.message) {
        return String(first.message);
      }
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return (error as any).message;
  }

  return null;
}

export function QueryErrorState({
  error,
  title = "Something went wrong",
  description,
  supportText,
  onRetry,
  retryLabel = "Try again",
  className,
}: QueryErrorStateProps) {
  const resolvedMessage = description ?? extractErrorMessage(error);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-center",
        className,
      )}
    >
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <div>
        <h3 className="text-base font-semibold text-destructive">{title}</h3>
        {resolvedMessage && (
          <p className="mt-1 text-sm text-muted-foreground">{resolvedMessage}</p>
        )}
        {supportText && (
          <p className="mt-2 text-xs text-muted-foreground/80">{supportText}</p>
        )}
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-2 flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}


