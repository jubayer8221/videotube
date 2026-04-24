import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    List,
    ListItemButton,
    ListItemText,
    TextField,
    useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery, videoSelectors } from '../store/videoSlice';

export const SearchBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector((state) => state.video.searchQuery);
    const suggestions = useAppSelector((state) => videoSelectors.selectSuggestions(state.video));
    const [value, setValue] = useState(searchQuery);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setValue(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        const handler = window.setTimeout(() => {
            dispatch(setSearchQuery(value));
        }, 280);

        return () => window.clearTimeout(handler);
    }, [dispatch, value]);

    const handleSuggestionClick = (query: string) => {
        setValue(query);
        dispatch(setSearchQuery(query));
        setDialogOpen(false);
        setIsClosing(false);
        navigate('/search');
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && value.trim()) {
            dispatch(setSearchQuery(value.trim()));
            setDialogOpen(false);
            setIsClosing(false);
            navigate('/search');
        }
    };

    const handleSearchClick = () => {
        if (value.trim()) {
            dispatch(setSearchQuery(value.trim()));
            setDialogOpen(false);
            setIsClosing(false);
            navigate('/search');
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setIsClosing(true);
        // Reset closing state after a short delay to allow focus events to settle
        setTimeout(() => setIsClosing(false), 100);
    };

    return (
        <>
            <Box className="flex flex-col gap-3">
                <TextField
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => {
                        if (!isClosing) {
                            setDialogOpen(true);
                        }
                    }}
                    placeholder="Search videos, creators, or insights"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: theme.palette.text.primary }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    onClick={handleSearchClick}
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontFamily: theme.customTokens.fontFamily,
                                        textTransform: 'none',
                                        minWidth: 'auto',
                                        px: 1,
                                    }}
                                >
                                    Search
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.customTokens.radius.md,
                        input: {
                            color: theme.palette.text.primary,
                            fontFamily: theme.customTokens.fontFamily,
                        },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: theme.customTokens.radius.md,
                        },
                    }}
                />
            </Box>

            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontFamily: theme.customTokens.fontFamily }}>Search suggestions</DialogTitle>
                <DialogContent>
                    <List>
                        {suggestions.map((suggestion) => (
                            <ListItemButton
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion.query)}
                                sx={{ borderRadius: theme.customTokens.radius.sm, mb: theme.spacing(1), backgroundColor: theme.palette.background.paper }}
                            >
                                <ListItemText
                                    primary={suggestion.query}
                                    primaryTypographyProps={{
                                        sx: { color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily },
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ fontFamily: theme.customTokens.fontFamily }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
