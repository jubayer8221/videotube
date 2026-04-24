import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export const SettingsPage = () => {
    const theme = useTheme();

    return (
        <Stack spacing={4}>
            <Box>
                <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                    Settings
                </Typography>
                <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, mt: theme.spacing(1), fontFamily: theme.customTokens.fontFamily }}>
                    Configure your theme and design system tokens from one centralized place.
                </Typography>
            </Box>

            <Card sx={{ borderRadius: theme.customTokens.radius.lg, backgroundColor: theme.palette.background.paper, boxShadow: theme.customTokens.shadow.sm }}>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                            Theme selection
                        </Typography>
                        <ThemeSwitcher />
                        <Box>
                            <Typography sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                                Current design tokens are fully controlled by Redux and exposed through the centralized theme config.
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};
