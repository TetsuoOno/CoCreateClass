import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { fireStore, questionIndex } from '../firebase/firebase';
import { Question } from '../types/type';
import Indicator from './Indicatior';

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
    const [answer, setAnswer] = useState<string>('')
    const [question, setQuestion] = useState<Question>({ id: '-1', title: 'test', correctAnswer: 0 })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }

    const getQuestions = () => {
        fireStore.collection(questionIndex).doc(questionId).get().then(doc => {
            if (doc.exists) {
                const questionData = doc.data() as Question
                console.log('Got question、', questionData.title)
                setQuestion(Object.assign({}, questionData))
                setIsLoading(false)
            } else {
                const questionData: Question = {
                    id: questionId,
                    title: "朝は４本足、昼は２本足、夜は３本足の２次関数での近似値を答えよ",
                    correctAnswer: 0
                }
                fireStore.collection(questionIndex).doc(questionData.id).set(questionData).catch(e => console.error(e))
                console.log('quetion not found')
            }
        }).catch(err => console.error(err))
    }
    const checkAnswer = () => {
        if (parseFloat(answer) === question.correctAnswer) {
            console.log("正解！")
        } else {
            console.log("間違い")
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
                <Button color="secondary" className={classes.button}>
                    ヘルプ！
                </Button>
            </div>
        </Container>
    );
}

export default QuestionPage;