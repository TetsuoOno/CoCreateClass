import React, { useState } from 'react';
import { AppState } from '../store';
import { useSelector } from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { fireStore, classIndex } from '../firebase/firebase';
import { Course} from '../types/type'
import { firestore } from 'firebase';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

type historyProps = RouteComponentProps



const Class: React.FC<historyProps> = (props) => {
    const userData = useSelector((state:AppState) => state.userState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [classData, setCourseData] = useState<Course>({
        className: '５年３組',
        classDate: '２時間目',
        classTime: '10:00 - 10:50',
        questionName: '算数２',
        studentNumber: 0,
        questions: [
            {
                questionNumber: 1,
                questionTitle: "つるかめ",
                questionID: "101",
                collectAnswers: 0                
            },
            {
                questionNumber: 2,
                questionTitle: "時速",
                questionID: "102",
                collectAnswers: 0                

            }
        ]

    });
    if(isLoading){
        fireStore.collection(classIndex).doc('XrjO3ql2IKYWHAQmHh5i').get().then(doc => {
            const classData = doc.data() as Course
            setCourseData(classData);
            setIsLoading(true)
        })
    }

    if(userData.userName === ''){
        console.log('user is not logged in')
        props.history.push('/login')
    }
    return (
        <div>
            <h1>{classData.className}</h1>
            <h2>{classData.classDate}</h2>
            <h3>{classData.classTime}</h3>
            <h2>{classData.questionName}</h2>
            {classData.questions.map(d => 
                <button onClick={() => props.history.push("/question/" + d.questionID)}>
                    <p>問{d.questionID}</p> <p>{d.questionTitle}</p>
                </button>
            )}
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Class)