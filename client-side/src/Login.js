import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { Rule } from '@mui/icons-material';
import { Redirect } from 'react-router';




function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Chat Web Project
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

function Login() {

   
  const [cookies, setCookie, removeCookie] = useCookies();  //user details
  const [userUrl, setUserUrl]=React.useState('');           //user url after sign in
  const [signIn, setSignIn]=React.useState({                //details that the user insert
      yourName: ''
      // roomName: '',
      // password: ''
  });

  //when write the details the details saved in the signIn
  function handleChange(event){
      var n = event.target.name;
    setSignIn(prevItem=>{
        return({...prevItem, [n]: event.target.value})
    }) 
  } 
  const handleSubmit = (event) => {
    
    event.preventDefault();
  //   // const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   // console.log({
  //   //   email: data.get('email'),
  //   //   password: data.get('password'),
  //   // });
  //   console.log(signIn);
  };

  //the click function when the use click sign in
  function clickSignIn(){
    if (signIn.yourName==='') { //check if the url insert all the details
      setUserUrl("");
      alert("put your name and a room name and a password.");
    }else{
      setCookie("theUserDetails", signIn, {path:'/chat/'+signIn.yourName}) //set cookie to the user details
      setUserUrl(signIn.yourName);                    //set the url to the room name
    } 
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="yourName"
              label="Your name"
              name="yourName"
              
              autoFocus
            />
            {/* <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="roomName"
              label="Room Name"
              name="roomName"
              
            /> */}
            {/* <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              onClick={clickSignIn}
              href={"/chat/"+userUrl}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
