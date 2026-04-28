import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ message = 'Nothing here yet.', icon: Icon = Inbox }) => (
  <div className="text-center py-16 md:py-20 glass rounded-3xl">
    <Icon className="mx-auto text-slate-400 dark:text-slate-600 mb-4" size={40} />
    <p className="text-slate-400 dark:text-slate-500 italic text-sm md:text-base">
      {message}
    </p>
  </div>
);

export default EmptyState;
