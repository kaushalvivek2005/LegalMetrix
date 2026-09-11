import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  Scale,
  Upload,
  CheckCircle2,
  FileCheck,
  Building2,
  MapPin,
  Calendar,
  Save,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function InstrumentRegistration() {
  const navigate = useNavigate();
  const { registerInstrument } = useApp();

  const [formData, setFormData] = useState({
    name: 'Electronic Bench Scale 300kg',
    type: 'Commercial Weighing',
    category: 'Non-Automatic Weighing Instrument (NAWI)',
    manufacturer: 'Avery Berkel',
    model: 'FX50 Series',
    serialNumber: `AV-${Math.floor(10000 + Math.random() * 90000)}-26`,
    capacity: '300 kg (e = 50g)',
    accuracyClass: 'Class III (Medium)',
    businessName: 'Shree Balaji Weighing Solutions',
    location: 'Connaught Place Hub, Delhi',
    address: 'Shop 14, Block B, Connaught Place, New Delhi - 110001',
    previousCertificateNumber: 'CERT-2025-DL-8821',
    previousVerificationDate: '2025-02-14',
    expiryDate: '2026-02-13',
    uploadedDocName: 'previous_doca_certificate_2025.pdf'
  });

  const [createdInstrument, setCreatedInstrument] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const created = await registerInstrument(formData);
    setIsSubmitting(false);
    setCreatedInstrument(created);
  };

  const handleSaveDraft = () => {
    alert('Instrument registration draft saved to local business cache.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
          <Scale className="w-4 h-4 text-blue-600" />
          Statutory Instrument Enrollment
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Register Weighing / Measuring Instrument
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          In accordance with the Legal Metrology (General) Rules, 2011. An immutable Digital Instrument ID will be generated.
        </p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-8">
        {/* Section 1: Instrument Specs */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2f6388]" />
            1. Instrument Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Instrument Type / Classification</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              >
                <option value="Commercial Weighing">Commercial Weighing (Bench/Platform)</option>
                <option value="Fuel Dispenser">Fuel Dispenser (Petrol/Diesel/CNG Flowmeter)</option>
                <option value="Weighbridge">Heavy Industrial Weighbridge (Road/Rail)</option>
                <option value="Counter Scale">Retail Counter Scale / Price Computing</option>
                <option value="Measuring Instrument">Precision Laboratory Balance / Measure</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Instrument Generic Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Model Name / Number</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Serial Number / Machine Tag</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Maximum Capacity / Verification Scale (e)</label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Accuracy Class</label>
              <select
                name="accuracyClass"
                value={formData.accuracyClass}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              >
                <option value="Class I (Special)">Class I (Special Precision Lab)</option>
                <option value="Class II (High)">Class II (High Precision Gold/Silver)</option>
                <option value="Class III (Medium)">Class III (Medium - Commercial Retail &amp; Wholesale)</option>
                <option value="Class IIII (Ordinary)">Class IIII (Ordinary Bulk Materials)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Business & Location */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#2f6388]" />
            2. Business Establishment &amp; Premises Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Registered Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Premises / Hub Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-1.5">
              <label className="font-semibold text-slate-700">Physical Address for On-Site Inspection</label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Previous Stamping History & Document Upload */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2f6388]" />
            3. Prior Verification &amp; Document Upload
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Previous Certificate Number</label>
              <input
                type="text"
                name="previousCertificateNumber"
                value={formData.previousCertificateNumber}
                onChange={handleChange}
                placeholder="e.g. CERT-2025-DL-8821"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Previous Verification Date</label>
              <input
                type="date"
                name="previousVerificationDate"
                value={formData.previousVerificationDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-[#00162c] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Document Upload Box */}
          <div className="p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-2">
            <Upload className="w-7 h-7 text-slate-400 mx-auto" />
            <h4 className="text-xs font-bold text-slate-800">Upload Previous Stamping Certificate / Invoice</h4>
            <p className="text-[11px] text-slate-500">PDF, JPG, or PNG (Max 10 MB)</p>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-700">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>{formData.uploadedDocName}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#00162c] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            <span>{isSubmitting ? 'Generating Digital ID...' : 'Register Instrument'}</span>
          </button>
        </div>
      </form>

      {/* Success Modal Showing "Digital Instrument ID Created" */}
      {createdInstrument && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Official Registration Confirmed
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Digital Instrument ID Created
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300/80 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-500">
                Permanent Legal Metrology ID
              </span>
              <p className="font-mono text-xl font-bold text-[#00162c]">
                {createdInstrument.id}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {createdInstrument.name} ({createdInstrument.capacity})
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              This instrument is now recorded on the DoCA National Registry. You can now submit an application for statutory verification and stamping.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => navigate(`/business/applications/new?instrumentId=${createdInstrument.id}`)}
                className="w-full py-2.5 rounded-xl bg-[#00162c] text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Apply for Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/business/instruments')}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer"
              >
                View in Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
