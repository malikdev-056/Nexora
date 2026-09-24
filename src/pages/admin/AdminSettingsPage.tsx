import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">System</p>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Academy Name</p>
              <p className="mt-2 text-base font-medium text-slate-900">Nexora Master Class</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">WhatsApp Number</p>
              <p className="mt-2 text-base font-medium text-slate-900">+92 349 8589564</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Primary Color</p>
              <p className="mt-2 text-base font-medium text-slate-900">Navy / Blue</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Landing Page Status</p>
              <p className="mt-2 text-base font-medium text-slate-900">Live</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Save Changes</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
