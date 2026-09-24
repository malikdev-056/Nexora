import React, { useEffect, useMemo, useState } from 'react';
import { Award, FileText, Search, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BatchManager from '@/components/admin/BatchManager';
import CertificateIssueDialog from '@/components/admin/CertificateIssueDialog';
import { fetchBatches, fetchBatchCertificates, fetchBatchStudents, type Batch, type Certificate, type Student } from '@/lib/api';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

const isImageFile = (fileName: string) => /\.(png|jpe?g|webp|gif)$/i.test(fileName);

const CertificatesPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadBatches = async () => {
    try {
      const batchData = await fetchBatches();
      setBatches(batchData);
      if (batchData.length > 0 && !selectedBatchId) {
        setSelectedBatchId(batchData[0].id);
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
      setCertificates([]);
      return;
    }

    const loadBatchData = async () => {
      setDataLoading(true);
      try {
        const [batchStudents, batchCertificates] = await Promise.all([
          fetchBatchStudents(selectedBatchId),
          fetchBatchCertificates(selectedBatchId),
        ]);

        setStudents(batchStudents);
        setCertificates(batchCertificates);
      } catch (error) {
        console.error('Failed to load batch certificate data', error);
        setStudents([]);
        setCertificates([]);
      } finally {
        setDataLoading(false);
      }
    };

    loadBatchData();
  }, [selectedBatchId]);

  const selectedBatchName = batches.find((batch) => batch.id === selectedBatchId)?.name || 'Selected Batch';

  const filteredCertificates = useMemo(() => {
    if (!searchQuery.trim()) return certificates;
    const q = searchQuery.toLowerCase();
    return certificates.filter(
      (c) => c.studentName.toLowerCase().includes(q) || c.fileName.toLowerCase().includes(q)
    );
  }, [certificates, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Academy</p>
          <h2 className="text-2xl font-bold text-slate-900">Certificates</h2>
        </div>
        <Button
          onClick={() => selectedBatchId && setCertificateDialogOpen(true)}
          disabled={!selectedBatchId}
          className="gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Award className="h-4 w-4" />
          Issue Certificate
        </Button>
      </div>

      <BatchManager
        batches={batches}
        selectedBatchId={selectedBatchId}
        onSelectBatch={setSelectedBatchId}
        onBatchCreated={loadBatches}
      />

      {selectedBatchId && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{certificates.length}</p>
                <p className="text-xs font-medium text-slate-500">Certificates Issued</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{students.length}</p>
                <p className="text-xs font-medium text-slate-500">Students in Batch</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-slate-200 shadow-sm">
        <CardContent className={selectedBatchId ? 'p-5' : 'p-0'}>
          {selectedBatchId ? (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-slate-900">{selectedBatchName}</h3>
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search student or file..."
                    className="pl-9"
                  />
                </div>
              </div>

              {dataLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-40 animate-pulse rounded-xl bg-slate-100" />
                  ))}
                </div>
              ) : filteredCertificates.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCertificates.map((item) => (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
                    >
                      <div className="relative flex h-32 items-center justify-center overflow-hidden bg-slate-50">
                        {isImageFile(item.fileName) ? (
                          <img
                            src={item.fileUrl}
                            alt={item.fileName}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <FileText className="h-10 w-10 text-slate-300" />
                        )}
                        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                          {getInitials(item.studentName)}
                        </div>
                      </div>
                      <div className="space-y-1.5 p-3.5">
                        <p className="truncate text-sm font-semibold text-slate-800">{item.studentName}</p>
                        <p className="truncate text-xs text-slate-500">{item.fileName}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-slate-400">
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </span>

<div className="flex items-center gap-1">
  <a
    href={item.fileUrl}
    target="_blank"
    rel="noreferrer"
    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-blue-600"
    aria-label={`View ${item.fileName}`}
  >
    <ExternalLink className="h-3.5 w-3.5" />
  </a>
  
  <a
    href={item.fileUrl}
    download={item.fileName}
    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-blue-600"
    aria-label={`Download ${item.fileName}`}
  >
    <Download className="h-3.5 w-3.5" />
  </a>
</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 px-6 py-14 text-center text-slate-500">
                  <Award className="h-8 w-8 text-slate-300" />
                  <p className="font-medium">
                    {searchQuery ? 'No certificates match your search.' : 'No certificates uploaded in this batch yet.'}
                  </p>
                </div>
              )}
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
        <CertificateIssueDialog
          batchId={selectedBatchId}
          students={students}
          open={certificateDialogOpen}
          onOpenChange={setCertificateDialogOpen}
          onCertificateSaved={async () => {
            const updated = await fetchBatchCertificates(selectedBatchId);
            setCertificates(updated);
          }}
        />
      )}
    </div>
  );
};

export default CertificatesPage;