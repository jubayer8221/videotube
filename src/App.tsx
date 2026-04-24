import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProviderWrapper } from './components/ThemeProviderWrapper';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { WatchPage } from './pages/WatchPage';
import { ShortsPage } from './pages/ShortsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { CreatorStudioPage } from './pages/CreatorStudioPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { UploadPage } from './pages/UploadPage';

export const App = () => (
    <ThemeProviderWrapper>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="watch/:videoId" element={<WatchPage />} />
                    <Route path="shorts" element={<ShortsPage />} />
                    <Route path="search" element={<SearchResultsPage />} />
                    <Route path="studio" element={<CreatorStudioPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="upload" element={<UploadPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProviderWrapper>
);
