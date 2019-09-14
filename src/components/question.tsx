import React, { useState } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import { makeStyles } from '@material-ui/core/styles';
import { fireStore, questionIndex } from '../firebase/firebase';
import { Question } from '../types/type';
import Indicator from './Indicatior';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    button: {
        margin: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const QuestionPage: React.FC = () => {
    const classes = useStyles();
    const [questionId, setQuestionId] = useState<string>('102')
    const [resultComment, setResultComment] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [question, setQuestion] = useState<Question>({ id: '-1', title: 'test', correctAnswer: '0' })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [isHelp, setIsHelp] = useState<boolean>(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }
    const [open, setOpen] = React.useState(false);

    function handleClose() {
        setOpen(false);
    }
    function handleHelp() {
        setIsHelp(true);
    }

    const getQuestions = () => {
        fireStore.collection(questionIndex).doc(questionId).get().then(doc => {
            if (doc.exists) {
                const questionData = doc.data() as Question
                console.log('Got question、', questionData.title)
                setQuestion(Object.assign({}, questionData))
                setIsLoading(false)
            } else {
                console.log('quetion not found')
            }
        }).catch(err => console.error(err))
    }
    const checkAnswer = () => {
        if (parseFloat(answer) === parseFloat(question.correctAnswer)) {
            setResultComment("正解！　次の問題も頑張ろう！")
            setIsCorrect(true);
            setOpen(true);
        } else {
            setResultComment("残念　もう一度見直してみよう！")
            setIsCorrect(false);
            setOpen(true);

        }

    };
    if (isLoading) {
        getQuestions();
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className="App">
                <Typography component="h1" variant="h5">
                    問題
                    {!isLoading ?
                        <div>
                            <p>{question.title}</p>
                        </div> :
                        <Indicator />
                    }
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
                <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => checkAnswer()}
                >
                    回答
                </Button>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"結果"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <p>{resultComment}</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            戻る
                        </Button>
                        <Button onClick={handleClose} disabled={!isCorrect} color="primary">
                            次へ進む
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button color="secondary" onClick={handleHelp} className={classes.button}>
                    ヘルプ！
                </Button>
            </div>
        </Container>
    );
}

export default QuestionPage;