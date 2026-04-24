import { Box, Skeleton, Stack, useTheme } from '@mui/material';

export const LoaderSkeleton = () => {
    const theme = useTheme();

    return (
        <Box sx={{ borderRadius: theme.customTokens.radius.lg, backgroundColor: theme.palette.background.paper, boxShadow: theme.customTokens.shadow.sm, p: theme.spacing(2) }}>
            <Stack spacing={2}>
                <Skeleton variant="rounded" height={180} sx={{ borderRadius: theme.customTokens.radius.md }} />
                <Skeleton width="60%" sx={{ borderRadius: theme.customTokens.radius.sm }} />
                <Skeleton width="40%" sx={{ borderRadius: theme.customTokens.radius.sm }} />
            </Stack>
        </Box>
    );
};
