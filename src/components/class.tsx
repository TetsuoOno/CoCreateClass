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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://4.bp.blogspot.com/-71vHIF5LDZw/UZNyH5JxFwI/AAAAAAAAShU/3-Fqt0ko-cE/s400/syougatsu_tsurukame.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            つるとかめが合わせて18匹います。足の本数が合計50本のとき、つるは何匹でしょう
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

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
                questionTitle: "速さ",
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
                <div className="hoge">
                    <button onClick={() => props.history.push("/question/" + d.questionID)}>
                        <p>問{d.questionID}</p> <p>{d.questionTitle}</p>
                    </button>
                </div>
                
            )}
        
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Class)