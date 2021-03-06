import React, {useState}from 'react';
import {useSelector, useDispatch} from 'react-redux'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth, fireStore, userIndex } from '../firebase/firebase';
import { User } from '../types/type';
import { loginCreator } from '../actions/action';
import { AppState } from '../store';
import { RouteComponentProps, withRouter } from 'react-router';

type historyProps = RouteComponentProps
const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  
const Login: React.FC<historyProps> = props => {
    const classes = useStyles();
    let userData = useSelector((state:AppState) => state.userState)
    console.log(userData)
    const dispatch = useDispatch()
    const login = (data:User) => dispatch(loginCreator(data))
    const [name, setName] = useState<string>('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        setName(e.target.value)
    }
    const LoginWithFirebase = () => {
        auth.signInAnonymously().then(e => {
            const user = e.user as firebase.User
            fireStore.collection(userIndex).doc(user.uid).get().then(doc => {
                if(doc.exists){
                    const userData = doc.data() as User
                    console.log('こんにちは、', userData.userName)
                    login(userData)
                }else{
                    const userData : User = {
                        userID: user.uid,
                        userName: name,
                    }
                    fireStore.collection('users').doc(user.uid).set(userData).then(() => console.log('こんにちは、', userData.userName)
                    ).catch(e => console.error(e))
                    login(userData)
                }
                props.history.push('/class')
            })
        }).catch(err=>console.error(err))
    }

    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="おなまえ"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={e => {
                const data = e as React.ChangeEvent<HTMLInputElement>;
                handleChange(data)
            }}
          />
         
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => LoginWithFirebase()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Login)