import { useEffect, useState } from 'react';
import { Globe, Plus, LogIn, LogOut, Github } from 'lucide-react';
import WebsiteCard from './components/WebsiteCard';
import WebsiteModal from './components/WebsiteModal';
import AuthModal from './components/AuthModal';
import type { Website } from './types';

function App() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = () => {
    const stored = localStorage.getItem('websites');
    if (stored) {
      setWebsites(JSON.parse(stored));
    }
    setLoading(false);
  };

  const handleSaveWebsite = (websiteData: Partial<Website>) => {
    const now = new Date().toISOString();
    if (editingWebsite) {
      const updated = websites.map(w => 
        w.id === editingWebsite.id 
          ? { ...w, ...websiteData, updated_at: now } 
          : w
      );
      setWebsites(updated);
      localStorage.setItem('websites', JSON.stringify(updated));
    } else {
      const newWebsite: Website = {
        id: Date.now().toString(),
        name: websiteData.name || '',
        url: websiteData.url || '',
        description: websiteData.description || '',
        category: websiteData.category || '',
        image_url: websiteData.image_url || '',
        is_active: true,
        created_at: now,
        updated_at: now,
      };
      const updated = [...websites, newWebsite];
      setWebsites(updated);
      localStorage.setItem('websites', JSON.stringify(updated));
    }
    setEditingWebsite(null);
    setIsModalOpen(false);
  };

  const handleDeleteWebsite = (id: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return;

    const updated = websites.filter(w => w.id !== id);
    setWebsites(updated);
    localStorage.setItem('websites', JSON.stringify(updated));
  };

  const handleEditWebsite = (website: Website) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingWebsite(null);
    setIsModalOpen(true);
  };

  const handleSignOut = async () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <Globe className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Websites</h1>
                <p className="text-gray-600 text-sm">A showcase of my web properties</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin ? (
                <>
                  <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                  >
                    <Plus size={20} />
                    Add Website
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </>
              ) : isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
                >
                  <LogIn size={20} />
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-20">
            <Globe className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No websites yet</h2>
            <p className="text-gray-600 mb-6">
              {isAuthenticated
                ? 'Start by adding your first website!'
                : 'Check back soon for updates.'}
            </p>
            {isAuthenticated && (
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <Plus size={20} />
                Add Your First Website
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                isAuthenticated={isAdmin}
                onEdit={handleEditWebsite}
                onDelete={handleDeleteWebsite}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Github size={20} />
            <span>Built with React, TypeScript, and Tailwind</span>
          </div>
        </div>
      </footer>

      <WebsiteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWebsite(null);
        }}
        onSave={handleSaveWebsite}
        website={editingWebsite}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => {
          setIsAuthenticated(true);
          setIsAdmin(true);
        }}
      />
    </div>
  );
}

export default App;
