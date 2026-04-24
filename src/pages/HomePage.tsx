import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SearchBar } from '../components/SearchBar';
import { VideoGrid } from '../components/VideoGrid';
import { fetchVideos, videoSelectors } from '../store/videoSlice';

const categoryLabels = [
    'All',
    'Trending',
    'New Releases',
    'Glass UI',
    'AI Shorts',
    'Creator Studio',
];

export const HomePage = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) =>
        videoSelectors.selectAllVideos(state.video),
    );
    const status = useAppSelector((state) => state.video.status);
    const searchQuery = useAppSelector((state) => state.video.searchQuery);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchVideos());
        }
    }, [dispatch, status]);

    const filteredVideos = useMemo(() => {
        let filtered = videos;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((video) =>
                [video.title, video.channel, video.description]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            );
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((video) =>
                video.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                selectedCategory.toLowerCase().includes(video.category.toLowerCase())
            );
        }

        return filtered;
    }, [searchQuery, videos, selectedCategory]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Stack spacing={4}>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.text.primary,
                        fontFamily: theme.customTokens.fontFamily,
                    }}
                >
                    Discover the next generation of video experiences.
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        opacity: 0.78,
                        mt: theme.spacing(1),
                        fontFamily: theme.customTokens.fontFamily,
                    }}
                >
                    Theme-driven YouTube clone with AI insights, shorts, creator tools, and a centralized design token system.
                </Typography>
            </Box>

            <SearchBar />

            <Box className="flex flex-wrap gap-2">
                {categoryLabels.map((label) => (
                    <Chip
                        key={label}
                        label={label}
                        onClick={() => handleCategoryClick(label)}
                        sx={{
                            color: selectedCategory === label ? theme.palette.background.default : theme.palette.text.primary,
                            backgroundColor: selectedCategory === label ? theme.palette.primary.main : theme.palette.background.paper,
                            borderRadius: theme.customTokens.radius.xl,
                            fontFamily: theme.customTokens.fontFamily,
                            cursor: 'pointer',
                            transition: 'all 200ms ease',
                            '&:hover': {
                                backgroundColor: selectedCategory === label ? theme.palette.primary.dark : theme.palette.action.hover,
                            },
                        }}
                    />
                ))}
            </Box>

            <VideoGrid videos={filteredVideos} loading={status === 'loading'} />
        </Stack>
    );
};
