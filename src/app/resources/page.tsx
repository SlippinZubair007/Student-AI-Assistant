"use client"
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Calculator, 
  Atom, 
  Monitor, 
  Type, 
  FileText, 
  Play, 
  Download, 
  Search, 
  Calendar,
  User,
  Eye,
  X,
  Home
} from 'lucide-react';

interface NavigationState {
  level: 'home' | 'subjects' | 'content-types' | 'content';
  selectedLevel?: 'o-levels' | 'as-levels' | 'a2-levels';
  selectedSubject?: string;
  selectedContentType?: 'topicals' | 'notes' | 'live-videos';
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  author: string;
  uploadDate: string;
  fileSize?: string;
  duration?: string;
  filePath: string;
  thumbnailPath?: string;
  type: 'pdf' | 'video';
}

export default function EducationalPlatform() {
  const [navigation, setNavigation] = useState<NavigationState>({ level: 'home' });
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Subject configurations
  const levelSubjects = {
    'o-levels': [
      { id: 'chemistry', name: 'Chemistry', icon: Atom, color: 'bg-green-500' },
      { id: 'maths', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500' },
      { id: 'physics', name: 'Physics', icon: BookOpen, color: 'bg-purple-500' },
      { id: 'computer-science', name: 'Computer Science', icon: Monitor, color: 'bg-indigo-500' },
      { id: 'urdu', name: 'Urdu', icon: Type, color: 'bg-red-500' }
    ],
    'as-levels': [
      { id: 'physics', name: 'Physics', icon: BookOpen, color: 'bg-purple-500' },
      { id: 'computer-science', name: 'Computer Science', icon: Monitor, color: 'bg-indigo-500' },
      { id: 'maths', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500' }
    ],
    'a2-levels': [
      { id: 'physics', name: 'Physics', icon: BookOpen, color: 'bg-purple-500' },
      { id: 'computer-science', name: 'Computer Science', icon: Monitor, color: 'bg-indigo-500' },
      { id: 'maths', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500' }
    ]
  };

  // Sample content data
  const contentData: Record<string, ContentItem[]> = {
    'o-levels-chemistry-topicals': [
      {
        id: '1',
        title: 'Atomic Structure Topicals',
        description: 'Past paper questions on atomic structure and electron configuration',
        author: 'Dr. Ahmed',
        uploadDate: '2024-01-15',
        fileSize: '2.5 MB',
        filePath: '/content/o-levels/chemistry/topicals/atomic-structure.pdf',
        type: 'pdf'
      },
      {
        id: '2',
        title: 'Chemical Bonding Topicals',
        description: 'Comprehensive topical questions on ionic and covalent bonding',
        author: 'Prof. Khan',
        uploadDate: '2024-01-18',
        fileSize: '3.2 MB',
        filePath: '/content/o-levels/chemistry/topicals/chemical-bonding.pdf',
        type: 'pdf'
      }
    ],
    'o-levels-chemistry-notes': [
      {
        id: '3',
        title: 'Atomic Structure',
        description: 'Comprehensive notes covering all O-Level chemistry topics',
        author: 'Zubair Khan',
        uploadDate: '2024-01-20',
        filePath: '/OL/chem/atom/atoms.pdf',
        type: 'pdf'
      }
    ],
    'o-levels-chemistry-live-videos': [
      {
        id: '4',
        title: 'Organic Chemistry Live Session',
        description: 'Live recorded session on organic chemistry fundamentals',
        author: 'Dr. Ahmed',
        uploadDate: '2024-01-22',
        duration: '1h 45m',
        filePath: '/content/o-levels/chemistry/videos/organic-chemistry.mp4',
        thumbnailPath: '/thumbnails/organic-chemistry.jpg',
        type: 'video'
      }
    ],
    'as-levels-physics-topicals': [
      {
        id: '5',
        title: 'Mechanics Topicals',
        description: 'Past paper questions on mechanics and motion',
        author: 'Prof. Wilson',
        uploadDate: '2024-01-25',
        fileSize: '4.1 MB',
        filePath: '/content/as-levels/physics/topicals/mechanics.pdf',
        type: 'pdf'
      }
    ],
    'as-levels-physics-notes': [
      {
        id: '6',
        title: 'AS Physics Complete Notes',
        description: 'Detailed notes covering all AS-Level physics topics',
        author: 'Prof. Wilson',
        uploadDate: '2024-01-28',
        fileSize: '22.3 MB',
        filePath: '/content/as-levels/physics/notes/complete-physics.pdf',
        type: 'pdf'
      }
    ],
    'as-levels-physics-live-videos': [
      {
        id: '7',
        title: 'Waves and Oscillations',
        description: 'Live session covering wave properties and oscillations',
        author: 'Prof. Wilson',
        uploadDate: '2024-01-30',
        duration: '2h 15m',
        filePath: '/content/as-levels/physics/videos/waves-oscillations.mp4',
        thumbnailPath: '/thumbnails/waves-oscillations.jpg',
        type: 'video'
      }
    ]
  };

  const handleLevelSelect = (level: 'o-levels' | 'as-levels' | 'a2-levels') => {
    setNavigation({ level: 'subjects', selectedLevel: level });
    setSearchTerm('');
  };

  const handleSubjectSelect = (subject: string) => {
    setNavigation({ 
      ...navigation, 
      level: 'content-types', 
      selectedSubject: subject 
    });
    setSearchTerm('');
  };

  const handleContentTypeSelect = (contentType: 'topicals' | 'notes' | 'live-videos') => {
    setNavigation({ 
      ...navigation, 
      level: 'content', 
      selectedContentType: contentType 
    });
    setSearchTerm('');
  };

  const handleBack = () => {
    if (navigation.level === 'subjects') {
      setNavigation({ level: 'home' });
    } else if (navigation.level === 'content-types') {
      setNavigation({ level: 'subjects', selectedLevel: navigation.selectedLevel });
    } else if (navigation.level === 'content') {
      setNavigation({ 
        level: 'content-types', 
        selectedLevel: navigation.selectedLevel,
        selectedSubject: navigation.selectedSubject 
      });
    }
    setSearchTerm('');
  };

  const handleViewItem = (item: ContentItem) => {
    setSelectedItem(item);
    setIsViewerOpen(true);
  };

  const handleDownload = (item: ContentItem) => {
    console.log(`Downloading: ${item.title}`);
    // In a real app: window.open(item.filePath, '_blank');
  };

  const getCurrentContent = () => {
    if (!navigation.selectedLevel || !navigation.selectedSubject || !navigation.selectedContentType) {
      return [];
    }
    
    const key = `${navigation.selectedLevel}-${navigation.selectedSubject}-${navigation.selectedContentType}`;
    return contentData[key] || [];
  };

  const filteredContent = getCurrentContent().filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBreadcrumb = () => {
    const parts = [];
    if (navigation.selectedLevel) {
      parts.push(navigation.selectedLevel.replace('-', ' ').toUpperCase());
    }
    if (navigation.selectedSubject) {
      const subject = levelSubjects[navigation.selectedLevel!]?.find(s => s.id === navigation.selectedSubject);
      parts.push(subject?.name || navigation.selectedSubject);
    }
    if (navigation.selectedContentType) {
      parts.push(navigation.selectedContentType.replace('-', ' ').toUpperCase());
    }
    return parts.join(' > ');
  };

  // Home Page
  if (navigation.level === 'home') {
    return (
      <div className="min-h-screenp-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-amber-600 mb-4">
              Educational Platform
            </h1>
            <p className="text-xl text-gray-300">
              Choose your education level to access study materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* O Levels Card */}
            <div 
              onClick={() => handleLevelSelect('o-levels')}
              className="bg-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">O Levels</h3>
              <p className="text-gray-600 mb-6">
                Ordinary Level curriculum with comprehensive study materials
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Chemistry</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Mathematics</span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Physics</span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">Computer Science</span>
                <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">Urdu</span>
              </div>
            </div>

            {/* AS Levels Card */}
            <div 
              onClick={() => handleLevelSelect('as-levels')}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 p-8 text-center"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AS Levels</h3>
              <p className="text-gray-600 mb-6">
                Advanced Subsidiary Level with specialized subjects
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Physics</span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">Computer Science</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Mathematics</span>
              </div>
            </div>

            {/* A2 Levels Card */}
            <div 
              onClick={() => handleLevelSelect('a2-levels')}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 p-8 text-center"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Atom size={40} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">A2 Levels</h3>
              <p className="text-gray-600 mb-6">
                Advanced Level with in-depth subject knowledge
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Physics</span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">Computer Science</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Mathematics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                onClick={() => setNavigation({ level: 'home' })}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Home size={20} />
                Home
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {getBreadcrumb()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Subject Selection */}
        {navigation.level === 'subjects' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {navigation.selectedLevel?.replace('-', ' ').toUpperCase()} Subjects
            </h2>
            <p className="text-gray-600 mb-8">Select a subject to access study materials</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levelSubjects[navigation.selectedLevel!]?.map((subject) => {
                const Icon = subject.icon;
                return (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject.id)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6"
                  >
                    <div className={`w-16 h-16 ${subject.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{subject.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Access topicals, notes, and live videos for {subject.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Type Selection */}
        {navigation.level === 'content-types' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {levelSubjects[navigation.selectedLevel!]?.find(s => s.id === navigation.selectedSubject)?.name} Materials
            </h2>
            <p className="text-gray-600 mb-8">Choose the type of content you want to access</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => handleContentTypeSelect('topicals')}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6"
              >
                <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <FileText size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Topicals</h3>
                <p className="text-gray-600 text-sm">
                  Topic-wise past paper questions and practice materials
                </p>
              </div>

              <div
                onClick={() => handleContentTypeSelect('notes')}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Notes</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive study notes and reference materials
                </p>
              </div>

              <div
                onClick={() => handleContentTypeSelect('live-videos')}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6"
              >
                <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Play size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Videos</h3>
                <p className="text-gray-600 text-sm">
                  Recorded live sessions and video lectures
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Display */}
        {navigation.level === 'content' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {navigation.selectedContentType?.replace('-', ' ').toUpperCase()}
            </h2>
            <p className="text-gray-600 mb-6">
              {levelSubjects[navigation.selectedLevel!]?.find(s => s.id === navigation.selectedSubject)?.name} - {navigation.selectedContentType?.replace('-', ' ')}
            </p>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No content found</h3>
                  <p className="text-gray-500">Try adjusting your search or check back later</p>
                </div>
              ) : (
                filteredContent.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border">
                    {/* Thumbnail */}
                    <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-lg flex items-center justify-center">
                      {item.type === 'video' ? (
                        <Play size={48} className="text-blue-500" />
                      ) : (
                        <FileText size={48} className="text-blue-500" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{formatDate(item.uploadDate)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm font-medium text-gray-600">
                          {item.type === 'video' ? item.duration : item.fileSize}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewItem(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                          >
                            <Eye size={14} />
                            {item.type === 'video' ? 'Watch' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDownload(item)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                          >
                            <Download size={14} />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Viewer Modal */}
      {isViewerOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-xl font-semibold">{selectedItem.title}</h2>
                <p className="text-sm text-gray-600">{selectedItem.author}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(selectedItem)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={() => setIsViewerOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  {selectedItem.type === 'video' ? (
                    <>
                      <Play size={64} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Video Player</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Duration: {selectedItem.duration}
                      </p>
                    </>
                  ) : (
                    <>
                      <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">PDF Viewer</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Size: {selectedItem.fileSize}
                      </p>
                    </>
                  )}
                  <p className="text-xs text-gray-400">
                    File: {selectedItem.filePath}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}