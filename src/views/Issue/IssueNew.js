import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IssueSegmentList from './IssueSegmentList';
import SegmentIssueTypeList from './SegmentIssueTypeList';
import IssueForm from './IssueForm';
import useGlobal from 'store';
import { useStateValue } from 'store/appState';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
      
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));



function getStepContent(step) {
    switch (step) {
        case 0:
            return <IssueSegmentList />;
        case 1:
            // return "2";
            return <SegmentIssueTypeList />;
        case 2:
            return <IssueForm />;
        default:
            return 'Unknown step';
    }
}

export default function IssueNew() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [errors, setError] = useState([]);
    const [{resource}] = useStateValue();
    console.log('useStateValue(): ', useStateValue());
    console.log('resource: ', resource);
    
    const steps = getSteps();
    

    function getSteps() {
        return [resource.IssueNew.SelectSegment, resource.IssueNew.SelectIssueType, resource.IssueNew.FillRequired];
    }

    const [globalState, actions] = useGlobal();
    const handleNext = () => {
        if (activeStep === 0 && !globalState.segment) {
            setError([...errors, { step: 0, message: resource.ChooseOne }]);
            return;
        }
        if (activeStep === 1 && !globalState.issueType) {
            setError([...errors, { step: 1, message: resource.ChooseOne }]);
            return;
        }
        setError([]);
        //اخرین مرحله
        if (activeStep == steps.length - 1) {
            
            var form = document.getElementById('issueForm');
            console.log('form.reportValidity(): ', form.reportValidity());
            if(form.reportValidity()){
                
                actions.submitIssue();

            }else
            return;

            // setActiveStep(prevActiveStep => prevActiveStep + 1);

        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const getLabelProps = (index) => {
        const [error] = errors.filter(e => e.step == index);
        if (error == undefined) return null;
        return {
            optional: <Typography variant="caption" color="error">
                {error.message}
            </Typography>,
            error: true
        }
    }
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel {...getLabelProps(index)}>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        قبلی
                  </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'ثبت' : 'بعدی'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography variant='caption' color='primary'>درخواست شما با موفقیت ثبت شد</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        درخواست جدید
          </Button>
                </Paper>
            )}
        </div>
    );
}
