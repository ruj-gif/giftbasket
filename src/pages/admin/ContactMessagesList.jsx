import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function ContactMessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await api.contact_messages.getAll();
      if (response.success) {
        setMessages(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (message) => {
    if (!window.confirm('Delete this message?')) return;

    try {
      await api.contact_messages.delete(message.id);
      loadMessages();
    } catch (error) {
      alert('Failed to delete message');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    {
      key: 'created_at',
      label: 'Date',
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact Messages</h1>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        actions={{
          view: (row) => `/admin/contact-messages/${row.id}`,
          delete: handleDelete,
        }}
        emptyMessage="No messages found."
      />
    </div>
  );
}