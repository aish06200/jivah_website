type Props = {
  children: string;
  className?: string;
};

export function EditorialLabel({ children, className = "" }: Props) {
  return <p className={`editorial-label ${className}`.trim()}>{children}</p>;
}
