import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchCustomers,
  fetchInvoiceInfo
} from '@/app/lib/data';

function PriceDisplay({ price }: any) {
  return <p>{formatToCurrency(price)}</p>;
}

function formatToCurrency(amount: any) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};


export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  if (type == 'pending' || type == 'collected') {
    value = formatToCurrency(value);
  }

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

export default async function CardWrapper() {
  const [
    customers,
    invoiceInfo
  ] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceInfo()
  ]);

  return (
    <>
      <Card title="Collected Invoices" value={invoiceInfo.paid} type="collected" /> 
      <Card title="Pending Invoices" value={invoiceInfo.pending} type="pending" /> 
      <Card title="Total Invoices" value={invoiceInfo.total} type="invoices" /> 
      <Card
        title="Total Customers"
        value={customers.length}
        type="customers"
      />
    </>
  );
}
