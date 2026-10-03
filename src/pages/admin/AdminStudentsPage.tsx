import React, { useEffect, useMemo, useState } from 'react';
import { Search, Trash2, Users, UserCheck, GraduationCap, Mail, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BatchManager from '@/components/admin/BatchManager';
import StudentFormDialog from '@/components/admin/StudentFormDialog';
import { deleteStudentFromBatch, fetchBatches, fetchBatchStudents, type Batch, type Student } from '@/lib/api';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

const avatarColors = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-cyan-100 text-cyan-700',
];

const getAvatarColor = (name: string) => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index] || avatarColors[0];
};

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  completed: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  default: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
};

const StudentsPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadBatches = async () => {
    try {
      const batchData = await fetchBatches();
      setBatches(batchData);
      if (batchData.length > 0 && !selectedBatchId) {
        setSelectedBatchId(batchData[0].id);
      }
      if (batchData.length === 0) {
        setSelectedBatchId('');
        setStudents([]);
      }
      if (batchData.length > 0 && selectedBatchId) {
        const currentBatchExists = batchData.some((batch) => batch.id === selectedBatchId);
        if (!currentBatchExists) {
          setSelectedBatchId(batchData[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to load batches', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  useEffect(() => {
    if (!selectedBatchId) {
      setStudents([]);
      return;
    }

    const loadStudents = async () => {
      setStudentsLoading(true);
      try {
        const data = await fetchBatchStudents(selectedBatchId);
        setStudents(data);
      } catch (error) {
        console.error('Failed to load students', error);
        setStudents([]);
      } finally {
        setStudentsLoading(false);
      }
    };

    loadStudents();
  }, [selectedBatchId]);

  const selectedBatchName = batches.find((batch) => batch.id === selectedBatchId)?.name || 'Selected Batch';

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.studentId || '').toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => (s.status || 'active') === 'active').length;
    const completed = students.filter((s) => s.status === 'completed').length;
    return { total, active, completed };
  }, [students]);

  const handleDeleteStudent = async (student: Student) => {
    const confirmed = window.confirm(
      `Delete student "${student.name}" (${student.studentId || 'No ID'}) permanently from this batch? This action cannot be undone.`
    );

    if (!confirmed || !selectedBatchId) {
      return;
    }

    try {
      await deleteStudentFromBatch(selectedBatchId, student.id);
      setStudents((current) => current.filter((item) => item.id !== student.id));
    } catch (err) {
      console.error('Failed to delete student', err);
      alert(err instanceof Error ? err.message : 'Failed to delete student');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Records</p>
          <h2 className="text-2xl font-bold text-slate-900">Students</h2>
        </div>
        <Button
          onClick={() => {
            setEditingStudent(null);
            setStudentDialogOpen(true);
          }}
          disabled={!selectedBatchId}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add New Student
        </Button>
      </div>

      <BatchManager
        batches={batches}
        selectedBatchId={selectedBatchId}
        onSelectBatch={setSelectedBatchId}
        onBatchCreated={loadBatches}
      />

      {selectedBatchId && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                <p className="text-xs font-medium text-slate-500">Total Students</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
                <p className="text-xs font-medium text-slate-500">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
                <p className="text-xs font-medium text-slate-500">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          {selectedBatchId ? (
            <>
              <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-slate-900">{selectedBatchName}</h3>
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, ID or email..."
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-3 font-medium">Student</th>
                      <th className="px-5 py-3 font-medium">Student ID</th>
                      <th className="px-5 py-3 font-medium">Email</th>
                      <th className="px-5 py-3 font-medium">Courses</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                          <th className="px-5 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsLoading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-b-0">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                          </td>
                        </tr>
                      ))
                    ) : filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50"
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getAvatarColor(
                                  student.name
                                )}`}
                              >
                                {getInitials(student.name)}
                              </div>
                              <span className="font-medium text-slate-800">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 font-semibold text-blue-700">{student.studentId || '—'}</td>
                          <td className="px-5 py-3 text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3.5 w-3.5 text-slate-400" />
                              {student.email}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-slate-600">
                            {(student.courses && student.courses.length > 0 ? student.courses : [student.course || 'N/A']).join(', ')}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                statusStyles[student.status || 'active'] || statusStyles.default
                              }`}
                            >
                              {student.status || 'active'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button
                              type="button"
                              aria-label={`Edit student ${student.name}`}
                              onClick={() => {
                                setEditingStudent(student);
                                setStudentDialogOpen(true);
                              }}
                              className="mr-2 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-100"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              aria-label={`Delete student ${student.name}`}
                              onClick={() => handleDeleteStudent(student)}
                              className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-5 py-14 text-center">
                          <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Users className="h-8 w-8 text-slate-300" />
                            <p className="font-medium">
                              {searchQuery ? 'No students match your search.' : 'There is no student registered.'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex min-h-[220px] items-center justify-center px-6 py-12 text-center text-slate-500">
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                  <span>Loading batches...</span>
                </div>
              ) : (
                'There is no batch show.'
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedBatchId && (
        <StudentFormDialog
          batchId={selectedBatchId}
          open={studentDialogOpen}
          student={editingStudent}
          onOpenChange={setStudentDialogOpen}
          onStudentSaved={async () => {
            const updated = await fetchBatchStudents(selectedBatchId);
            setStudents(updated);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default StudentsPage;