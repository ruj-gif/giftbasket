import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { ArrowLeft } from "lucide-react";

export default function ContactMessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessage();
  }, [id]);

  const loadMessage = async () => {
    try {
      const response = await api.contact_messages.getById(id);

      if (response.success && response.data) {
        setMessage(response.data);
      } else {
        alert("❌ Message not found");
      }
    } catch (error) {
      console.error("Failed to load message:", error);
      alert("❌ Error loading message");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="text-center py-10 text-gray-500">
        Message not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full">
      <button
        onClick={() => navigate("/admin/contact-messages")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 py-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Messages
      </button>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Contact Message
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-gray-900">{message.name || "-"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{message.email || "-"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <p className="text-gray-900">{message.subject || "-"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <p className="text-gray-900 whitespace-pre-wrap">
              {message.message || "-"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <p className="text-gray-900">
              {message.created_at
                ? new Date(message.created_at).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}