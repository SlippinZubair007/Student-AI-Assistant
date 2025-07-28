"use client"
import React, { useState, useEffect } from 'react';
import { Clock, Eye, Send, FileText, CheckCircle, XCircle, AlertCircle, User, Shield, Key } from 'lucide-react';

interface Test {
  id: number;
  title: string;
  subject: string;  
  startTime: Date;
  endTime: Date;
  pdfPath: string;
  submitted: boolean;
  submittedAt: Date | null;
  solutionUrl?: string;
  solutionFileName?: string;
}

// Global storage that persists across user sessions
// In a real app, this would be a database
let globalSubmissions: {[key: number]: {submitted: boolean, submittedAt: Date | null, solutionUrl?: string, solutionFileName?: string}} = {};

const TestManagementPage = () => {
  const [tests] = useState<Test[]>([
    {
      id: 1,
      title: "Structure Charts - 25 Marks",
      subject: "CS",
      startTime: new Date("2025-07-28T18:20:00"),
      endTime: new Date("2025-07-28T19:20:00"),
      pdfPath: "/as/cs/ascst1.pdf",
      submitted: false,
      submittedAt: null
    },
    {
      id: 2,
      title: "Circular Motion - 50 Marks",
      subject: "A2 Physics", 
      startTime: new Date("2025-07-28T20:20:00"),
      endTime: new Date("2025-07-28T21:40:00"),
      pdfPath: "/A2/phys/a2physt1.pdf",
      submitted: false,
      submittedAt: null
    },
    {
      id: 3,
      title: "Circular Properties",
      subject: "Maths",
      startTime: new Date("2025-07-28T20:20:00"),
      endTime: new Date("2025-07-28T21:40:00"),
      pdfPath: "/OL/maths/olmathst2.pdf",
      submitted: false,
      submittedAt: null
    },
    {
        id: 4,
        title: "Circular Properties MS",
        subject: "Maths",
        startTime: new Date("2025-07-28T21:40:00"),
        endTime: new Date("2025-09-28T20:55:00"),
        pdfPath: "/OL/maths/olmathsm1.pdf",
        submitted: false,
        submittedAt: null
    },
    {
        id: 5,
        title: "Circular Motion MS" ,
        subject: "A2 Physics",
        startTime: new Date("2025-07-28T21:40:00"),
        endTime: new Date("2025-09-28T20:55:00"),
        pdfPath: "/A2/phys/a2physm1.pdf",
        submitted: false,
        submittedAt: null
    },
{
        id: 6,
        title: "Sample Video" ,
        subject: "Sample",
        startTime: new Date("2025-07-28T17:10:00"),
        endTime: new Date("2025-09-28T20:55:00"),
        pdfPath: "/AS/phys/asphyst1.pdf",
        submitted: false,
        submittedAt: null
    }

  ]);

  const [userRole, setUserRole] = useState('student');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincode, setPincode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<number | null>(null);
  
  // Local state that syncs with global storage
  const [testSubmissions, setTestSubmissions] = useState<{[key: number]: {submitted: boolean, submittedAt: Date | null, solutionUrl?: string, solutionFileName?: string}}>(globalSubmissions);

  // Sync local state with global storage on component mount
  useEffect(() => {
    setTestSubmissions({...globalSubmissions});
  }, []);

  // Function to update both local and global storage
  const updateSubmissions = (newSubmissions: typeof testSubmissions) => {
    globalSubmissions = {...newSubmissions};
    setTestSubmissions(newSubmissions);
  };

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

  const uploadSolutionToCloudinary = async (file: File): Promise<string> => {
    try {
      const cloudName = "dq4ebynfz";
      const uploadPreset = "flareuploads";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "solutions");

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ Solution uploaded to Cloudinary:", data);
      return data.secure_url as string;
    } catch (error) {
      console.error("❌ Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleSolutionSubmit = async (testId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file only');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      try {
        setIsSubmitting(testId);
        
        console.log('Uploading solution to Cloudinary...');
        const solutionUrl = await uploadSolutionToCloudinary(file);
        console.log('Upload successful:', solutionUrl);
        
        // Update both local and global storage
        const newSubmissions = {
          ...testSubmissions,
          [testId]: {
            submitted: true,
            submittedAt: new Date(),
            solutionUrl,
            solutionFileName: file.name
          }
        };
        
        updateSubmissions(newSubmissions);
        
        alert('✅ Solution uploaded successfully to Cloudinary!');
      } catch (error) {
        console.error('Solution upload error:', error);
        alert(`❌ Error uploading solution: ${
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message?: string }).message
            : 'Please try again.'
        }`);
      } finally {
        setIsSubmitting(null);
      }
    };
    
    input.click();
  };

  const handleViewPDF = (pdfPath: string) => {
    window.open(pdfPath, '_blank', 'noopener,noreferrer');
  };

  const handleViewSolution = (solutionUrl: string) => {
    window.open(solutionUrl, '_blank', 'noopener,noreferrer');
  };

  const getTestStatus = (test: Test) => {
    const now = new Date();
    if (now < test.startTime) return 'upcoming';
    if (now > test.endTime) return 'ended';
    return 'active';
  };

  const canViewTest = (test: Test) => {
    const status = getTestStatus(test);
    return status === 'active';
  };

  const canSubmit = (test: Test) => {
    const status = getTestStatus(test);
    const submission = testSubmissions[test.id];
    return status === 'active' && !submission?.submitted;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate total submissions from global storage
  const totalSubmissions = Object.values(globalSubmissions).filter(s => s.submitted).length;

  const TestCard: React.FC<{ test: Test }> = ({ test }) => {
    const status = getTestStatus(test);
    const submission = testSubmissions[test.id] || test;
    
    const statusColors = {
      upcoming: 'border-yellow-500 bg-yellow-500/10',
      active: 'border-green-500 bg-green-500/10',
      ended: 'border-red-500 bg-red-500/10'
    };

    return (
      <div className={`relative overflow-hidden rounded-xl border-2 ${statusColors[status]} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/80"></div>
        <div className="relative p-6">
          <div className="absolute top-4 right-4">
            {status === 'upcoming' && (
              <span title="Upcoming">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              </span>
            )}
            {status === 'active' && (
              <span title="Active">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </span>
            )}
            {status === 'ended' && (
              <span title="Ended">
                <XCircle className="w-5 h-5 text-red-500" />
              </span>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 pr-8">{test.title}</h3>
            <p className="text-gray-300 text-sm mb-1">{test.subject}</p>
            <p className="text-gray-400 text-xs mb-3">📄 {test.pdfPath}</p>
            
            <div className="flex flex-col gap-2 text-sm text-gray-400">
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

          {submission.submitted && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30">
              <p className="text-green-400 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Submitted on {submission.submittedAt ? formatTime(submission.submittedAt) : 'N/A'}
              </p>
              {submission.solutionFileName && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-green-300 text-xs">📄 {submission.solutionFileName}</span>
                  {userRole === 'admin' && submission.solutionUrl && (
                    <button 
                      onClick={() => handleViewSolution(submission.solutionUrl!)}
                      className="text-blue-400 text-xs hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View Solution
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (canViewTest(test)) {
                  handleViewPDF(test.pdfPath);
                }
              }}
              disabled={!canViewTest(test)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                canViewTest(test)
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              title={canViewTest(test) ? 'View Test PDF' : 'Test not available yet'}
            >
              <Eye className="w-4 h-4" />
              View Test
            </button>

            {userRole === 'student' && (
              <button
                onClick={() => {
                  if (canSubmit(test)) {
                    handleSolutionSubmit(test.id);
                  }
                }}
                disabled={!canSubmit(test) || isSubmitting === test.id}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  canSubmit(test) && isSubmitting !== test.id
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                title={canSubmit(test) ? 'Submit Solution' : submission.submitted ? 'Already Submitted' : 'Submission Closed'}
              >
                {isSubmitting === test.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {submission.submitted ? 'Submitted' : 'Submit'}
                  </>
                )}
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
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-700 to-amber-500 bg-clip-text text-transparent mb-4 leading-[2.2]">
            Test your knowledge 
          </h1>
          
          <div className="mt-4 flex justify-center items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Cloudinary: Connected
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Active Tests: {tests.filter(t => getTestStatus(t) === 'active').length}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              Total Submissions: {totalSubmissions}
            </span>
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map(test => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>

        {tests.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tests available</h3>
            <p className="text-gray-500">Tests will appear here when added to the array</p>
          </div>
        )}

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

        <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Exam instructions 
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-200">📚 For Students:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>View tests only during active time periods</li>
                <li>Click &quot;View Test&quot; to open PDF of the test</li>
                <li>Submit solutions as PDF files during active periods</li>
                <li>Only PDF solutions will be accepted , you can use CAMSCANNER</li>
                <li>You should see a message at top after submission, avoid multiple submissions</li>
                <li>Once the exam timeframe ends, you will not be able to submit solutions or see the exam</li>
                <li>Last 15 minutes are for scanning and uploading the solution files</li>
              </ul>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestManagementPage;