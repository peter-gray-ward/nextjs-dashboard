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

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};


function formatToCurrency(amount: string|number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

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
      <Card key={0} title="Collected Invoices" value={invoiceInfo.paid} type="collected" /> 
      <Card key={1} title="Pending Invoices" value={invoiceInfo.pending} type="pending" /> 
      <Card key={2} title="Total Invoices" value={invoiceInfo.total} type="invoices" /> 
      <Card
        key={3}
        title="Total Customers"
        value={customers.length}
        type="customers"
      />
    </>
  );
}
