import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = () => {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    minHeight: `calc(100vh - ${theme.spacing(12)})`,
                }}
            >
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        px: { xs: 1.5, sm: 2, md: 4 },
                        py: { xs: 2, sm: 3, md: 4 },
                        overflowX: 'hidden',
                        width: '100%',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
