"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

function Avatar({
  className = "",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

function AvatarImage({
  className = "",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={`aspect-square h-full w-full ${className}`}
      {...props}
    />
  );
}

function AvatarFallback({
  className = "",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={`flex h-full w-full items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-600 ${className}`}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };