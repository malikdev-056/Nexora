import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, UploadCloud, FileImage, X, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { replaceCertificateInBatch, uploadCertificateToBatch, type Certificate, type Student } from '@/lib/api';

interface CertificateIssueDialogProps {
  batchId: string;
  students: Student[];
  open: boolean;
  certificate?: Certificate | null;
  onOpenChange: (open: boolean) => void;
  onCertificateSaved: (certificate: Certificate) => void | Promise<void>;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

const MAX_SIZE = 5 * 1024 * 1024;

const CertificateIssueDialog: React.FC<CertificateIssueDialogProps> = ({
  batchId,
  students,
  open,
  certificate,
  onOpenChange,
  onCertificateSaved,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  useEffect(() => {
    if (!open) return;
    const linkedStudent = certificate && students.find(
      (student) => student.id === certificate.studentId || student.studentId === certificate.studentCode
    );
    setSelectedStudentId(linkedStudent?.id || '');
    setStudentSearch('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
  }, [open, certificate, students]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return students;
    const q = studentSearch.toLowerCase();
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.studentId || '').toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  const resetForm = () => {
    setSelectedStudentId('');
    setStudentSearch('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
    setIsDragging(false);
  };

  const applyFile = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    if (!/^image\/(png|jpe?g|webp)$/.test(file.type)) {
      setError('Only JPG, PNG or WEBP images are allowed');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('Image must be 5MB or less');
      return;
    }
    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    applyFile(event.dataTransfer.files?.[0] || null);
  };

  const handleSubmit = async () => {
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    if (!selectedFile) {
      setError('Please upload certificate image');
      return;
    }

    if (!selectedStudent.studentId) {
      setError('Selected student has no student ID yet. Please refresh the student list and try again.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const savedCertificate = certificate
        ? await replaceCertificateInBatch(batchId, certificate.id, {
            studentId: selectedStudent.id,
            studentName: selectedStudent.name,
            studentCode: selectedStudent.studentId,
            file: selectedFile,
          })
        : await uploadCertificateToBatch(batchId, {
            studentId: selectedStudent.id,
            studentName: selectedStudent.name,
            studentCode: selectedStudent.studentId,
            file: selectedFile,
          });

      await onCertificateSaved(savedCertificate);
      resetForm();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) return;
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? handleClose() : onOpenChange(next))}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">{certificate ? 'Edit Certificate' : 'Issue Certificate'}</DialogTitle>
          <p className="text-sm text-slate-500">Pick a student and {certificate ? 'upload a replacement' : 'upload'} certificate image.</p>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Select student <span className="text-red-500">*</span>
            </label>

            {selectedStudent ? (
              <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {getInitials(selectedStudent.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{selectedStudent.name}</p>
                    <p className="text-xs text-slate-500">{selectedStudent.studentId || 'No ID'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudentId('')}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-white hover:text-slate-600"
                  aria-label="Change student"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <div className="relative border-b border-slate-200">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search student by name or ID..."
                    className="w-full border-0 px-9 py-2.5 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setError('');
                        }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-slate-50"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          {getInitials(student.name)}
                        </div>
                        <span className="font-medium text-slate-700">{student.name}</span>
                        <span className="ml-auto text-xs text-slate-400">{student.studentId || '—'}</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-3 text-center text-sm text-slate-400">
                      {students.length === 0 ? 'All students in this batch already have certificates' : 'No students found'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Certificate image <span className="text-red-500">*</span>
            </label>

            {selectedFile && previewUrl ? (
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <img src={previewUrl} alt="Certificate preview" className="h-14 w-14 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => applyFile(null)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-white hover:text-red-500"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  <span className="text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  <FileImage className="h-3.5 w-3.5" /> JPG, PNG or WEBP, max 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(e) => applyFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="gap-2 bg-blue-600 text-white hover:bg-blue-700">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {certificate ? 'Updating...' : 'Uploading...'}
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                {certificate ? 'Update Certificate' : 'Upload Certificate'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateIssueDialog;