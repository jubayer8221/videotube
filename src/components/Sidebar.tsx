import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';

const navItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Watch', path: '/watch/1', icon: ViewWeekIcon },
    { label: 'Shorts', path: '/shorts', icon: SlideshowIcon },
    { label: 'Upload', path: '/upload', icon: CloudUploadIcon },
    { label: 'Search', path: '/search', icon: SearchIcon },
    { label: 'Creator Studio', path: '/studio', icon: AdsClickIcon },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
];

export const Sidebar = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const sidebarContent = (
        <Box
            sx={{
                width: { xs: 280, md: 280 },
                backgroundColor: theme.palette.background.paper,
                px: { xs: 1, md: 2 },
                py: { xs: 2, md: 4 },
                height: '100%',
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ display: { xs: 'flex', md: 'none' }, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                        Navigation
                    </Typography>
                    <IconButton
                        onClick={() => setMobileOpen(false)}
                        size="small"
                        sx={{ color: theme.palette.text.primary }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: theme.palette.text.primary,
                        fontFamily: theme.customTokens.fontFamily,
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    Navigation
                </Typography>
                <Divider sx={{ borderColor: theme.palette.divider }} />
                <List disablePadding>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <ListItemButton
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    borderRadius: theme.customTokens.radius.md,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                    '&.active': {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.background.default,
                                    },
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        '.MuiListItemText-primary': {
                                            fontFamily: theme.customTokens.fontFamily,
                                            fontSize: { xs: '0.9rem', md: '1rem' }
                                        }
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Stack>
        </Box>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, borderRight: `1px solid ${theme.palette.divider}` }}>
                {sidebarContent}
            </Box>

            {/* Mobile Sidebar Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
};
