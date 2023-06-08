import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function MovieCard({ name, image, category, favorite, onClickFav, disabledFav }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <img src={image} height={300} alt={name} loading="lazy" style={{ objectFit: 'cover' }} />
          <Typography variant="subtitle1" fontWeight={600} height={50} gutterBottom>
            {name}
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="body2">{category}</Typography>
            <IconButton sx={{ width: 40, height: 40 }} onClick={onClickFav} disabled={disabledFav}>
              {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
