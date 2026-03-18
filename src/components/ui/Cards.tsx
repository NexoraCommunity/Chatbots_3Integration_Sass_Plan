import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Cards = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={`rounded-2xl bg-card text-card-foreground border border-border shadow-xs overflow-hidden transition-all duration-200 hover:shadow-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

const CardHeader = ({ children, className }: CardProps) => (
  <div className={`p-6 flex flex-col space-y-1.5 ${className ?? ""}`}>{children}</div>
);

const CardTitle = ({ children, className }: CardProps) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className ?? ""}`}>{children}</h3>
);

const CardDescription = ({ children, className }: CardProps) => (
  <p className={`text-sm text-muted-foreground ${className ?? ""}`}>{children}</p>
);

const CardContent = ({ children, className }: CardProps) => (
  <div className={`p-6 ${className ?? ""}`}>{children}</div>
);

const CardFooter = ({ children, className }: CardProps) => (
  <div className={`p-6 pt-0 flex items-center ${className ?? ""}`}>{children}</div>
);

export { Cards, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };