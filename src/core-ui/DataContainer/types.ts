export interface InvoiceItemType {
  id: number;
  itemName: string;
  qty: number;
  price: number;
}
export interface InvoiceType {
  _id: string;
  invoiceNumber: string;
  fullName: string;
  amount: number;
  createdAt: string;
  issueDate: string;
  userId: string;
  paymentTerms: string;
  status: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  items: InvoiceItemType[];
}
export interface Container {
  data?: string | Record<string, unknown> | any[];
  size?: 'small' | 'medium' | 'large';
  color?: 'purple';
  invoices: InvoiceType[];
  setInvoices: React.Dispatch<React.SetStateAction<InvoiceType[]>>;
  // issueDate: string,
  // paymentTerms: string,
  children: React.ReactNode;
}
export interface InvoiceListProps {
  options: any;
  children?: React.ReactNode;
}
