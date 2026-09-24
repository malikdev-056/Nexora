import React, { useMemo, useState } from 'react';
import { User, Mail, Phone, Check, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { addStudentToBatch, type Student } from '@/lib/api';

interface StudentFormDialogProps {
  batchId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentSaved: () => void;
}

const courseOptions = [
  'Digital Marketing',
  'AI Skills',
  'Video Editing',
  'Freelancing',
  'Web Design',
  'Content Writing',
];

const statusOptions: { value: string; label: string; dot: string }[] = [
  { value: 'active', label: 'Active', dot: 'bg-emerald-500' },
  { value: 'inactive', label: 'Inactive', dot: 'bg-amber-500' },
  { value: 'completed', label: 'Completed', dot: 'bg-blue-500' },
];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  courses: [] as string[],
  status: 'active',
};

type FieldErrors = { name?: boolean; email?: boolean; courses?: boolean };

const StudentFormDialog: React.FC<StudentFormDialogProps> = ({ batchId, open, onOpenChange, onStudentSaved }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const selectedCourseText = useMemo(() => form.courses.join(', ') || 'No course selected', [form.courses]);

  const emailIsValid = useMemo(() => !form.email || /^\S+@\S+\.\S+$/.test(form.email), [form.email]);

  const handleToggleCourse = (course: string) => {
    setForm((current) => ({
      ...current,
      courses: current.courses.includes(course)
        ? current.courses.filter((item) => item !== course)
        : [...current.courses, course],
    }));
    setFieldErrors((current) => ({ ...current, courses: false }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setError('');
    setFieldErrors({});
  };

  const handleSubmit = async () => {
    const nextFieldErrors: FieldErrors = {
      name: !form.name.trim(),
      email: !form.email.trim() || !emailIsValid,
      courses: form.courses.length === 0,
    };
    setFieldErrors(nextFieldErrors);

    if (nextFieldErrors.name || nextFieldErrors.email || nextFieldErrors.courses) {
      setError('Please fill all required fields correctly');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const createdStudent = await addStudentToBatch(batchId, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        courses: form.courses,
        course: form.courses[0],
        status: form.status,
      });

      if (createdStudent?.studentId) {
        alert(`Student added successfully. Student ID: ${createdStudent.studentId}`);
      }

      resetForm();
      onOpenChange(false);
      onStudentSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save student');
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">Add New Student</DialogTitle>
          <p className="text-sm text-slate-500">Enter the student's details to enroll them in this batch.</p>
        </DialogHeader>

        <div className="grid gap-4 py-2 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Student name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={form.name}
                onChange={(event) => {
                  setForm((current) => ({ ...current, name: event.target.value }));
                  setFieldErrors((current) => ({ ...current, name: false }));
                }}
                placeholder="e.g. Ahmed Khan"
                className={`pl-9 ${fieldErrors.name ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
              />
            </div>
            {fieldErrors.name && <p className="mt-1 text-xs text-red-600">Student name is required</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="email"
                value={form.email}
                onChange={(event) => {
                  setForm((current) => ({ ...current, email: event.target.value }));
                  setFieldErrors((current) => ({ ...current, email: false }));
                }}
                placeholder="student@email.com"
                className={`pl-9 ${fieldErrors.email ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">
                {form.email.trim() ? 'Enter a valid email address' : 'Email is required'}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="03xx-xxxxxxx"
                className="pl-9"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <BookOpen className="h-4 w-4 text-slate-400" />
                Courses enrolled <span className="text-red-500">*</span>
              </label>
              {form.courses.length > 0 && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {form.courses.length} selected
                </span>
              )}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {courseOptions.map((course) => {
                const isSelected = form.courses.includes(course);
                return (
                  <button
                    key={course}
                    type="button"
                    onClick={() => handleToggleCourse(course)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : fieldErrors.courses
                          ? 'border-red-300 bg-white text-slate-700 hover:bg-slate-50'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{course}</span>
                    {isSelected && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {fieldErrors.courses ? (
              <p className="mt-2 text-xs text-red-600">Select at least one course</p>
            ) : (
              <p className="mt-2 text-xs text-slate-500">Selected: {selectedCourseText}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, status: option.value }))}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    form.status === option.value
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      form.status === option.value ? 'bg-white' : option.dot
                    }`}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700">
            {saving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              'Save Student'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;