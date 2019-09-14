import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { auth, fireStore, questionIndex } from '../firebase/firebase';
import { Question } from '../types/type';

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


const QuestionPage: React.FC = () => {
    const classes = useStyles();
    const [answer, setAnswer] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }
    const getQuestions = () => {
        fireStore.collection(questionIndex).doc("101").get().then(doc => {
            if (doc.exists) {
                const questionData = doc.data() as Question
                console.log('Got question、', questionData.title)
            } else {
                const questionData: Question = {
                    id: "101",
                    title: "test",
                }
                fireStore.collection(questionIndex).doc(questionData.id).set(questionData).catch(e => console.error(e))

                console.log('quetion not found')
            }
        }).catch(err => console.error(err))
    };
    getQuestions();
    return (
        <Container component="main" maxWidth="xs">

            <div className="App">
                <header className="App-header">
                    <p>
                        TBD: show question and some buttons
                </p>
                </header>
                <Typography component="h1" variant="h5">
                    Sign in
            </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="answer"
                        label="回答"
                        name="answer"
                        autoFocus
                        value={answer}
                        onChange={e => {
                            const data = e as React.ChangeEvent<HTMLInputElement>;
                            handleChange(data)
                        }}
                    />
                </form>
            </div>
        </Container>
    );
}

export default QuestionPage;