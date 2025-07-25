"use client"
import React, { useState, useEffect } from 'react';
import { Upload, Clock, Eye, Send, FileText, CheckCircle, XCircle, AlertCircle, Trash2, Key, User, Shield, ExternalLink, FolderOpen } from 'lucide-react';

interface Test {
  id: number;
  title: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  pdfUrl: string;
  submitted: boolean;
  submittedAt: Date | null;
  solutionUrl?: string;
  solutionFileName?: string;
}

const TestManagementPage = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [userRole, setUserRole] = useState('student');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincode, setPincode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Google Drive folder links - Replace these with your actual folder links
  const ADMIN_UPLOAD_FOLDER = 'https://drive.google.com/drive/folders/14_DY48lDt58d4LiCoHOP_-qZfY2ij6L1?usp=drive_link'; // Tests folder
  const STUDENT_SUBMIT_FOLDER = 'https://drive.google.com/drive/folders/1xmADyWxqIWfN11hn3q66KNU_qhRTEvAX?usp=drive_link'; // Solutions folder
  const VIEW_TESTS_FOLDER = 'https://drive.google.com/drive/folders/14_DY48lDt58d4LiCoHOP_-qZfY2ij6L1?usp=drive_link'; // Same as tests folder for viewing

  // Sample data
  useEffect(() => {
    const sampleTests: Test[] = [
      {
        id: 1,
        title: 'Mathematics Quiz 1',
        subject: 'Mathematics',
        startTime: new Date('2025-07-25T10:00:00'),
        endTime: new Date('2025-07-25T12:00:00'),
        pdfUrl: 'https://drive.google.com/file/d/1SAMPLE_FILE_ID/view',
        submitted: false,
        submittedAt: null
      },
      {
        id: 2,
        title: 'Physics Test 1',
        subject: 'Physics',
        startTime: new Date('2025-07-24T14:00:00'),
        endTime: new Date('2025-07-24T16:00:00'),
        pdfUrl: 'https://drive.google.com/file/d/1SAMPLE_FILE_ID_2/view',
        submitted: true,
        submittedAt: new Date('2025-07-24T15:45:00'),
        solutionFileName: 'physics_solution.pdf'
      }
    ];
    setTests(sampleTests);
  }, []);

  // Admin auth
  const handleAdminAccess = () => {
    if (pincode === '1269') {
      setIsAuthenticated(true);
      setUserRole('admin');
      setShowPincodeModal(false);
      setPincode('');
    } else {
      alert('Incorrect pincode!');
      setPincode('');
    }
  };

  const handleRoleSwitch = (role: string) => {
    if (role === 'admin' && !isAuthenticated) {
      setShowPincodeModal(true);
    } else {
      setUserRole(role);
    }
  };

  // Open Google Drive folders
  const openAdminUploadFolder = () => {
    window.open(ADMIN_UPLOAD_FOLDER, '_blank');
  };

  const openStudentSubmitFolder = (testId: number) => {
    // You can customize this to open different folders for different tests
    window.open(STUDENT_SUBMIT_FOLDER, '_blank');
    
    // Mark as submitted (simulated)
    const updatedTests = tests.map(test => {
      if (test.id === testId) {
        return {
          ...test,
          submitted: true,
          submittedAt: new Date(),
          solutionFileName: 'solution_uploaded.pdf'
        };
      }
      return test;
    });
    
    setTests(updatedTests);
  };

  const openViewTestsFolder = () => {
    window.open(VIEW_TESTS_FOLDER, '_blank');
  };

  const handleDeleteTest = (testId: number) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setTests(prev => prev.filter(test => test.id !== testId));
    }
  };

  const getTestStatus = (test: Test) => {
    const now = new Date();
    if (now < test.startTime) return 'upcoming';
    if (now > test.endTime) return 'ended';
    return 'active';
  };

  const canViewTest = (test: Test) => {
    return getTestStatus(test) !== 'upcoming';
  };

  const canSubmit = (test: Test) => {
    const status = getTestStatus(test);
    return status === 'active' && !test.submitted;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TestCard: React.FC<{ test: Test }> = ({ test }) => {
    const status = getTestStatus(test);
    const statusColors = {
      upcoming: 'border-yellow-500 bg-yellow-500/10',
      active: 'border-green-500 bg-green-500/10',
      ended: 'border-red-500 bg-red-500/10'
    };

    return (
      <div className={`relative overflow-hidden rounded-xl border-2 ${statusColors[status]} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/80"></div>
        <div className="relative p-6">
          {/* Admin Delete Button */}
          {userRole === 'admin' && isAuthenticated && (
            <button
              onClick={() => handleDeleteTest(test.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            {status === 'upcoming' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
            {status === 'active' && <CheckCircle className="w-5 h-5 text-green-500" />}
            {status === 'ended' && <XCircle className="w-5 h-5 text-red-500" />}
          </div>

          {/* Test Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 pr-8">{test.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{test.subject}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Start: {formatTime(test.startTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>End: {formatTime(test.endTime)}</span>
              </div>
            </div>
          </div>

          {/* Submission Status */}
          {test.submitted && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30">
              <p className="text-green-400 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Submitted on {test.submittedAt ? formatTime(test.submittedAt) : 'N/A'}
              </p>
              {test.solutionFileName && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-green-300 text-xs">📄 {test.solutionFileName}</span>
                  {userRole === 'admin' && (
                    <button 
                      onClick={() => window.open(STUDENT_SUBMIT_FOLDER, '_blank')}
                      className="text-blue-400 text-xs hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View Solutions
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (canViewTest(test)) {
                  if (test.pdfUrl.includes('drive.google.com')) {
                    window.open(test.pdfUrl, '_blank');
                  } else {
                    openViewTestsFolder();
                  }
                }
              }}
              disabled={!canViewTest(test)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                canViewTest(test)
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Eye className="w-4 h-4" />
              View Test
            </button>

            {userRole === 'student' && (
              <button
                onClick={() => {
                  if (canSubmit(test)) {
                    openStudentSubmitFolder(test.id);
                  }
                }}
                disabled={!canSubmit(test)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  canSubmit(test)
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <ExternalLink className="w-3 h-3" />
                {test.submitted ? 'Submitted' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Test Management System
          </h1>
       
          
          {/* Drive Status */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Google Drive: Ready
            </span>
            
        
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-red-500/30 p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-red-500" />
              Select User Role
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  userRole === 'student' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <User className="w-4 h-4" />
                Student
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  userRole === 'admin' && isAuthenticated
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Admin Upload Section */}
        {userRole === 'admin' && isAuthenticated && (
          <div className="mb-8">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Upload className="w-6 h-6 text-red-500" />
                Upload Tests to Google Drive
              </h2>
              
              <div className="border-2 border-dashed border-red-500/50 hover:border-red-500 rounded-xl p-12 text-center transition-colors duration-300 cursor-pointer"
                   onClick={openAdminUploadFolder}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                    <FolderOpen className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white mb-2">
                      Click to open Google Drive upload folder
                    </p>
                    <p className="text-gray-400 text-sm">
                      Upload your test PDFs directly to the Google Drive folder
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <ExternalLink className="w-4 h-4" />
                    Opens in new tab
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={openAdminUploadFolder}
                  className="flex items-center justify-center gap-3 p-4 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  <Upload className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">Upload Tests</span>
                  <ExternalLink className="w-4 h-4 text-red-400" />
                </button>
                
                <button
                  onClick={() => window.open(STUDENT_SUBMIT_FOLDER, '_blank')}
                  className="flex items-center justify-center gap-3 p-4 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors"
                >
                  <Eye className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">View Solutions</span>
                  <ExternalLink className="w-4 h-4 text-green-400" />
                </button>
              </div>
            </div>
          </div>
        )}



        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map(test => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>

        {/* Empty State */}
        {tests.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tests available</h3>
            <p className="text-gray-500">
              {userRole === 'admin' ? 'Upload some tests to get started' : 'No tests have been assigned yet'}
            </p>
          </div>
        )}

        {/* Pincode Modal */}
        {showPincodeModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gray-900 rounded-2xl border border-red-500/30 p-8 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Admin Access</h3>
                <p className="text-gray-400">Enter the pincode to access admin features</p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="password"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPincodeModal(false);
                      setPincode('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdminAccess}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <h3 className="text-blue-400 font-bold mb-3">🔧 Instructions</h3>
          <div className="text-blue-300 text-sm space-y-2">
            <p><strong>1.</strong> Access all ongoing tests from this page</p>
            <ul className="ml-4 space-y-1">
              <li>• <strong>Tests Folder:</strong> Where admins upload test PDFs</li>
              <li>• <strong>Solutions Folder:</strong> Where students submit their solutions</li>
              <li>• <strong>View Folder:</strong> Public folder for students to view tests</li>
            </ul>

            <p><strong>2.</strong> Attempt tests on time and upload before ending time otherwise they will be <code className="text-red-500 px-1 rounded font-bold">locked</code></p>
            <p><strong>3.</strong> All tests must be in scanned PDF format</p>
            <p><strong>4.</strong> You can use CAMSCANNER for uploading scanned documents</p>
            <p><strong>5.</strong> Uload tests in your NAME folder only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestManagementPage;