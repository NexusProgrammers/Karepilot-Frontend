import React from 'react';
import { LoadingSpinner } from './Loading';
import { cn } from '@/lib/utils';

interface FullScreenLoadingProps {
  message?: string;
  variant?: 'spinner' | 'dots';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function FullScreenLoading({
  message = 'Loading...',
  variant = 'spinner',
  size = 'lg',
  className,
}: FullScreenLoadingProps) {
  return (
    <div className={cn('min-h-screen bg-background flex items-center justify-center', className)}>
      <div className="text-center space-y-4">
        {variant === 'spinner' ? (
          <LoadingSpinner size={size} className="mx-auto" />
        ) : (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <p className="text-muted-foreground text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

interface InlineLoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function InlineLoading({
  message = 'Loading...',
  size = 'md',
  className,
}: InlineLoadingProps) {
  return (
    <div className={cn('flex items-center justify-center space-x-2 py-4', className)}>
      <LoadingSpinner size={size} />
      <span className="text-muted-foreground text-sm">{message}</span>
    </div>
  );
}

interface ButtonLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ButtonLoading({ size = 'sm', className }: ButtonLoadingProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <LoadingSpinner size={size} />
      <span>Loading...</span>
    </div>
  );
}
