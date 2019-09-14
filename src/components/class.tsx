import React from 'react';
import { AppState } from '../store';
import { useSelector } from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { fireStore, classIndex } from '../firebase/firebase';
import { Course} from '../types/type'

type historyProps = RouteComponentProps

const Class: React.FC<historyProps> = (props) => {
    const userData = useSelector((state:AppState) => state.userState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const classData: Course = {
    //     className: '５年３組',
    //     classDate: '２時間目',
    //     classTime: '10:00 - 10:50',
    //     questionName: '算数２',
    //     questions: [
    //         {
    //             questionNumber: 1,
    //             questionTitle: "つるかめ",
    //             questionID: "101"
    //         },
    //         {
    //             questionNumber: 2,
    //             questionTitle: "微積",
    //             questionID: "102"
    //         }
    //     ]

    // }

    

    if(userData.userName === ''){
        console.log('user is not logged in')
        props.history.push('/login')
    }
    return (
        <div>
            <button onClick={() => fire()}></button>
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