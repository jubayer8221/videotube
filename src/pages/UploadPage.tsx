import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Card, CardContent, Stack, TextField, Typography, useTheme } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addVideo } from '../store/videoSlice';

const defaultFormState = {
    title: '',
    channel: 'VideoTube Creator',
    duration: '0:30',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: '',
    category: 'Creative Tech',
    views: '0 views',
    uploaded: 'Just now',
    likes: '0 likes',
};

export const UploadPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState(defaultFormState);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(addVideo({
            title: form.title,
            channel: form.channel,
            duration: form.duration,
            thumbnail: form.thumbnail,
            videoUrl: form.videoUrl,
            description: form.description,
            category: form.category,
            views: form.views,
            uploaded: form.uploaded,
            likes: form.likes,
        }));
        navigate('/');
    };

    return (
        <Box className="flex flex-col gap-4">
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}>
                Upload a new video
            </Typography>
            <Typography sx={{ color: theme.palette.text.primary, opacity: 0.78, fontFamily: theme.customTokens.fontFamily }}>
                Add professional video metadata so your video can be discovered in the feed and played across devices.
            </Typography>

            <Card sx={{ borderRadius: theme.customTokens.radius.lg, backgroundColor: theme.palette.background.paper, boxShadow: theme.customTokens.shadow.sm }}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Stack spacing={3}>
                            {(['title', 'channel', 'duration', 'thumbnail', 'videoUrl', 'description', 'category', 'views', 'uploaded', 'likes'] as Array<keyof typeof form>).map((field) => (
                                <TextField
                                    key={field}
                                    value={form[field]}
                                    onChange={(event) => handleChange(field, event.target.value)}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    multiline={field === 'description'}
                                    minRows={field === 'description' ? 4 : 1}
                                    fullWidth
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        borderRadius: theme.customTokens.radius.md,
                                        input: { color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily },
                                        textarea: { color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily },
                                        '& .MuiOutlinedInput-root': { borderRadius: theme.customTokens.radius.md },
                                    }}
                                />
                            ))}
                        </Stack>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{
                                mt: theme.spacing(2),
                                alignSelf: 'flex-start',
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.default,
                                borderRadius: theme.customTokens.radius.md,
                                fontFamily: theme.customTokens.fontFamily,
                            }}
                        >
                            Upload video
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
