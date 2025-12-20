import React from 'react';
import ComplaintDataComponent from '../components/ComplaintData';
import MonthlyDisposalTable from '../components/MonthlyDisposalTable';
import AnnualDisposalTable from '../components/AnnualDisposalTable';

export default function ComplaintDataPage() {
  return (
    <div className="w-full bg-transparent">
      {/* Page Header */}
      <div className="container mx-auto px-4 pt-8 pb-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-2">
          Complaint Data
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Transparency is our core value. Here you can find detailed statistics and records of complaints and their resolutions.
        </p>
      </div>
      
      {/* Components Stack */}
      <div className="flex flex-col gap-0 pb-16">
          {/* ComplaintDataComponent has its own container and padding */}
          <ComplaintDataComponent />
          
          {/* Monthly and Annual tables */}
          <div className="container mx-auto px-4 space-y-4">
             <MonthlyDisposalTable />
             <AnnualDisposalTable />
          </div>
      </div>
    </div>
  );
}
