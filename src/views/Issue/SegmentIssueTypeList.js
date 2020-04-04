
import React, { useEffect, useState } from 'react';
import { MainService } from 'services/MainService';
import { Urls } from 'infrastructure/Helper/urls';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useGlobal from 'store';
import { ListItemAvatar, Avatar } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import WithData from 'components/WithDataC/WithData';

const useStyles = makeStyles(theme => ({

    list: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,

    }
}
))


const getIssues = () => {


    return MainService.Get(Urls.IssueType.GetAll).then(issuetypes => {
        return issuetypes;
       

    }

    )
}

function SegmentIssueTypeList({ data }) {
    const [selectedId, setSelectedId] = React.useState(0);

    const [issueTypes, setIssueTypes] = useState([]);
    const classes = useStyles();
    const selectIssueType = useGlobal()[1].setIssueType;
    const selectSegment = useGlobal()[1].getSegment;
    // useEffect(() => {

    //     MainService.Get(Urls.IssueType.GetAll).then(issuetypes =>

    //         setIssueTypes(issuetypes.filter(i => i.SegmentId == selectSegment().Id))
    //     )


    // }, [])


    const setIssueType = (id) => {
        
        var issueType = data.filter(s => s.Id == id);
        


        selectIssueType(issueType);
        setSelectedId(id);
    }


    return (

        <List className={classes.list} component="nav" aria-label="">
            {
                data.filter(i => i.SegmentId == selectSegment().Id).map(s =>

                    <ListItem
                        // selected={selectedId === s.Id}

                        id={s.Id} onClick={setIssueType.bind(null, s.Id)} button >
                        <Radio
                            checked={selectedId === s.Id}
                        />
                        <ListItemAvatar>
                            <Avatar src={s.ImagePath} />


                        </ListItemAvatar>
                        <ListItemText primary={s.Title} />
                    </ListItem>
                )
            }


        </List>
    )
}
export default WithData({ Component: SegmentIssueTypeList, dataSource: getIssues });
