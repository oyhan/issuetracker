
import React, { useEffect, useState } from 'react';
import { MainService } from 'services/MainService';
import { Urls } from 'infrastructure/Helper/urls';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
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

const segments = () => {
    return MainService.Get(Urls.Segment.GetAll)

}


function IssueSegmentList({ data }) {
    const [selectedId, setSelectedId] = React.useState(0);

    // const [segments, setSegments] = useState([]);
    const classes = useStyles();
    // useEffect(() => {
    //     MainService.Get(Urls.Segment.GetAll).then(segs =>
    //         setSegments(segs)
    //     )


    // }, [])

    const selectSegment = useGlobal()[1].selectSegment;

    const setSegment = (id) => {

        var segment = data.filter(s => s.Id == id);


        selectSegment(segment);
        setSelectedId(id);
    }


    return (

        <List className={classes.list} component="nav" aria-label="">
            {
                data.map((s, i) =>

                    <ListItem key={i}
                        // selected={selectedId === s.Id}

                        id={s.Id} onClick={setSegment.bind(null, s.Id)} button >
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

export default WithData({ Component: IssueSegmentList, dataSource: segments });
