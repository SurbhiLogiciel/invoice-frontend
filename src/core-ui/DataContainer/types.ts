export interface Container {
  data?: string | Record<string, unknown> | any[];
  size?: 'small' | 'medium' | 'large';
  color?: 'purple';
  // issueDate: string,
  // paymentTerms: string,
  children: React.ReactNode;
}
export interface InvoiceListProps {
  options: any;
  children?: React.ReactNode;
}
