
export interface CardProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title?: string;
}
