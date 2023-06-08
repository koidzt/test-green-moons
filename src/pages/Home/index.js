import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import SessionStorage from '../../store/SessionStorage';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Fallback from '../../components/Fallback';

function Home() {
  const user = SessionStorage.getUser() ? JSON.parse(SessionStorage.getUser()) : '';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  const [movies, setMovies] = useState([]);

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleClickLogout = () => {
    SessionStorage.clearUser();
    window.location.reload();
  };

  const handleClickFinder = () => {
    setMovies(allMovies);
  };

  const handleClickFavoriteFilter = () => {
    const newMovies = allMovies.filter((movie) => favMovies.find((id) => id === movie.id));
    setMovies(newMovies);
  };

  const fetchMovieData = async () => {
    setIsLoading(true);
    const result = await axios.get('https://www.majorcineplex.com/apis/get_movie_avaiable');
    if (result.status === 200 && Boolean(result.data.movies)) {
      setAllMovies(result.data.movies);
      setMovies(result.data.movies);
    }
    setIsLoading(false);
  };

  const handleClickFavorite = (id) => () => {
    const findId = favMovies.find((item) => item === id);
    let newFavMovies = [...favMovies];
    if (findId) {
      newFavMovies = newFavMovies.filter((item) => item !== id);
    } else {
      newFavMovies = [...favMovies, id];
    }

    setFavMovies(newFavMovies);
    SessionStorage.setFavorite(JSON.stringify(newFavMovies));
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isLoading && <Fallback />}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cinemo Web
          </Typography>
          {!Boolean(user) && (
            <Button color="inherit" onClick={handleClickLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={menuOpen}
          onClose={handleDrawerToggle}
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Cinemo Web
            </Typography>
            <Divider />
            {Boolean(user) ? (
              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} onClick={handleClickFinder}>
                    <ListItemText primary={'Movie Finder'} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} onClick={handleClickFavoriteFilter}>
                    <ListItemText primary={'My Favorite'} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} onClick={handleClickLogout}>
                    <ListItemText primary={'Logout'} />
                  </ListItemButton>
                </ListItem>
              </List>
            ) : (
              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'Login'} onClick={handleClickLogin} />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </Box>
        </Drawer>
      </Box>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container>
          <Grid container spacing={2}>
            {movies.map((item) => (
              <Grid key={'movie' + item.id} item xs={6} md={4} lg={3}>
                <MovieCard
                  name={item.title_th}
                  image={item.poster_url}
                  category={item.genre}
                  favorite={favMovies.find((fav) => fav === item.id)}
                  onClickFav={handleClickFavorite(item.id)}
                  disabledFav={!Boolean(user)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
