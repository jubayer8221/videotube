import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AIInsightsDrawer } from './AIInsightsDrawer';
import { SearchBar } from './SearchBar';
import { ThemeSwitcher } from './ThemeSwitcher';
import { VerifiedUser } from '@mui/icons-material';

export const Navbar = () => {
    const theme = useTheme();
    const [insightsOpen, setInsightsOpen] = useState(false);
    const [userProfileOpen, setUserProfileOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Shorts', to: '/shorts', icon: SlideshowIcon },
        { label: 'Upload', to: '/upload', icon: CloudUploadIcon },
        { label: 'Studio', to: '/studio', icon: AdsClickIcon },
        { label: 'Profile', to: '/profile', icon: PersonIcon },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backdropFilter: `blur(${theme.customTokens.blur})`,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', gap: theme.spacing(1) }}>
                    {/* Logo */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ display: { xs: 'flex', md: 'none' }, color: theme.palette.text.primary }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button
                            component={RouterLink}
                            to="/"
                            startIcon={<HomeIcon />}
                            sx={{
                                color: theme.palette.text.primary,
                                fontFamily: theme.customTokens.fontFamily,
                                textTransform: 'none',
                                display: { xs: 'none', sm: 'flex' },
                            }}
                        >
                            VideoTube
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/"
                            sx={{
                                color: theme.palette.text.primary,
                                fontFamily: theme.customTokens.fontFamily,
                                textTransform: 'none',
                                display: { xs: 'flex', sm: 'none' },
                                minWidth: 'auto',
                            }}
                        >
                            <HomeIcon />
                        </Button>
                    </Stack>

                    {/* Desktop Nav Items */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    startIcon={<Icon />}
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontFamily: theme.customTokens.fontFamily,
                                        textTransform: 'none',
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Stack>

                    {/* Search Bar */}
                    <Box sx={{ flex: 1, mx: theme.spacing(1), minWidth: '200px', maxWidth: '500px', display: { xs: 'none', sm: 'block' } }}>
                        <SearchBar />
                    </Box>

                    {/* Actions */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        {/* <ThemeSwitcher /> */}
                        <IconButton
                            onClick={() => setInsightsOpen(true)}
                            sx={{ color: theme.palette.text.primary }}
                        >
                            <LightbulbOutlinedIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: theme.palette.text.primary, width: 30, height: 30 }}
                            onClick={() => { setUserProfileOpen(true) }}

                        >
                            <PersonIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>

                {/* Mobile Search Bar */}
                <Box sx={{ display: { xs: 'block', sm: 'none' }, px: 2, pb: 1 }}>
                    <SearchBar />
                </Box>
            </AppBar>

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            >
                <Box sx={{ width: 280, backgroundColor: theme.palette.background.paper }}
                >
                    <Stack sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: theme.customTokens.fontFamily }}>
                                Menu
                            </Typography>
                            <IconButton
                                onClick={() => setMobileMenuOpen(false)}
                                sx={{ color: theme.palette.text.primary }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    startIcon={<Icon />}
                                    fullWidth
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: theme.palette.text.primary,
                                        fontFamily: theme.customTokens.fontFamily,
                                        textTransform: 'none',
                                    }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Stack>
                </Box>
            </Drawer>

            <AIInsightsDrawer open={insightsOpen} onClose={() => setInsightsOpen(false)} />

            <Dialog open={userProfileOpen} onClose={() => setUserProfileOpen(false)}>
                <DialogTitle>Your Profile</DialogTitle>
                <DialogContent>
                    <Typography>This is your profile information.</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};
