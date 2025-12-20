import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { getRdbInstance } from '../../firebase';
import { ref, get } from 'firebase/database';

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const rdb = await getRdbInstance();
      const inquiriesRef = ref(rdb, 'contact_inquiries');
      const contactSubmissionsRef = ref(rdb, 'contact_submissions');
      
      const [inquiriesSnap, submissionsSnap] = await Promise.all([get(inquiriesRef), get(contactSubmissionsRef)]);
      
      let mergedContacts = [];
      
      if (inquiriesSnap.exists()) {
        const data = inquiriesSnap.val();
        Object.keys(data).forEach(key => {
          mergedContacts.push({
            id: key,
            ...data[key],
            source: 'Contact Us Page'
          });
        });
      }

      if (submissionsSnap.exists()) {
        const data = submissionsSnap.val();
        Object.keys(data).forEach(key => {
          const item = data[key];
          mergedContacts.push({
            id: key,
            ...item,
            fullName: item.name || item.fullName, // Normalize name
            serviceType: item.serviceType || 'General Inquiry',
            source: 'General Form'
          });
        });
      }

      mergedContacts.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      setContacts(mergedContacts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile?.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
            <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8B6E] text-sm"
            />
        </div>
        {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading contacts...</p>
            </div>
        ) : (
            <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Contact</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Service Interest</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Message</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                            <div className="font-medium text-gray-800">{contact.fullName}</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider">{contact.source}</div>
                        </td>
                        <td className="p-4">
                            <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaEnvelope className="text-gray-400 text-xs" />
                                {contact.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaPhone className="text-gray-400 text-xs" />
                                {contact.mobile}
                            </div>
                            </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {contact.serviceType}
                            </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={contact.message}>
                            {contact.message}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                            {new Date(contact.submittedAt).toLocaleDateString()}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500">
                        No contact inquiries found.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4">
                {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                    <div key={contact.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                        <h3 className="font-bold text-gray-800">{contact.fullName}</h3>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider bg-white px-1 rounded border border-gray-200">{contact.source}</span>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(contact.submittedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-[#0F8B6E] text-xs" />
                        <span className="break-all">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-[#0F8B6E] text-xs" />
                        <span>{contact.mobile}</span>
                        </div>
                        <div className="mt-2">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {contact.serviceType}
                        </span>
                        </div>
                        <div className="mt-2 bg-white p-2 rounded border border-gray-100 text-gray-600 text-xs">
                        {contact.message}
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <div className="text-center text-gray-500 py-8">
                    No contact inquiries found.
                </div>
                )}
            </div>
            </>
        )}
    </div>
  );
}
