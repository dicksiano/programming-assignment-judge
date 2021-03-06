import React from "react";
import Api from "../Api";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import ConfirmDialog from "../Components/ConfirmDialog";

export default class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      dialogDeleteAssignmentOpen: false,
      candidateToDelete: null
    };
  }

  getAssignmentsList = () => {
    this.setState({ loading: true });
    Api.get(`/courses/${this.props.courseId}/assignments`).then((res) => {
      this.setState({ data: res.data.data, loading: false });
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    });
  }

  handleDelete = () => {
    Api.delete(`/assignments/${this.state.candidateToDelete}`).then((res) => {  
      this.setState({ data: this.state.data.filter(o => o.id !== this.state.candidateToDelete), loading: true });
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.getAssignmentsList();
  }

  handleOpenDialogDeleteAssign = (id) => {
    this.setState({ dialogDeleteAssignmentOpen: true,  candidateToDelete: id});
  };

  handleCloseDialogDeleteAssignment = () => {
    this.setState({ dialogDeleteAssignmentOpen: false });
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
              {this.props.isProfessor &&
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => { this.props.onEdit(assignment.id); }}
                  >
                    <EditIcon />
                  </IconButton>

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
        {this.props.isProfessor &&
          <Button
            variant="raised"
            color="secondary"
            style={{ marginLeft: 20, marginBottom: 20 }}
            onClick={() => {
              this.props.showCreateAssignment();
            }}
          >
            Criar Atividade
            <AddIcon
              style={{ marginLeft: 10 }}
            />
          </Button>
        }

        <ConfirmDialog
          open={this.state.dialogDeleteAssignmentOpen}
          text="Tem certeza que deseja apagar esta atividade?"
          onConfirm={this.handleDelete}
          onClose={this.handleCloseDialogDeleteAssignment}
        />
      </div>
    );
  }
}