import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, MapPinIcon, ClockIcon, UploadIcon } from 'lucide-react';

export default function TicketBooking({ isOpen, onClose }) {
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const qrCodeForPayment = "https://png.pngtree.com/png-clipart/20220729/original/pngtree-qr-code-png-image_8438558.png";

  const handlePaymentScreenshotUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white mx-4 max-w-sm md:max-w-md w-full Sm:mx-auto rounded-xl shadow-lg p-4 relative">
        {/* Event Title */}
        <div className="text-xl font-bold text-gray-800 text-center mb-3">
          Summer Music Festival
        </div>

        {/* Event Details */}
        <div className="space-y-2 bg-gray-100 p-3 rounded-xl mb-3">
          <div className="flex items-center text-gray-800">
            <CalendarIcon className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-sm font-medium">July 15, 2023</span>
          </div>

          <div className="flex items-center text-gray-800">
            <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-sm font-medium">7:00 PM - 11:00 PM</span>
          </div>

          <div className="flex items-center text-gray-800">
            <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-sm font-medium">Central Park, New York City</span>
          </div>
        </div>

        {/* QR Code for Payment */}
        <div className="bg-gray-100 p-3 rounded-xl mb-3">
          <Label htmlFor="qr-code-display" className="block text-sm font-medium text-gray-700 mb-2">
            Scan QR Code to Make Payment
          </Label>
          <div className="flex items-center justify-center w-full">
            <div className="relative w-28 h-28 bg-white p-1 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
              <img
                src={qrCodeForPayment}
                alt="Payment QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Ticket Amount */}
        <div className="bg-gray-100 p-3 rounded-xl mb-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">Ticket Amount:</Label>
            <span className="text-lg font-semibold text-gray-800">$5000</span>
          </div>
        </div>

        {/* Payment Screenshot Upload */}
        <div>
          <Label htmlFor="payment-screenshot" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Payment Screenshot
          </Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="payment-screenshot"
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              {paymentScreenshot ? (
                <img src={paymentScreenshot} alt="Payment Screenshot" className="w-full h-full object-contain rounded-xl" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-4 pb-5">
                  <UploadIcon className="w-8 h-8 mb-2 text-gray-600" />
                  <p className="mb-1 text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              <Input
                id="payment-screenshot"
                type="file"
                className="hidden"
                onChange={handlePaymentScreenshotUpload}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-4 space-x-2">
          <Button className="bg-gray-800 hover:bg-gray-700 text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white" onClick={onClose}>
            Confirm Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
