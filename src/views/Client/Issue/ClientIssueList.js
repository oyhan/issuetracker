import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { MainService } from 'services/MainService';
import { Urls } from 'infrastructure/Helper/urls';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Route, Switch, Link } from "react-router-dom";
import ClientIssues from './ClientIssues';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
export default function ClientIssueList(props) {
    const classes = useStyles();
    const [segments, setSegments] = useState([]);

    React.useEffect(() => {

        MainService.GetAll(Urls.Segment.GetAll).then(segments =>
            setSegments(segments)
        )

    }, [])
    const [open, setOpen] = React.useState({});
    const handleClick = (id) => {

        setOpen({ [id]: !open[id] });
    }

    return (
        <Switch>
            <Route path={`${props.match.path}/issues/:typeId`} component={ClientIssues } />

            <List
                className={classes.root}
            >
                {/* <Route path={`${props.match.path}/issues/:typeId`} component={Issues} /> */}
                {
                    segments.map(({ Title, IssueTypes, Id }) => (
                        <React.Fragment key={Id}>
                            <ListItem button onClick={handleClick.bind(null, Id)}>
                                <ListItemIcon>
                                    {/* <InboxIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={Title} />
                                {open[Id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            {
                                IssueTypes.map(({ Title,Id :typeId } ,key) =>

                                    <Collapse in={open[Id]} timeout="auto"  key={key} unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button component={Link}
                                                to={`${props.match.path}/issues/${typeId}`}
                                                className={classes.nested}
                                            >
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary={Title} />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                )
                            }

                        </React.Fragment>
                    ))
                }
            </List>
        </Switch>

    )

}





