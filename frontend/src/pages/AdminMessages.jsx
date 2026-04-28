import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Mail, User, Calendar, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('/api/v1/contacts');
      setMessages(data.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`/api/v1/contacts/${id}`);
        setMessages(messages.filter((msg) => msg._id !== id));
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-accent-orange" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inquiries ({messages.length})</h2>
      </div>

      <div className="grid gap-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="glass p-6 md:p-8 rounded-3xl border-white/20 transition-all hover:shadow-lg">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-grow">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2 text-sm font-bold bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full">
                      <User size={14} /> {msg.name}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail size={14} /> {msg.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} /> {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                       <span className="w-2 h-2 bg-accent-orange rounded-full"></span>
                       {msg.subject}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <button 
                    onClick={() => handleDelete(msg._id)}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                  <a 
                    href={`mailto:${msg.email}`}
                    className="p-3 text-accent-orange hover:bg-accent-orange/10 rounded-xl transition-all"
                    title="Reply via Email"
                  >
                    <CheckCircle size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 glass rounded-3xl">
            <MessageSquare size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
            <p className="text-slate-500">No messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
