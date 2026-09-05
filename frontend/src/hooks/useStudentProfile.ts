import { useState, useEffect, useCallback } from 'react';
import { StudentProfile, Skill } from '../types/student';
import { profileService } from '../services/profileService';

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await profileService.getProfile();
      if (res.success && res.data) {
        setProfile(res.data);
      } else {
        setError(res.error || 'Failed to load profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    try {
      const res = await profileService.updateProfile(updates);
      if (res.success && res.data) {
        setProfile(res.data);
        return res.data;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
    return null;
  };

  const addSkill = async (newSkill: Skill) => {
    if (!profile) return;
    const updatedSkills = [...profile.skills, newSkill];
    await updateProfile({ skills: updatedSkills });
  };

  const removeSkill = async (skillId: string) => {
    if (!profile) return;
    const updatedSkills = profile.skills.filter((s) => s.id !== skillId);
    await updateProfile({ skills: updatedSkills });
  };

  const setActiveProject = async (projectId: string) => {
    const res = await profileService.setActiveProject(projectId);
    if (res.success && res.data) {
      setProfile(res.data);
    }
  };

  return {
    profile,
    loading,
    error,
    refreshProfile: fetchProfile,
    updateProfile,
    addSkill,
    removeSkill,
    setActiveProject,
  };
}
