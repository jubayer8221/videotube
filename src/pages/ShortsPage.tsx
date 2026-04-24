import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { videoSelectors } from '../store/videoSlice';

export const ShortsPage = () => {
    const theme = useTheme();
    const videos = useAppSelector((state) => videoSelectors.selectAllVideos(state.video));
    const shortVideos = useMemo(
        () => videos.filter((video) => video.duration.includes(':') && Number(video.duration.split(':')[0]) < 1),
        [videos],
    );
    const [activeIndex, setActiveIndex] = useState(0);

    const activeShort = shortVideos[activeIndex] ?? shortVideos[0];

    const handleNavigation = (direction: 'next' | 'prev') => {
        setActiveIndex((current) => {
            if (direction === 'next') {
                return Math.min(current + 1, shortVideos.length - 1);
            }
            return Math.max(current - 1, 0);
        });
    };

    if (!shortVideos.length) {
        return (
            <Typography sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                No shorts available yet.
            </Typography>
        );
    }

    return (
        <Box className="flex flex-col gap-6">
            <Typography
                variant="h4"
                sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}
            >
                Shorts
            </Typography>

            <Card
                sx={{
                    borderRadius: theme.customTokens.radius.lg,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.customTokens.shadow.md,
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: 420,
                            backgroundImage: `url(${activeShort.thumbnail})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Box sx={{ p: theme.spacing(3) }}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                            {activeShort.title}
                        </Typography>
                        <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily, mt: theme.spacing(1) }}>
                            {activeShort.channel} • {activeShort.duration}
                        </Typography>
                        <Box className="flex flex-wrap gap-3 mt-4">
                            <Button
                                onClick={() => handleNavigation('prev')}
                                sx={{
                                    color: theme.palette.text.primary,
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.background.default,
                                }}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => handleNavigation('next')}
                                sx={{
                                    color: theme.palette.text.primary,
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
