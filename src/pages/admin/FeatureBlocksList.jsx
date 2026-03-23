import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function FeatureBlocksList() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      const response = await api.feature_blocks.getAll();
      if (response.success) {
        setFeatures(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load feature blocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (feature) => {
    if (!window.confirm('Delete this feature block?')) return;

    try {
      await api.feature_blocks.delete(feature.id);
      loadFeatures();
    } catch (error) {
      alert('Failed to delete feature block');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'icon', label: 'Icon' },
    { key: 'display_order', label: 'Order' },
    {
      key: 'published',
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${row.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.published ? 'Published' : 'Draft'}
        </span>
      ),
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feature Blocks</h1>
        <Link to="/admin/feature-blocks/new" className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark text-sm sm:text-base touch-manipulation shrink-0">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Feature Block</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={features}
        actions={{
          edit: (row) => `/admin/feature-blocks/${row.id}`,
          delete: handleDelete,
        }}
        emptyMessage="No feature blocks found."
      />
    </div>
  );
}