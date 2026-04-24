import { Box, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { videoSelectors } from '../store/videoSlice';

const analyticsRows = [
    { label: 'Total views', value: '8.4M' },
    { label: 'Watch time', value: '1.1M hrs' },
    { label: 'Revenue', value: '$42.7K' },
];

export const CreatorStudioPage = () => {
    const theme = useTheme();
    const videos = useAppSelector((state) => videoSelectors.selectAllVideos(state.video));
    const topVideo = useMemo(() => videos[0], [videos]);

    return (
        <Stack spacing={4}>
            <Box>
                <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                    Creator Studio Lite
                </Typography>
                <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, mt: theme.spacing(1), fontFamily: theme.customTokens.fontFamily }}>
                    Instant analytics, thumbnail A/B tests, and performance signals for your channel.
                </Typography>
            </Box>

            <Box className="grid gap-4 md:grid-cols-3">
                {analyticsRows.map((item) => (
                    <Card
                        key={item.label}
                        sx={{
                            borderRadius: theme.customTokens.radius.lg,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.customTokens.shadow.sm,
                        }}
                    >
                        <CardContent>
                            <Typography sx={{ color: theme.palette.secondary.main, fontFamily: theme.customTokens.fontFamily }}>
                                {item.label}
                            </Typography>
                            <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily, mt: theme.spacing(1) }}>
                                {item.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Card sx={{ borderRadius: theme.customTokens.radius.lg, backgroundColor: theme.palette.background.paper, boxShadow: theme.customTokens.shadow.sm }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                            Thumbnail A/B Test
                        </Typography>
                        <Box className="flex flex-wrap gap-3">
                            <Chip
                                label="Variant A"
                                sx={{
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.background.default,
                                    fontFamily: theme.customTokens.fontFamily,
                                }}
                            />
                            <Chip
                                label="Variant B"
                                sx={{
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                    fontFamily: theme.customTokens.fontFamily,
                                }}
                            />
                        </Box>
                        <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily }}>
                            {topVideo ? `Best performing clip: ${topVideo.title}` : 'No video data available yet.'}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};
