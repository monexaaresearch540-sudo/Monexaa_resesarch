import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { getRdbInstance } from '../firebase';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ComplaintData = () => {
  const [headingMonthYear, setHeadingMonthYear] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [errorTable, setErrorTable] = useState(null);

  useEffect(() => {
    let unsubHeader = () => {};
    let unsubTable = () => {};

    const init = async () => {
        const db = await getRdbInstance();
        if (!db) {
            setLoadingTable(false);
            setHeadingMonthYear('Current Month');
            return;
        }

        // 1. Header
        const headingRef = ref(db, 'complaintHeaderMonthYear');
        unsubHeader = onValue(headingRef, (snapshot) => {
            const val = snapshot.val();
            if (typeof val === 'string' && val.trim().length > 0) {
                setHeadingMonthYear(val.trim());
            } else {
                setHeadingMonthYear('Current Month');
            }
        });

        // 2. Table Data
        const tableRef = ref(db, 'complaintsDataCurrentMonth');
        unsubTable = onValue(tableRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Array.isArray(data) ? data : Object.values(data);
                setTableData(dataArray);
            } else {
                 // Default fallback if DB is empty
                 setTableData([
                    { srNo: 1, source: 'Directly from Investors', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
                    { srNo: 2, source: 'SEBI (SCORES)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
                    { srNo: 3, source: 'Other Sources (if any)', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
                    { srNo: 'Grand Total', source: '', pendingLastMonth: 0, received: 0, resolved: 0, pending: 0, pending3Months: 0, avgResolutionTime: 0 },
                 ]);
            }
            setLoadingTable(false);
        }, (error) => {
            console.error('Error fetching table data:', error);
            setErrorTable('Failed to load table data.');
            setLoadingTable(false);
        });
    };

    init();

    return () => {
        unsubHeader();
        unsubTable();
    };
  }, []);

  return (
    <motion.section
      className="relative py-10 sm:py-14 lg:py-20 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-6 rounded-2xl p-6 shadow-xl border"
          variants={itemVariants}
          style={{
            background: '#fff',
            border: '1px solid rgba(15, 139, 110, 0.2)', // Green border
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div style={{ color: '#0b1220' }}>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-2 text-[#003E29]" // Brand Dark Green
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Complaint Data for {headingMonthYear || '...'}
            </motion.h2>
            <p className="text-center text-gray-600 mb-6">Monthly complaint receipt and resolution statistics by source</p>

            {loadingTable ? (
              <div className="flex justify-center items-center py-6">
                <div className="w-12 h-12 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : errorTable ? (
              <div className="bg-red-50 text-red-600 rounded-xl p-6 border border-red-200 text-center">
                {errorTable}
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar rounded-xl border border-gray-200">
                <table
                  className="w-full text-left text-xs sm:text-sm"
                  style={{ background: '#fff', color: '#0b1220' }}
                >
                  <thead className="uppercase tracking-wider" style={{ background: '#003E29', color: '#fff' }}>
                    <tr>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[70px]">Sr. No.</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[160px]">Received from</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[120px]">Pending last month</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[90px]">Received</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[90px]">Resolved</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[90px]">Pending</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[120px]">Pending &gt; 3 Months</th>
                      <th className="p-3 sm:p-4 font-semibold text-center min-w-[150px]">Avg. Resolution time (days)^</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(tableData) &&
                      tableData.map((row) => (
                        <tr
                          key={row.srNo}
                          className="transition-colors hover:bg-green-50 border-b border-gray-100 last:border-0"
                          style={{
                              backgroundColor: row.srNo === 'Grand Total' ? '#f0fdf4' : '#fff', // Light green for total
                              fontWeight: row.srNo === 'Grand Total' ? 'bold' : 'normal'
                          }}
                        >
                          <td className="p-3 sm:p-4 text-center text-[#003E29] font-medium">{row.srNo}</td>
                          <td className="p-3 sm:p-4 text-center">{row.source}</td>
                          <td className="p-3 sm:p-4 text-center">{row.pendingLastMonth || 0}</td>
                          <td className="p-3 sm:p-4 text-center">{row.received || 0}</td>
                          <td className="p-3 sm:p-4 text-center">{row.resolved || 0}</td>
                          <td className="p-3 sm:p-4 text-center">{row.pending || 0}</td>
                          <td className="p-3 sm:p-4 text-center">{row.pending3Months || 0}</td>
                          <td className="p-3 sm:p-4 text-center">{row.avgResolutionTime || 0}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="mt-4 text-xs sm:text-sm text-gray-500 text-center">
              ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ComplaintData;
