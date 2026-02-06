import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// --- Utils ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}
export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        "h-10 py-2 px-4",
        className
      )}
      {...props}
    />
  );
};

// --- Badge ---
export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'outline' }> = ({ className, variant = 'default', ...props }) => {
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", 
      variant === 'outline' ? "text-foreground" : "border-transparent",
      className)} {...props} />
  );
};

// --- Card ---
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("rounded-lg border bg-white text-gray-950 shadow-sm", className)} {...props} />
);
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

// --- Tabs ---
const TabsContext = createContext<{ value: string; onValueChange: (value: string) => void }>({ value: '', onValueChange: () => {} });

export const Tabs: React.FC<{ value: string; onValueChange: (value: string) => void; children: React.ReactNode; className?: string }> = ({ value, onValueChange, children, className }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500", className)} {...props} />
);

export const TabsTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }> = ({ className, value, ...props }) => {
  const context = useContext(TabsContext);
  const isActive = context.value === value;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-white text-gray-950 shadow-sm" : "hover:bg-gray-200/50 hover:text-gray-700",
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    />
  );
};

export const TabsContent: React.FC<React.HTMLAttributes<HTMLDivElement> & { value: string }> = ({ className, value, children, ...props }) => {
  const context = useContext(TabsContext);
  if (context.value !== value) return null;
  return <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)} {...props}>{children}</div>;
};

// --- Select ---
// Simplified custom select implementation
const SelectContext = createContext<{ value: string; onValueChange: (value: string) => void; open: boolean; setOpen: (o: boolean) => void }>({ value: '', onValueChange: () => {}, open: false, setOpen: () => {} });

export const Select: React.FC<{ value: string; onValueChange: (value: string) => void; children: React.ReactNode; defaultValue?: string }> = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  const { open, setOpen } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

export const SelectValue: React.FC = () => {
  const { value } = useContext(SelectContext);
  return <span className="block truncate">{value || "Select..."}</span>;
};

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open, setOpen } = useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute z-50 mt-1 max-h-60 w-full min-w-[8rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </div>
  );
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const { value: selectedValue, onValueChange, setOpen } = useContext(SelectContext);
  const isSelected = selectedValue === value;
  
  return (
    <div
      className={cn(
        "relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:bg-blue-50",
        isSelected && "bg-blue-50 text-blue-900 font-medium"
      )}
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
    >
      <span className={cn("absolute left-2 flex h-3.5 w-3.5 items-center justify-center", !isSelected && "hidden")}>
        <Check className="h-4 w-4 text-blue-600" />
      </span>
      <span className="block truncate">{children}</span>
    </div>
  );
};
