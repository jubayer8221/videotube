import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { createVideoTubeTheme } from '../theme/themeConfig';

interface ThemeProviderWrapperProps {
    children: React.ReactNode;
}

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
    const selectedTheme = useAppSelector((state) => state.theme.selectedTheme);
    const theme = useMemo(() => createVideoTubeTheme(selectedTheme), [selectedTheme]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
