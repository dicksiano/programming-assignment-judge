import React from "react";
import Axios from "axios";

import Config from "../../../Config";

import List, { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";

import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "material-ui/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';

export default class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      dialogOpenDeleteAssign: false,
      candidateToDelete: null
    };
  }

  getAssignmentsList = () => {
    this.setState({ loading: true });
    Axios.get(Config.api + "/assignments/class/" + this.props.classId).then((res) => {
      this.setState({ data: res.data.data, loading: false });
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    });
  }

  handleDelete = () => {
    Axios.delete(Config.api + "/assignments/" + this.state.candidateToDelete).then((res) => {  
      this.setState({ data: this.state.data.filter(o => o.id !== this.state.candidateToDelete), loading: true });
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    });
  }

  componentWillMount() {
    this.getAssignmentsList();
  }

  handleOpenDialogDeleteAssign = (id) => {
    this.setState({ dialogOpenDeleteAssign: true,  candidateToDelete: id});
  };

  handleCloseDialogDeleteAssign = () => {
    this.setState({ dialogOpenDeleteAssign: false });
  };

  render() {
    return (
      <div>
        <List>
          {this.state.data && this.state.data.map((assignment) => (
            <ListItem
              key={assignment.id}
              button
              onClick={() => { this.props.onOpen(assignment); }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={assignment.title}
                secondary={assignment.description}
              />
              {this.props.selfType == "Creator" &&
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => { this.props.onEdit(assignment.id); }}
                  >
                    <EditIcon />
                  </IconButton>

                  <Dialog
                    open={this.state.dialogOpenDeleteAssign}
                    onClose={this.handleCloseDialogDeleteAssign}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja apagar esta atividade?
                      </DialogContentText>
                    </DialogContent>
                
                    <DialogActions>
                      <Button onClick={this.handleCloseDialogDeleteAssign} color="primary">
                         Não
                      </Button>
                  
                      <Button 
                        onClick={() => { this.handleDelete(); this.handleCloseDialogDeleteAssign() }}
                        color="primary" autoFocus>
                        Sim
                      </Button>
                    </DialogActions>
              
                  </Dialog>


                  <IconButton
                   aria-label="Delete"
                    onClick={() => {this.handleOpenDialogDeleteAssign(assignment.id)}}
                  >
                    <DeleteIcon />
                  </IconButton>

                  

                </ListItemSecondaryAction>
              }
            </ListItem>
          ))}
        </List>
        {this.props.selfType == "Creator" &&
          <Button
            variant="raised"
            color="secondary"
            style={{ marginLeft: 20, marginBottom: 20 }}
            onClick={() => {
              this.props.showCreateAssignment();
            }}
          >
            Adicionar
            <AddIcon
              style={{ marginLeft: 10 }}
            />
          </Button>
        }
      </div>
    );
  }
}