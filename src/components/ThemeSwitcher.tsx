import { useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getThemeNames, ThemeStyle, themeConfig } from '../theme/themeConfig';
import { setTheme } from '../store/themeSlice';

export const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const selectedTheme = useAppSelector((state) => state.theme.selectedTheme);

    const options = useMemo(
        () => getThemeNames().map((key) => ({ key, label: themeConfig[key].name })),
        []
    );

    const handleChange = (event: SelectChangeEvent<ThemeStyle>) => {
        dispatch(setTheme(event.target.value as ThemeStyle));
    };

    return (
        <FormControl
            sx={{
                minWidth: theme.spacing(27.5),
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.customTokens.radius.md,
            }}
        >
            <InputLabel id="theme-switcher-label">Theme</InputLabel>
            <Select
                labelId="theme-switcher-label"
                value={selectedTheme}
                label="Theme"
                onChange={handleChange}
                sx={{ color: theme.palette.text.primary, fontFamily: theme.customTokens.fontFamily }}
            >
                {options.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
