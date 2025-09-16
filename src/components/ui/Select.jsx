import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const Select = ({ children, defaultValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || '');

  const handleSelect = (newValue) => {
    setValue(newValue);
    setIsOpen(false);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          isOpen, 
          setIsOpen, 
          value, 
          onSelect: handleSelect 
        })
      )}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, isOpen, setIsOpen, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    onClick={() => setIsOpen(!isOpen)}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder, value }) => (
  <span className={cn(!value && 'text-muted-foreground')}>
    {value || placeholder}
  </span>
);

const SelectContent = ({ children, isOpen, onSelect }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full z-50 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
      {React.Children.map(children, child =>
        React.cloneElement(child, { onSelect })
      )}
    </div>
  );
};

const SelectItem = React.forwardRef(({ className, children, value, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    onClick={() => onSelect(value)}
    {...props}
  >
    {children}
  </div>
));
SelectItem.displayName = 'SelectItem';

const SelectGroup = ({ children }) => <div>{children}</div>;

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup };
