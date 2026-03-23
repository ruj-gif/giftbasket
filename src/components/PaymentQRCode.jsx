import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { QrCode, AlertCircle } from 'lucide-react';

export default function PaymentQRCode() {
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentSettings();
  }, []);

  const loadPaymentSettings = async () => {
    try {
      const response = await api.payment_settings.getAll();
      if (response.success && response.data && response.data.length > 0) {
        const settings = response.data[0];
        if (settings.is_active) {
          setPaymentSettings(settings);
        }
      }
    } catch (error) {
      console.error('Failed to load payment settings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (!paymentSettings || !paymentSettings.is_active) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-elegant border-2 border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <QrCode className="w-6 h-6 text-primary" />
        <h3 className="font-display text-xl font-bold text-secondary">UPI Payment</h3>
      </div>

      {paymentSettings.upi_qr_code_url ? (
        <div className="space-y-4">
          <div className="bg-background-light p-4 rounded-lg">
            <img
              src={paymentSettings.upi_qr_code_url}
              alt="UPI QR Code"
              className="max-w-full mx-auto"
              style={{ maxHeight: '300px' }}
            />
          </div>

          {paymentSettings.upi_number && (
            <div className="text-center">
              <p className="text-sm text-text-light mb-1">UPI ID:</p>
              <p className="font-mono text-lg font-bold text-secondary">{paymentSettings.upi_number}</p>
            </div>
          )}

          {paymentSettings.instructions && (
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-secondary whitespace-pre-wrap">{paymentSettings.instructions}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-text-light bg-background-light p-4 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">QR code not configured</p>
        </div>
      )}
    </div>
  );
}