import React, { useState } from 'react';
import { AppState } from '../store';
import { useSelector } from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { fireStore, classIndex } from '../firebase/firebase';
import { Course} from '../types/type'
import { firestore } from 'firebase';

type historyProps = RouteComponentProps

const Class: React.FC<historyProps> = (props) => {
    const userData = useSelector((state:AppState) => state.userState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [classData, setCourseData] = useState<Course>({
        className: '５年３組',
        classDate: '２時間目',
        classTime: '10:00 - 10:50',
        questionName: '算数２',
        questions: [
            {
                questionNumber: 1,
                questionTitle: "つるかめ",
                questionID: "101",
                likes: 0,
            },
            {
                questionNumber: 2,
                questionTitle: "微積",
                questionID: "102",
                likes:0

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