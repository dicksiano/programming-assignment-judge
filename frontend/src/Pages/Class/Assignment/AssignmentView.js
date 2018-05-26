import React from "react";
import Axios from "axios";

import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import SendIcon from "@material-ui/icons/Send";
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';

import Config from "../../../Config";

export default class AssignmentsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dialogOpenAddSubmission: false
    };
  }

  handleInputChange = (e) => {
    this.setState({code: e.target.files[0]});
  }

  handleSubmission = (form) => {
    console.log("handleSubmission", this.props.user);
    let formData = new FormData();
    formData.append('assignid', this.props.assignmentid);
    formData.append('classid', this.props.classid);
    formData.append('submission', form.code);
    formData.append('username', this.props.user.name);
    formData.append('usergid', this.props.user.gid);
    formData.append('email', this.props.user.email);

    this.setState({ loading: true });
    Axios.post(Config.api + "/submissions", formData, {
      headers: {'Content-Type': 'multipart/form-data'} 
    }).then((res) => {
      console.log("Submissao Sucedida", res);
      this.setState({loading: false});
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    }); 
  }

  handleOpenDialogAddSubmission = () => {
    this.setState({ dialogOpenAddSubmission: true });
  };

  handleCloseDialogAddSubmission = () => {
    this.setState({ dialogOpenAddSubmission: false });
  };

  render() {
    return (
      <div>
        { this.state.loading &&
          <CircularProgress style={{ float: "right", marginRight: 18, marginTop: 18 }} /> }
          {/*@italotabatinga: sending as file by now, but it should be sent as text to store on submissions-db"*/}
          
          <div style={{ textAlign: "center", margin: 10 }}>
          <Button
            variant="raised"
            style={{ marginRight: 10 }}
            onClick={this.props.onBack}
          >
            Voltar
          </Button>
          <input
            accept=".cpp, .c"
            style={{display: 'none'}}
            id="input-code-activ"
            onChange = {this.handleInputChange}
            type="file"
          />
          <label htmlFor="input-code-activ">
            <Button variant="raised"
              color="default"
              style={{ marginRight: 10 }}
              component = "span"
            // onClick={this.handleUpload}
            >
            {this.state.code ? "Troque Código" : "Escolha Código"}
            </Button>
          </label>
          
          <Button
            variant="raised"
            color="primary"
            onClick={() => { this.handleOpenDialogAddSubmission() }}
          >
            <SendIcon style={{ marginRight: 16 }} />
            Enviar
          </Button>

          <Dialog
                  open={this.state.dialogOpenAddSubmission}
                  onClose={this.handleCloseDialogAddSubmission}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Tem certeza que deseja submeter esta solução?
                    </DialogContentText>
                  </DialogContent>
                
                  <DialogActions>
                    <Button onClick={this.handleCloseDialogAddSubmission} color="primary">
                      Não
                    </Button>
                  
                    <Button 
                      onClick={() => { this.handleSubmission(this.state), this.handleCloseDialogAddSubmission() }}
                      color="primary" autoFocus>
                      Sim
                    </Button>
                  </DialogActions>
              
                </Dialog>

          </div>
      </div>
    );
  }
}