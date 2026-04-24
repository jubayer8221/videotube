import { Box, Card, CardContent, CardMedia, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { videoSelectors } from '../store/videoSlice';

interface VideoCardProps {
    videoId: string;
}

export const VideoCard = ({ videoId }: VideoCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const video = useAppSelector((state) =>
        videoSelectors
            .selectAllVideos(state.video)
            .find((item) => item.id === videoId)
    );

    if (!video) {
        return null;
    }

    const tokens = theme.customTokens;

    const handleCardClick = () => {
        navigate(`/watch/${videoId}`);
    };

    return (
        <Card
            onClick={handleCardClick}
            className="flex flex-col gap-3 cursor-pointer"
            sx={{
                borderRadius: tokens.radius.lg,
                boxShadow: tokens.shadow.md,
                backdropFilter: `blur(${tokens.blur})`,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}`,
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: tokens.shadow.lg,
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    sx={{
                        width: '100%',
                        aspectRatio: '16/9',
                        borderTopLeftRadius: tokens.radius.lg,
                        borderTopRightRadius: tokens.radius.lg,
                        objectFit: 'cover',
                    }}
                />
                <Chip
                    label={video.duration}
                    sx={{
                        position: 'absolute',
                        bottom: theme.spacing(1.5),
                        right: theme.spacing(1.5),
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRadius: tokens.radius.sm,
                        fontFamily: tokens.fontFamily,
                    }}
                />
            </Box>

            <CardContent
                sx={{
                    padding: theme.spacing(3),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(1.5),
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="subtitle2"
                        sx={{ color: theme.palette.secondary.main, fontFamily: tokens.fontFamily }}
                    >
                        {video.channel}
                    </Typography>
                    <Chip
                        label="AI Insights"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.default,
                            fontFamily: tokens.fontFamily,
                            borderRadius: tokens.radius.sm,
                        }}
                    />
                </Stack>

                <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary, fontFamily: tokens.fontFamily, lineHeight: 1.3 }}
                >
                    {video.title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: tokens.fontFamily }}
                >
                    {video.description}
                </Typography>

                <Box className="flex flex-wrap gap-2 mt-2">
                    <Chip
                        label={video.views}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRadius: tokens.radius.md,
                            fontFamily: tokens.fontFamily,
                        }}
                    />
                    <Chip
                        label={video.uploaded}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRadius: tokens.radius.md,
                            fontFamily: tokens.fontFamily,
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};
