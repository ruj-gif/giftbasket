import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { api } from '../lib/api';
import { Lock, CreditCard, Truck, CheckCircle2, Loader2 } from 'lucide-react';
import PaymentQRCode from '../components/PaymentQRCode';
import { siteConfig } from '../config/siteConfig';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal } = useCart();
  const { user } = useUser();
  const { settings } = useContext(SettingsContext);

  const checkoutContent = siteConfig.content?.checkout || {};
  const theme = siteConfig.theme || {};
  const currency = theme.currency || '₹';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
    paymentMethod: 'upi',
  });
  const [submitting, setSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const shippingCharge = settings?.free_shipping_threshold && subtotal >= Number(settings.free_shipping_threshold || 0) ? 0 : Number(settings?.shipping_charge || 0);
  const taxRate = Number(settings?.tax_rate || 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + shippingCharge + taxAmount;

  useEffect(() => {
    if (user?.email || user?.name) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderItems = cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: Number(item.discount_price || item.price || 0),
        size: item.selectedSize,
      }));

      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: formData.address,
        city: formData.city,
        zipcode: formData.zipcode,
        payment_method: formData.paymentMethod,
        subtotal: subtotal.toFixed(2),
        shipping_charge: shippingCharge.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        total_amount: total.toFixed(2),
        order_items: JSON.stringify(orderItems),
        status: 'pending',
      };

      const response = await api.orders.create(orderData);
      if (response.success) {
        const orderId = response.data?.id ?? response.data;
        navigate(`/order-confirmation/${orderId}`, { replace: true });
      } else {
        alert('Order placement failed. Please try again.');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const freeShippingThreshold = Number(settings?.free_shipping_threshold || 0);
  const remainingForFreeShipping = freeShippingThreshold > 0 && subtotal < freeShippingThreshold ? freeShippingThreshold - subtotal : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-12 text-secondary tracking-tight uppercase">{checkoutContent.title || 'Secure Checkout'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-6">
              <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-elegant border border-border/40">
                <h2 className="font-display text-xl sm:text-2xl font-black mb-8 text-secondary tracking-tight uppercase flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm">1</div>
                  {checkoutContent.deliveryTitle || 'Delivery Details'}
                </h2>
                  <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-text-light">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-text-light">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary"
                    />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-text-light">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary"
                    />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-text-light">Shipping Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-text-light">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary"
                    />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-text-light">Zip Code *</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary"
                    />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-elegant border border-border/40">
                <h2 className="font-display text-xl sm:text-2xl font-black mb-8 text-secondary tracking-tight uppercase flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm">2</div>
                  {checkoutContent.paymentTitle || 'Payment Method'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className={`flex items-center space-x-4 cursor-pointer p-6 border-2 rounded-xl transition-all ${formData.paymentMethod === 'upi' ? 'border-black bg-black/5 shadow-inner' : 'border-border/60 hover:border-black'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="w-5 h-5 text-black border-2 border-black focus:ring-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-widest text-xs text-secondary">UPI Payment</span>
                      <span className="text-[10px] font-medium text-text-light mt-1">GPay, PhonePe, Paytm</span>
                    </div>
                  </label>
                  <label className={`flex items-center space-x-4 cursor-pointer p-6 border-2 rounded-xl transition-all ${formData.paymentMethod === 'cod' ? 'border-black bg-black/5 shadow-inner' : 'border-border/60 hover:border-black'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="w-5 h-5 text-black border-2 border-black focus:ring-black"
                    />
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-widest text-xs text-secondary">Cash on Delivery</span>
                      <span className="text-[10px] font-medium text-text-light mt-1">Pay at your doorstep</span>
                    </div>
                  </label>
                </div>
              </div>

              <AnimatePresence>
                {formData.paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PaymentQRCode />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-1">
              <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-elegant lg:sticky lg:top-24 border border-border/40">
                <div className="flex items-center gap-3 mb-8">
                  <Lock className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-black text-secondary tracking-tight uppercase">{checkoutContent.orderSummaryTitle || 'Order Summary'}</h2>
                </div>

                <div className="space-y-4 mb-8 pb-8 border-b border-border/60">
                  {cart.map((item) => {
                    const price = Number(item.discount_price || item.price || 0);
                    return (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-secondary leading-tight uppercase tracking-tight">{item.name}</p>
                          <p className="text-[10px] font-black text-text-light uppercase tracking-widest mt-1">Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}</p>
                        </div>
                        <span className="font-black text-secondary tracking-tighter shrink-0">{currency}{(price * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4 mb-8 pb-8 border-b border-border/60">
                  <div className="flex justify-between text-sm font-bold text-text-light">
                    <span className="uppercase tracking-[0.1em]">Subtotal:</span>
                    <span className="tracking-tighter">{currency}{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-text-light uppercase tracking-[0.1em]">Shipping:</span>
                    {shippingCharge === 0 ? (
                      <span className="text-success tracking-widest text-[10px] font-black uppercase px-2 py-0.5 bg-success/10 rounded">FREE</span>
                    ) : (
                      <span className="text-secondary tracking-tighter">{currency}{shippingCharge.toLocaleString()}</span>
                    )}
                  </div>
                  {remainingForFreeShipping > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 p-3 rounded-lg flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4" />
                      Add {currency}{remainingForFreeShipping.toLocaleString()} for FREE shipping!
                    </motion.p>
                  )}
                  {taxRate > 0 && (
                    <div className="flex justify-between text-sm font-bold text-text-light">
                      <span className="uppercase tracking-[0.1em]">{settings?.tax_name || 'Tax'} ({taxRate}%):</span>
                      <span className="tracking-tighter">{currency}{taxAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-2xl font-black bg-background-light p-6 rounded-xl border border-border/30 mb-10">
                  <span className="uppercase tracking-tighter">Total:</span>
                  <span className="text-primary tracking-tighter">{currency}{total.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-5 uppercase tracking-[0.2em] text-xs font-black shadow-hover active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {checkoutContent.processingButton || 'Processing...'}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      {checkoutContent.placeOrderButton || 'Place Order'}
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] font-black text-text-light uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" />
                  Your payment is 100% secure
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}