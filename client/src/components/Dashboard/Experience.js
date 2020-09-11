import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Container, Grid, Typography} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
});

class Experience extends Component {
    render() {
        const {user} = this.props.user;
        const {jobs} = this.props.jobs;
        const {subs} = this.props.subs;
        return (
            <Fragment>
                <Helmet>
                <title>Microhard &middot; Experience </title>
                </Helmet>
                <div className={classes.root}>
                <div className={classes.heroImage}>
                    <Grid container justify="center" alignItems="flex-end">
                        <img src={heroImage} className={classes.image} alt="heroImg" />
                    </Grid>
                </div>
                <div className={classes.body}>
                    <FixedSizeList height={400} width={300} itemSize={46} itemCount={10}
                        subheader={
                            <ListSubheader>
                                Current Subject
                            </ListSubheader>
                        }
                    >
                        {subs.map((item) => (
                            <ListItem button onClick={handleClick}>
                                <ListItemText primary={`${item}`} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary='${item}.discription'/>
                                    </ListItem>
                                </List>
                          </Collapse>
                        ))}
                    </FixedSizeList>
                    <FixedSizeList height={400} width={300} itemSize={46} itemCount={10}
                        subheader={
                            <ListSubheader>
                                Current Jobs
                            </ListSubheader>
                        }
                    >
                        {jobs.map((item) => (
                            <ListItem button onClick={handleClick}>
                                <ListItemText primary={`${item}`} />
                            </ListItem>
                        ))}
                    </FixedSizeList>
                </div>    
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(Experience));