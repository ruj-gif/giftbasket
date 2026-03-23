/**
 * Static site API – all data comes from src/data only. No fetch, no backend.
 * Every getAll/getById/create/update/delete reads or updates in-memory state seeded from data/*.
 */

import {
  fashionProducts,
  categories as categoriesData,
  orders as ordersData,
  heroSections as heroSectionsData,
  featureBlocks as featureBlocksData,
  contactMessages as contactMessagesData,
  settings as settingsData,
  paymentSettings as paymentSettingsData,
} from '../config/siteConfig.js';

// In-memory mutable state (seeded from static data; changes lost on refresh)
let products = [...fashionProducts].map((p) => ({ ...p, image_url: p.image_url || p.image, published: p.published !== false }));
let categories = [...categoriesData];
let orders = [...ordersData];
let heroSections = [...heroSectionsData];
let featureBlocks = [...featureBlocksData];
let contactMessages = [...contactMessagesData];
let settings = [...settingsData];
let paymentSettings = [...paymentSettingsData];

const delay = (ms = 80) => new Promise((r) => setTimeout(r, ms));

function nextId(arr) {
  const max = arr.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0);
  return String(max + 1);
}

export const api = {
  products: {
    getAll: async (opts = {}) => {
      await delay();
      let list = products;
      if (opts.slug) list = list.filter((p) => p.slug === opts.slug);
      if (opts.featured) list = list.filter((p) => p.featured);
      if (opts.published !== undefined) list = list.filter((p) => p.published !== false);
      return { success: true, data: list };
    },
    getById: async (id) => {
      await delay();
      const p = products.find((x) => String(x.id) === String(id));
      return { success: true, data: p ? { ...p } : null };
    },
    create: async (data) => {
      await delay();
      const newProduct = { id: nextId(products), ...data, image_url: data.image_url || data.image };
      products.push(newProduct);
      return { success: true, data: newProduct };
    },
    update: async (id, data) => {
      await delay();
      const i = products.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      products[i] = { ...products[i], ...data };
      return { success: true, data: products[i] };
    },
    delete: async (id) => {
      await delay();
      products = products.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },
  categories: {
    getAll: async () => {
      await delay();
      return { success: true, data: [...categories] };
    },
    getById: async (id) => {
      await delay();
      const c = categories.find((x) => String(x.id) === String(id));
      return { success: true, data: c ? { ...c } : null };
    },
    create: async (data) => {
      await delay();
      const newCat = { id: nextId(categories), ...data };
      categories.push(newCat);
      return { success: true, data: newCat };
    },
    update: async (id, data) => {
      await delay();
      const i = categories.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      categories[i] = { ...categories[i], ...data };
      return { success: true, data: categories[i] };
    },
    delete: async (id) => {
      await delay();
      categories = categories.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },
  orders: {
    getAll: async (opts = {}) => {
      await delay();
      let list = orders;
      if (opts.customer_email) list = list.filter((o) => o.customer_email === opts.customer_email);
      return { success: true, data: [...list] };
    },
    getById: async (id) => {
      await delay();
      const o = orders.find((x) => String(x.id) === String(id));
      return { success: true, data: o ? { ...o } : null };
    },
    create: async (data) => {
      await delay();
      const newOrder = { id: nextId(orders), ...data, status: 'pending' };
      orders.push(newOrder);
      return { success: true, data: newOrder };
    },
    update: async (id, data) => {
      await delay();
      const i = orders.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      orders[i] = { ...orders[i], ...data };
      return { success: true, data: orders[i] };
    },
  },
  contact_messages: {
    getAll: async () => {
      await delay();
      return { success: true, data: [...contactMessages] };
    },
    getById: async (id) => {
      await delay();
      const m = contactMessages.find((x) => String(x.id) === String(id));
      return { success: true, data: m ? { ...m } : null };
    },
    create: async (data) => {
      await delay();
      const newMsg = { id: nextId(contactMessages), ...data };
      contactMessages.push(newMsg);
      return { success: true, data: newMsg };
    },
    delete: async (id) => {
      await delay();
      contactMessages = contactMessages.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },
  hero_sections: {
    getAll: async (opts = {}) => {
      await delay();
      let list = heroSections;
      if (opts.published !== undefined) list = list.filter((s) => s.published !== false);
      return { success: true, data: [...list] };
    },
    getById: async (id) => {
      await delay();
      const s = heroSections.find((x) => String(x.id) === String(id));
      return { success: true, data: s ? { ...s } : null };
    },
    create: async (data) => {
      await delay();
      const newSection = { id: nextId(heroSections), ...data };
      heroSections.push(newSection);
      return { success: true, data: newSection };
    },
    update: async (id, data) => {
      await delay();
      const i = heroSections.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      heroSections[i] = { ...heroSections[i], ...data };
      return { success: true, data: heroSections[i] };
    },
    delete: async (id) => {
      await delay();
      heroSections = heroSections.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },
  feature_blocks: {
    getAll: async (opts = {}) => {
      await delay();
      let list = featureBlocks;
      if (opts.published !== undefined) list = list.filter((b) => b.published !== false);
      return { success: true, data: [...list].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)) };
    },
    getById: async (id) => {
      await delay();
      const f = featureBlocks.find((x) => String(x.id) === String(id));
      return { success: true, data: f ? { ...f } : null };
    },
    create: async (data) => {
      await delay();
      const newBlock = { id: nextId(featureBlocks), ...data };
      featureBlocks.push(newBlock);
      return { success: true, data: newBlock };
    },
    update: async (id, data) => {
      await delay();
      const i = featureBlocks.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      featureBlocks[i] = { ...featureBlocks[i], ...data };
      return { success: true, data: featureBlocks[i] };
    },
    delete: async (id) => {
      await delay();
      featureBlocks = featureBlocks.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },
  settings: {
    getAll: async () => {
      await delay();
      return { success: true, data: settings.length ? [settings[0]] : [] };
    },
    get: async () => {
      await delay();
      return settings[0] || null;
    },
    create: async (data) => {
      await delay();
      const newSettings = { id: nextId(settings), ...data };
      settings = [newSettings];
      return { success: true, data: newSettings };
    },
    update: async (id, data) => {
      await delay();
      if (settings.length) {
        settings[0] = { ...settings[0], ...data };
        return { success: true, data: settings[0] };
      }
      return { success: false };
    },
  },
  payment_settings: {
    getAll: async () => {
      await delay();
      return { success: true, data: [...paymentSettings] };
    },
    update: async (id, data) => {
      await delay();
      const i = paymentSettings.findIndex((x) => String(x.id) === String(id));
      if (i !== -1) {
        paymentSettings[i] = { ...paymentSettings[i], ...data };
        return { success: true, data: paymentSettings[i] };
      }
      return { success: false };
    },
    create: async (data) => {
      await delay();
      const newPay = { id: nextId(paymentSettings), ...data };
      paymentSettings.push(newPay);
      return { success: true, data: newPay };
    },
  },
  auth: {
    login: async () => {
      await delay();
      return { success: true, token: 'static-token', user: { email: 'demo@shobha.com', name: 'Demo User' } };
    },
    register: async () => {
      await delay();
      return { success: true, token: 'static-token', user: { email: 'demo@shobha.com', name: 'Demo User' } };
    },
  },
  getStorageInfo: async () => {
    await delay();
    return { success: true, data: { uploadUrl: null, message: 'Static site – upload not configured' } };
  },
  uploadFile: async (file) => {
    await delay();
    return { success: true, data: { url: URL.createObjectURL(file) } };
  },
};
