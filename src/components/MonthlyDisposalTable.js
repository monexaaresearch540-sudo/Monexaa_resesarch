import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { getRdbInstance } from '../firebase';
import { toast } from 'react-toastify';

const MonthlyDisposalTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    const fetchData = async () => {
      try {
        const db = await getRdbInstance();
        if (!db) {
            console.warn("Firebase RDB not initialized");
            setDefaultData();
            return;
        }

        const tableRef = ref(db, 'monthlyDisposalTableData');
        unsubscribe = onValue(
          tableRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setTableData(Array.isArray(data) ? data : Object.values(data));
            } else {
              setDefaultData();
            }
          },
          (error) => {
            if (error && (error.code === 'PERMISSION_DENIED' || /permission_denied/i.test(error.message))) {
              // Silent fallback for public view
              setDefaultData();
            } else {
              console.error('Failed to load monthly disposal data:', error);
              toast.error('Failed to load data. Showing default values.');
              setDefaultData();
            }
          }
        );
      } catch (err) {
          console.error("Error in MonthlyDisposalTable:", err);
          setDefaultData();
      }
    };

    fetchData();

    return () => unsubscribe();
  }, []);

  const setDefaultData = () => {
    setTableData([
        { srNo: 1, month: 'April, 2025', carried: 1, received: 0, resolved: 1, pending: 0 },
        { srNo: 2, month: 'May, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 3, month: 'June, 2025', carried: 0, received: 2, resolved: 2, pending: 0 },
        { srNo: 4, month: 'July, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 5, month: 'Aug, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 6, month: 'Sep, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 7, month: 'Oct, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 8, month: 'Nov, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 9, month: 'Dec, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 10, month: 'Jan, 2025', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 11, month: 'Feb, 2026', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 12, month: 'March, 2026', carried: 0, received: 0, resolved: 0, pending: 0 },
        { srNo: 'Grand Total', month: '', carried: 1, received: 2, resolved: 3, pending: 0 },
      ]);
  };

  return (
    <section className="py-4 sm:py-6 px-4 sm:px-6">
      {/* Scoped responsive styles for stack-table */}
      <style>{`
        .stack-table { width: 100%; border-collapse: collapse; }
        .stack-table thead { display: table-header-group; }
        @media (max-width: 640px) {
          .stack-table thead { display: none; }
          .stack-table tbody, .stack-table tr, .stack-table td { display: block; width: 100%; }
          .stack-table tr { margin-bottom: 0.75rem; border: 1px solid rgba(15, 139, 110, 0.25); border-radius: 12px; overflow: hidden; background: #fff; }
          .stack-table td { box-sizing: border-box; padding: 0.5rem 0.75rem; border-bottom: 1px dashed rgba(15, 139, 110, 0.2); text-align: left !important; }
          .stack-table td:last-child { border-bottom: none; }
          .stack-table td::before { content: attr(data-label); display: block; font-size: 0.75rem; font-weight: 600; color: #0F8B6E; margin-bottom: 2px; }
        }
      `}</style>
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#003E29]">
          Trend Of Monthly Disposal Of Complaints
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-[#0F8B6E]/20 bg-white">
          <div className="overflow-x-auto">
            <table
              className="stack-table w-full border-separate border-spacing-0 text-left text-xs sm:text-sm"
              aria-label="Monthly disposal trend of complaints with carried, received, resolved and pending counts"
            >
              <caption className="sr-only">Monthly disposal trend of complaints with carried, received, resolved and pending counts</caption>
              <thead>
                <tr className="bg-[#003E29] text-white">
                  <th scope="col" className="p-3 sm:p-4 text-center min-w-[70px] font-semibold">Sr. No.</th>
                  <th scope="col" className="p-3 sm:p-4 text-center min-w-[120px] font-semibold">Month</th>
                  <th scope="col" className="p-3 sm:p-4 text-center min-w-[180px] font-semibold">Carried forward from previous month</th>
                  <th scope="col" className="p-3 sm:p-4 text-center min-w-[90px] font-semibold">Received</th>
                  <th scope="col" className="p-3 sm:p-4 text-center min-w-[90px] font-semibold">Resolved*</th>
                  <th scope="col" className="p-3 sm:p-4 text-center min-w-[90px] font-semibold">Pending#</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(tableData) ? tableData : Object.values(tableData || {})).map((row, index) => (
                  <tr key={row.srNo || index} className="transition-colors hover:bg-green-50 border-b border-gray-100 last:border-0">
                    <td data-label="Sr. No." className="p-3 sm:p-4 text-center font-medium text-gray-700">{row.srNo}</td>
                    <td data-label="Month" className="p-3 sm:p-4 text-center text-gray-700">{row.month}</td>
                    <td data-label="Carried forward" className="p-3 sm:p-4 text-center text-gray-700">{row.carried}</td>
                    <td data-label="Received" className="p-3 sm:p-4 text-center text-gray-700">{row.received}</td>
                    <td data-label="Resolved*" className="p-3 sm:p-4 text-center text-gray-700">{row.resolved}</td>
                    <td data-label="Pending#" className="p-3 sm:p-4 text-center text-gray-700">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs sm:text-sm text-gray-600 text-center italic">
          *Inclusive of complaints of previous months resolved in the current month.<br />
          #Inclusive of complaints pending as on the last day of the month.
        </p>
      </div>
    </section>
  );
};

export default MonthlyDisposalTable;
