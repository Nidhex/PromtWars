import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useStudentProfile } from '../../hooks/useStudentProfile';
import { DocumentUploader } from '../../components/upload/DocumentUploader';
import { UploadedFileList } from '../../components/upload/UploadedFileList';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { VoiceInputModal } from '../../components/voice/VoiceInputModal';
import {
  User,
  FileText,
  Mic,
  Plus,
  Trash2,
  CheckCircle2,
  Code2,
  Save,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, loading, error, updateProfile, addSkill, removeSkill } = useStudentProfile();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory] = useState<any>('frontend');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  if (loading) {
    return (
      <AppShell>
        <LoadingState label="Loading Profile Data..." />
      </AppShell>
    );
  }

  if (error || !profile) {
    return (
      <AppShell>
        <ErrorState message={error || 'Profile unavailable'} />
      </AppShell>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      fullName: profile.fullName,
      degree: profile.degree,
      major: profile.major,
      targetDurationWeeks: profile.targetDurationWeeks,
      weeklyHours: profile.weeklyHours,
    });
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      id: `sk_${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: 4,
    });
    setNewSkillName('');
  };

  return (
    <AppShell activeProjectTitle="MedTrial AI Screener">
      <div className="space-y-8">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-surface-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                Student Engineering Profile
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">{profile.fullName}</h1>
            <p className="text-xs text-slate-400 mt-1">
              {profile.degree} • {profile.major} ({profile.institution})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVoiceModalOpen(true)}
              leftIcon={<Mic className="w-3.5 h-3.5 text-brand-400" />}
            >
              Voice Intake
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveProfile}
              isLoading={saving}
              leftIcon={saveSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            >
              {saveSuccess ? 'Profile Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity & Academic Preferences Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic & Project Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.fullName}
                    onChange={(e) => updateProfile({ fullName: e.target.value })}
                  />
                  <Input label="Email" value={profile.email} readOnly disabled />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Degree"
                    value={profile.degree}
                    onChange={(e) => updateProfile({ degree: e.target.value })}
                  />
                  <Input
                    label="Major"
                    value={profile.major}
                    onChange={(e) => updateProfile({ major: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Experience Level"
                    value={profile.experienceLevel}
                    onChange={(e) => updateProfile({ experienceLevel: e.target.value as any })}
                    options={[
                      { value: 'beginner', label: 'Beginner' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'advanced', label: 'Advanced' },
                    ]}
                  />

                  <Input
                    label="Target Weeks"
                    type="number"
                    value={profile.targetDurationWeeks}
                    onChange={(e) => updateProfile({ targetDurationWeeks: Number(e.target.value) })}
                  />

                  <Input
                    label="Weekly Hours"
                    type="number"
                    value={profile.weeklyHours}
                    onChange={(e) => updateProfile({ weeklyHours: Number(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Matrix Section */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Skills & Proficiency Matrix</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Skill Items */}
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="px-3 py-1.5 rounded-lg bg-surface-950 border border-surface-700/60 flex items-center gap-2 text-xs font-mono"
                    >
                      <span className="text-slate-100 font-semibold">{skill.name}</span>
                      <span className="text-cyan-400 text-[10px]">Lvl {skill.proficiency}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Skill Input */}
                <form onSubmit={handleAddSkillSubmit} className="flex gap-2 pt-2 border-t border-surface-700/40">
                  <div className="flex-1">
                    <Input
                      placeholder="Add new skill (e.g. PyTorch, pgvector, Docker)..."
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="secondary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                    Add Skill
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Document Management Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-400" />
                  <span>Resume & Document Area</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DocumentUploader />
                <UploadedFileList documents={profile.documents} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Voice Modal */}
        <VoiceInputModal
          isOpen={voiceModalOpen}
          onClose={() => setVoiceModalOpen(false)}
        />
      </div>
    </AppShell>
  );
};
