import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { videoSelectors } from '../store/videoSlice';
import { VideoGrid } from '../components/VideoGrid';

export const SearchResultsPage = () => {
    const theme = useTheme();
    const videos = useAppSelector((state) => videoSelectors.selectAllVideos(state.video));
    const searchQuery = useAppSelector((state) => state.video.searchQuery);

    const results = useMemo(
        () =>
            videos.filter((video) =>
                [video.title, video.channel, video.description]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            ),
        [searchQuery, videos],
    );

    return (
        <Box className="flex flex-col gap-4">
            <Typography
                variant="h4"
                sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}
            >
                Search results
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily }}>
                Results for “{searchQuery || 'all videos'}”
            </Typography>
            <VideoGrid videos={results} />
        </Box>
    );
};
