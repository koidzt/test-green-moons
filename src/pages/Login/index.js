import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SessionStorage from '../../store/SessionStorage';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickLogin = (event) => {
    event.preventDefault();

    if (Boolean(username) && Boolean(password)) {
      const data = { username, password, favorite: [] };
      SessionStorage.setUser(JSON.stringify(data));
      navigate('/home');
    } else {
      alert('please enter username and password');
    }
  };

  return (
    <Box bgcolor={(theme) => theme.palette.grey[200]}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper>
          <Box p={5} minWidth={350}>
            <form onSubmit={handleClickLogin}>
              <Stack spacing={4}>
                <Typography variant="h4">Log in</Typography>
                <TextField label="Username" variant="outlined" value={username} onChange={handleChangeUsername} />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={handleChangePassword}
                />
                <Button variant="contained" type="submit" onClick={handleClickLogin}>
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
