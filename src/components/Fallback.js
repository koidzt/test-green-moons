import { Backdrop, Box, CircularProgress, circularProgressClasses } from '@mui/material';

function Fallback({ color, ...props }) {
  return (
    <Backdrop
      sx={{
        color: 'grey.light',
        bgcolor: 'rgba(0, 0, 0, 0.75)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) => color || theme.palette.grey[theme.palette.mode === 'light' ? 700 : 800],
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => theme.palette.primary[theme.palette.mode],
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    </Backdrop>
  );
}

export default Fallback;
