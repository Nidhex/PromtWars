import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/Landing/LandingPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { ProjectDetailsPage } from './pages/ProjectDetails/ProjectDetailsPage';
import { BlueprintPage } from './pages/Blueprint/BlueprintPage';
import { RoadmapPage } from './pages/Roadmap/RoadmapPage';
import { MentorPage } from './pages/Mentor/MentorPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { ResumeAnalyzerPage } from './pages/Resume/ResumeAnalyzerPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
