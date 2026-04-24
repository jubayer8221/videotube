import { Box, Button, Card, CardContent, Chip, Divider, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendIcon from '@mui/icons-material/Send';
import { VideoPlayer } from '../components/VideoPlayer';
import { useAppSelector } from '../store/hooks';
import { videoSelectors } from '../store/videoSlice';

export const WatchPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { videoId } = useParams();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [localComments, setLocalComments] = useState<any[]>([]);
    const video = useAppSelector((state) => videoSelectors.selectVideoById(state.video, videoId ?? ''));
    const comments = useAppSelector((state) =>
        videoSelectors
            .selectComments(state.video)
            .filter((comment) => comment.videoId === videoId),
    );
    const videos = useAppSelector((state) => videoSelectors.selectAllVideos(state.video));

    const suggestedVideos = useMemo(
        () => videos.filter((item) => item.id !== videoId).slice(0, 4),
        [videoId, videos],
    );

    if (!video) {
        return (
            <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}
            >
                Video not found.
            </Typography>
        );
    }

    const handleSuggestedVideoClick = (suggestedVideoId: string) => {
        navigate(`/watch/${suggestedVideoId}`);
    };

    const handleLike = () => {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: video.title,
                    text: `Check out this video: ${video.title}`,
                    url: url,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
            } catch (err) {
                alert(`Share this link: ${url}`);
            }
        }
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            const newComment = {
                id: Date.now().toString(),
                videoId: videoId,
                author: 'You',
                content: commentText.trim(),
                likes: 0,
            };
            setLocalComments([...localComments, newComment]);
            setCommentText('');
        }
    };

    const handleCommentKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleCommentSubmit();
        }
    };

    const allComments = [...comments, ...localComments];

    return (
        <Stack spacing={4}>
            <VideoPlayer title={video.title} videoUrl={video.videoUrl} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: theme.spacing(3) }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(3) }}>
                    <Card
                        sx={{
                            borderRadius: theme.customTokens.radius.lg,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.customTokens.shadow.sm,
                        }}
                    >
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontFamily: theme.customTokens.fontFamily,
                                        fontSize: { xs: '1.1rem', md: '1.5rem' }
                                    }}
                                >
                                    {video.title}
                                </Typography>
                                <Typography
                                    sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily, fontSize: '0.9rem' }}
                                >
                                    {video.channel} • {video.views} • {video.uploaded}
                                </Typography>

                                {/* Action Buttons */}
                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                    <Button
                                        startIcon={liked ? <ThumbUpIcon /> : <ThumbUpIcon />}
                                        onClick={handleLike}
                                        variant={liked ? 'contained' : 'outlined'}
                                        size="small"
                                        sx={{ fontSize: '0.85rem' }}
                                    >
                                        Like
                                    </Button>
                                    <Button
                                        startIcon={<ThumbDownIcon />}
                                        onClick={handleDislike}
                                        variant={disliked ? 'contained' : 'outlined'}
                                        size="small"
                                        sx={{ fontSize: '0.85rem' }}
                                    >
                                        Dislike
                                    </Button>
                                    <Button
                                        startIcon={<ShareIcon />}
                                        onClick={handleShare}
                                        variant="outlined"
                                        size="small"
                                        sx={{ fontSize: '0.85rem' }}
                                    >
                                        Share
                                    </Button>
                                    <Button
                                        startIcon={bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                        onClick={handleBookmark}
                                        variant={bookmarked ? 'contained' : 'outlined'}
                                        size="small"
                                        sx={{ fontSize: '0.85rem' }}
                                    >
                                        Save
                                    </Button>
                                </Stack>

                                <Box className="flex flex-wrap gap-2" sx={{ mt: 2 }}>
                                    <Chip
                                        label={video.category}
                                        sx={{
                                            borderRadius: theme.customTokens.radius.sm,
                                            backgroundColor: theme.palette.background.default,
                                            color: theme.palette.text.primary,
                                            fontFamily: theme.customTokens.fontFamily,
                                        }}
                                    />
                                    <Chip
                                        label={`${video.likes} likes`}
                                        sx={{
                                            borderRadius: theme.customTokens.radius.sm,
                                            backgroundColor: theme.palette.background.default,
                                            color: theme.palette.text.primary,
                                            fontFamily: theme.customTokens.fontFamily,
                                        }}
                                    />
                                </Box>
                                <Divider sx={{ my: 1, borderColor: theme.palette.divider }} />
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily }}
                                >
                                    {video.description}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            borderRadius: theme.customTokens.radius.lg,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.customTokens.shadow.sm,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily, mb: 2 }}>
                                Comments
                            </Typography>

                            {/* Comment Input */}
                            <Stack direction="row" spacing={1} sx={{ mb: 3, gap: 1 }}>
                                <TextField
                                    placeholder="Add a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    size="small"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            color: theme.palette.text.primary,
                                            '& fieldset': {
                                                borderColor: theme.palette.divider,
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    size="small"
                                    endIcon={<SendIcon />}
                                    onClick={handleCommentSubmit}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Post
                                </Button>
                            </Stack>                          <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
                            <Stack spacing={2}>
                                {comments.length ? (
                                    comments.map((comment) => (
                                        <Box key={comment.id}>
                                            <Typography sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily, fontWeight: 700, fontSize: '0.9rem' }}>
                                                {comment.author}
                                            </Typography>
                                            <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily, fontSize: '0.85rem' }}>
                                                {comment.content}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography sx={{ color: theme.palette.text.primary, opacity: 0.72, fontFamily: theme.customTokens.fontFamily, fontSize: '0.9rem' }}>
                                        No comments yet. Start the conversation with viewers.
                                    </Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(3) }}>
                    <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily, fontSize: { xs: '1rem', md: '1.1rem' } }}
                    >
                        Suggested videos
                    </Typography>
                    <Stack spacing={2}>
                        {suggestedVideos.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => handleSuggestedVideoClick(item.id)}
                                sx={{
                                    borderRadius: theme.customTokens.radius.md,
                                    backgroundColor: theme.palette.background.paper,
                                    boxShadow: theme.customTokens.shadow.sm,
                                    cursor: 'pointer',
                                    transition: 'transform 200ms ease, box-shadow 200ms ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: theme.customTokens.shadow.md,
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: theme.palette.secondary.main, fontFamily: theme.customTokens.fontFamily }}
                                    >
                                        {item.channel}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily, mt: theme.spacing(1) }}
                                    >
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Stack >
    );
};
