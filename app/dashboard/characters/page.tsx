import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/characters/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
 
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