import { Box, Chip, Divider, Drawer, List, ListItem, ListItemText, Stack, Typography, useTheme } from '@mui/material';

interface AIInsightsDrawerProps {
    open: boolean;
    onClose: () => void;
}

const highlights = [
    'Video engages viewers 28% longer with AI-generated summary.',
    'Suggested thumbnails scored higher for call-to-action clarity.',
    'Audience retention peaks during the first 12 seconds.',
];

export const AIInsightsDrawer = ({ open, onClose }: AIInsightsDrawerProps) => {
    const theme = useTheme();

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 360, p: theme.spacing(4), backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                    AI Insights
                </Typography>
                <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, mt: theme.spacing(1), fontFamily: theme.customTokens.fontFamily }}>
                    Live recommendations, summaries, and highlight moments for your next session.
                </Typography>

                <Divider sx={{ my: theme.spacing(3), borderColor: theme.palette.divider }} />

                <Stack spacing={2}>
                    <Box>
                        <Typography sx={{ color: theme.palette.secondary.main, fontFamily: theme.customTokens.fontFamily }}>Summary</Typography>
                        <Typography sx={{ color: theme.palette.text.primary, opacity: 0.82, mt: theme.spacing(1), fontFamily: theme.customTokens.fontFamily }}>
                            Keep the momentum by highlighting growth-focused content and using themed cards that support glassmorphism and brutalist UI modes.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography sx={{ color: theme.palette.secondary.main, fontFamily: theme.customTokens.fontFamily }}>Key highlights</Typography>
                        <List disablePadding>
                            {highlights.map((item) => (
                                <ListItem key={item} sx={{ px: 0, py: theme.spacing(1) }}>
                                    <ListItemText
                                        primary={item}
                                        primaryTypographyProps={{
                                            sx: { color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily },
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box className="flex flex-wrap gap-2">
                        <Chip
                            label="Auto dubbing"
                            sx={{ borderRadius: theme.customTokens.radius.sm, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}
                        />
                        <Chip
                            label="Ambient glow"
                            sx={{ borderRadius: theme.customTokens.radius.sm, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}
                        />
                    </Box>
                </Stack>
            </Box>
        </Drawer>
    );
};
