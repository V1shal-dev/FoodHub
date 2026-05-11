import React from 'react';
import { ChevronLeft, MapPin, Plus, MoreVertical } from 'lucide-react';
import type { Address } from '../../types';

interface AddressesScreenProps {
  onClose: () => void;
  addresses: Address[];
}

export const AddressesScreen: React.FC<AddressesScreenProps> = ({ onClose, addresses }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">Saved Addresses</h1>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin size={24} className="text-orange-500 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{addr.label}</h3>
                    {addr.isDefault && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Default</span>}
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
                <button className="text-gray-400 p-1"><MoreVertical size={20} /></button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-4 border-2 border-dashed border-orange-500 text-orange-500 font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <Plus size={20} /> Add New Address
        </button>
      </div>
    </div>
  );
};
