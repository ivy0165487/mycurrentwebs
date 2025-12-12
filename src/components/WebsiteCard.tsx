import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import type { Website } from '../lib/supabase';

interface WebsiteCardProps {
  website: Website;
  isAuthenticated: boolean;
  onEdit: (website: Website) => void;
  onDelete: (id: string) => void;
}

export default function WebsiteCard({ website, isAuthenticated, onEdit, onDelete }: WebsiteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        {website.image_url ? (
          <img
            src={website.image_url}
            alt={website.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-6xl font-bold">
            {website.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{website.name}</h3>
          {isAuthenticated && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(website)}
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(website.id)}
                className="text-gray-500 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
          {website.category}
        </span>

        <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
          {website.description || 'No description provided'}
        </p>

        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Visit Website
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
