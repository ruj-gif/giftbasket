import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function HeroSectionsList() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const response = await api.hero_sections.getAll();
      if (response.success) {
        setSections(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load hero sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (section) => {
    if (!window.confirm('Delete this hero section?')) return;

    try {
      await api.hero_sections.delete(section.id);
      loadSections();
    } catch (error) {
      alert('Failed to delete hero section');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hero Sections</h1>
        <Link to="/admin/hero-sections/new" className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark text-sm sm:text-base touch-manipulation shrink-0">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Hero Section</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={sections}
        actions={{
          edit: (row) => `/admin/hero-sections/${row.id}`,
          delete: handleDelete,
        }}
        emptyMessage="No hero sections found."
      />
    </div>
  );
}