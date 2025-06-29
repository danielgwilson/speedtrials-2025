import React from 'react';

export const Timeline = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">{children}</div>
);

export const TimelineItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start space-x-4 py-4">{children}</div>
);

export const TimelineConnector = () => (
  <div className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-300" />
);

export const TimelineHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-4">{children}</div>
);

export const TimelineIcon = ({ className }: { className?: string }) => (
  <div className={`h-10 w-10 rounded-full ${className}`} />
);

export const TimelineTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-semibold">{children}</h3>
);

export const TimelineBody = ({ children }: { children: React.ReactNode }) => (
  <div className="pl-14">{children}</div>
);
