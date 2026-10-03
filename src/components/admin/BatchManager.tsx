import React, { useMemo, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createBatch, deleteBatchById, updateBatch, type Batch } from '@/lib/api';

interface BatchManagerProps {
  batches: Batch[];
  selectedBatchId: string;
  onSelectBatch: (batchId: string) => void;
  onBatchCreated: () => void | Promise<void>;
}

const courseOptions = [
  'Digital Marketing',
  'AI Skills',
  'Video Editing',
  'Freelancing',
  'Web Design',
  'Content Writing',
];

const BatchManager: React.FC<BatchManagerProps> = ({
  batches,
  selectedBatchId,
  onSelectBatch,
  onBatchCreated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const sortedBatches = useMemo(
    () => [...batches].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()),
    [batches]
  );

  const handleCreateBatch = async () => {
    const trimmedName = batchName.trim();

    if (!trimmedName) {
      setError('Batch name is required');
      return;
    }

    try {
      setSaving(true);
      setError('');
      if (editingBatch) {
        await updateBatch(editingBatch.id, trimmedName, enrollmentDate || undefined);
      } else {
        await createBatch(trimmedName, enrollmentDate || undefined);
      }
      setBatchName('');
      setEnrollmentDate('');
      setEditingBatch(null);
      setIsOpen(false);
      await onBatchCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create batch');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBatch = async (batch: Batch) => {
    const confirmed = window.confirm(
      `Delete batch "${batch.name}" and all of its students and certificates permanently? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBatchById(batch.id);
      await onBatchCreated();
    } catch (err) {
      console.error('Failed to delete batch', err);
      alert(err instanceof Error ? err.message : 'Failed to delete batch');
    }
  };

  const openEditBatch = (batch: Batch) => {
    setEditingBatch(batch);
    setBatchName(batch.name);
    setEnrollmentDate(batch.enrollmentDate ? new Date(batch.enrollmentDate).toISOString().slice(0, 10) : '');
    setError('');
    setIsOpen(true);
  };

  const closeDialog = (open: boolean) => {
    setIsOpen(open);
    if (!open && !saving) {
      setEditingBatch(null);
      setBatchName('');
      setEnrollmentDate('');
      setError('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Batch</p>
          <h3 className="text-xl font-bold text-slate-900">Batch Manager</h3>
        </div>

        <Button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white hover:bg-blue-700">
          Add Batch
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sortedBatches.length > 0 ? (
          sortedBatches.map((batch) => (
            <div
              key={batch.id}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
                selectedBatchId === batch.id
                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectBatch(batch.id)}
                className="flex-1 text-left"
              >
                <div className="text-sm font-bold">{batch.name}</div>
                <div className={`mt-1 text-xs ${selectedBatchId === batch.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {batch.enrollmentDate ? new Date(batch.enrollmentDate).toLocaleDateString() : 'No enrollment date'}
                </div>
              </button>

              <button
                type="button"
                aria-label={`Edit batch ${batch.name}`}
                onClick={() => openEditBatch(batch)}
                className={`rounded-md p-2 transition-colors ${
                  selectedBatchId === batch.id ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Pencil className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label={`Delete batch ${batch.name}`}
                onClick={() => handleDeleteBatch(batch)}
                className={`rounded-md p-2 transition-colors ${
                  selectedBatchId === batch.id ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            There is no batch yet.
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingBatch ? 'Edit Batch' : 'Create New Batch'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Batch name</label>
              <Input
                value={batchName}
                onChange={(event) => setBatchName(event.target.value)}
                placeholder="e.g. Batch 1"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Enrollment date</label>
              <Input
                type="date"
                value={enrollmentDate}
                onChange={(event) => setEnrollmentDate(event.target.value)}
              />
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
              Available course categories: {courseOptions.join(', ')}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleCreateBatch} disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700">
              {saving ? 'Saving...' : editingBatch ? 'Save Changes' : 'Create Batch'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchManager;
