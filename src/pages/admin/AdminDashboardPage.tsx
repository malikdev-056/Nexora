import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, CreditCard, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchBatches, fetchBatchStudents, fetchBatchCertificates, type Batch, type Student, type Certificate } from '@/lib/api';

const DashboardPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const batchData = await fetchBatches();
        setBatches(batchData);

        if (batchData.length > 0) {
          const allStudents: Student[] = [];
          const allCertificates: Certificate[] = [];

          for (const batch of batchData) {
            const batchStudents = await fetchBatchStudents(batch.id);
            allStudents.push(...batchStudents);

            const batchCertificates = await fetchBatchCertificates(batch.id);
            allCertificates.push(...batchCertificates);
          }

          setStudents(allStudents);
          setCertificates(allCertificates);
        }
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = useMemo(() => [
    { label: 'Total Students', value: String(students.length), icon: Users, change: '+12.4%' },
    { label: 'Batches', value: String(batches.length), icon: BookOpen, change: 'Live' },
    { label: 'Certificates Issued', value: String(certificates.length), icon: GraduationCap, change: '+18.1%' },
    { label: 'Fee Status', value: 'PKR 300', icon: CreditCard, change: 'Per course' },
  ], [batches.length, certificates.length, students.length]);

  const recentStudents = students.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Overview</p>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Dashboard</h2>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {loading ? 'Loading...' : 'System healthy'}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, change }) => (
          <Card key={label} className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{label}</CardTitle>
              <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="pb-3 font-medium">Student</th>
                    <th className="pb-3 font-medium">Course</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.length > 0 ? (
                    recentStudents.map((row) => (
                      <tr key={row.id} className="border-b border-slate-100 last:border-b-0">
                        <td className="py-3 font-medium text-slate-800">{row.name}</td>
                        <td className="py-3 text-slate-600">{row.course}</td>
                        <td className="py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              row.status === 'active'
                                ? 'bg-emerald-100 text-emerald-700'
                                : row.status === 'pending'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {row.status || 'active'}
                          </span>
                        </td>
                        <td className="py-3 text-slate-700">PKR 300</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">
                        No students yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-blue-700">
              Add New Student
            </button>
            <button className="w-full rounded-xl bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-200">
              Issue Certificate
            </button>
            <button className="w-full rounded-xl bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-200">
              Update WhatsApp Info
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
