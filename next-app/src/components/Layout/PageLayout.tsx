import React from 'react';

export function PageLayout({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto px-4 sm:px-8 pb-8 min-h-screen ${className}`}>{children}</div>;
}
