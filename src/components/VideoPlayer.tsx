import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, IconButton, Slider, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const SAMPLE_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

interface VideoPlayerProps {
    title: string;
    videoUrl?: string;
}

const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoPlayer = ({ title, videoUrl }: VideoPlayerProps) => {
    const theme = useTheme();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        const updateProgress = () => {
            setProgress((video.currentTime / Math.max(video.duration, 1)) * 100);
            setCurrentTime(video.currentTime);
        };

        const updateDuration = () => {
            setDuration(video.duration);
        };

        const handlePlayPause = () => {
            setIsPlaying(!video.paused);
        };

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('play', handlePlayPause);
        video.addEventListener('pause', handlePlayPause);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('play', handlePlayPause);
            video.removeEventListener('pause', handlePlayPause);
        };
    }, []);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        if (video.paused) {
            video.play().catch(err => console.error('Play error:', err));
        } else {
            video.pause();
        }
    };

    const handleProgressChange = (value: number | number[]) => {
        const nextProgress = Array.isArray(value) ? value[0] : value;
        setProgress(nextProgress);

        const video = videoRef.current;
        if (video && video.duration) {
            video.currentTime = (nextProgress / 100) * video.duration;
        }
    };

    const handleVolumeChange = (value: number | number[]) => {
        const nextVolume = Array.isArray(value) ? value[0] : value;
        const video = videoRef.current;
        if (!video) {
            return;
        }
        setVolume(nextVolume);
        video.volume = nextVolume;
    };

    const toggleMute = () => {
        const newMutedState = !muted;
        setMuted(newMutedState);
        if (videoRef.current) {
            videoRef.current.muted = newMutedState;
        }
    };

    const toggleFullscreen = () => {
        if (!playerRef.current) return;

        if (!isFullscreen) {
            playerRef.current.requestFullscreen().catch(err => console.error('Fullscreen error:', err));
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <Box
            ref={playerRef}
            sx={{
                borderRadius: theme.customTokens.radius.lg,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.customTokens.shadow.lg,
                overflow: 'hidden',
            }}
        >
            <Box
                component="video"
                ref={videoRef}
                src={videoUrl || SAMPLE_VIDEO}
                preload="metadata"
                muted={muted}
                sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    backgroundColor: theme.palette.background.default,
                    display: 'block',
                }}
            />
            <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: theme.palette.text.primary,
                        fontFamily: theme.customTokens.fontFamily,
                        fontSize: { xs: '1rem', md: '1.5rem' }
                    }}
                >
                    {title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    <IconButton
                        onClick={togglePlayback}
                        size="small"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.default,
                            borderRadius: theme.customTokens.radius.md,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            }
                        }}
                    >
                        {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                    </IconButton>

                    <Stack spacing={1} sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' } }}>
                        <Slider
                            value={progress}
                            onChange={(_event, nextValue) => handleProgressChange(nextValue)}
                            sx={{ color: theme.palette.primary.main }}
                            slotProps={{
                                input: {
                                    step: 0.1,
                                },
                            }}
                        />
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ justifyContent: 'space-between', px: 0.5, fontSize: '0.75rem' }}>
                            <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                                {formatTime(currentTime)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                                {formatTime(duration)}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ ml: 1 }}>
                        <IconButton
                            onClick={toggleMute}
                            size="small"
                            sx={{ color: theme.palette.text.primary }}
                        >
                            {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                        </IconButton>
                        <Slider
                            value={volume}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(_event, nextValue) => handleVolumeChange(nextValue)}
                            sx={{ width: { xs: 60, md: 120 }, color: theme.palette.secondary.main }}
                        />
                    </Stack>

                    <IconButton
                        onClick={toggleFullscreen}
                        size="small"
                        sx={{ color: theme.palette.text.primary }}
                    >
                        <FullscreenIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
};
