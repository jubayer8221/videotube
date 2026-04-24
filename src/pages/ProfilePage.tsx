import { Box, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { videoSelectors } from '../store/videoSlice';

export const ProfilePage = () => {
    const theme = useTheme();
    const videos = useAppSelector((state) => videoSelectors.selectAllVideos(state.video));

    return (
        <Stack spacing={4}>
            <Box>
                <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                    Channel profile
                </Typography>
                <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, mt: theme.spacing(1), fontFamily: theme.customTokens.fontFamily }}>
                    A unified profile space for creators, subscribers, and personal settings.
                </Typography>
            </Box>

            <Card sx={{ borderRadius: theme.customTokens.radius.lg, backgroundColor: theme.palette.background.paper, boxShadow: theme.customTokens.shadow.sm }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                            VideoTube Creator
                        </Typography>
                        <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily }}>
                            175K subscribers • 1.4K videos uploaded
                        </Typography>
                        <Box className="flex flex-wrap gap-3">
                            <Chip
                                label={`${videos.length} uploads`}
                                sx={{
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.background.default,
                                    fontFamily: theme.customTokens.fontFamily,
                                }}
                            />
                            <Chip
                                label="Verified Creator"
                                sx={{
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                    fontFamily: theme.customTokens.fontFamily,
                                }}
                            />
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};
