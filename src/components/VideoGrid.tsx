import { Box, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import { VideoCard } from './VideoCard';
import type { VideoEntity } from '../store/videoSlice';

interface VideoGridProps {
    videos: VideoEntity[];
    loading?: boolean;
}

export const VideoGrid = ({ videos, loading = false }: VideoGridProps) => {
    const theme = useTheme();

    if (!loading && videos.length === 0) {
        return (
            <Typography sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                No videos match your search.
            </Typography>
        );
    }

    const gridItems: Array<VideoEntity | { placeholderId: number }> = loading
        ? Array.from({ length: 6 }, (_, index) => ({ placeholderId: index }))
        : videos;

    return (
        <Grid container spacing={3}>
            {gridItems.map((item, index) => {
                const isPlaceholder = 'placeholderId' in item;

                return (
                    <Grid key={isPlaceholder ? item.placeholderId : item.id} item xs={12} sm={6} xl={4}>
                        {isPlaceholder ? (
                            <Box sx={{ borderRadius: theme.customTokens.radius.lg, overflow: 'hidden', backgroundColor: theme.palette.background.paper, boxShadow: theme.customTokens.shadow.sm, p: theme.spacing(2) }}>
                                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: theme.customTokens.radius.md }} />
                                <Skeleton width="60%" sx={{ mt: theme.spacing(2), borderRadius: theme.customTokens.radius.sm }} />
                                <Skeleton width="40%" sx={{ mt: theme.spacing(1), borderRadius: theme.customTokens.radius.sm }} />
                            </Box>
                        ) : (
                            <VideoCard videoId={item.id} />
                        )}
                    </Grid>
                );
            })}
        </Grid>
    );
};
