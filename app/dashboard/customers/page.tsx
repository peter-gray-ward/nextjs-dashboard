import Table from '@/app/ui/customers/table';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Customers',
};
 
export default async function Page({
	searchParams
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <div className="w-full">
      <Table query={query} currentPage={currentPage} />
    </div>
  );
}