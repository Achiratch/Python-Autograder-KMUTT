import React from "react";
import { useState, useEffect } from "react";

//Material-UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";

//Style
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} size="md" style={{ color: "grey" }} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: 0,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const columnsAdd = [
  { field: "id", headerName: "ID", width: 200, sortable: false },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    width: 300,
    sortable: false,
  },
];

export default function AddPopup() {
  //--Open Dialog-----------------------------------------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //------Fetch Data---------------------------------------------
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(
        "https://6034c968843b150017933491.mockapi.io/allMember"
      )
        .then((response) => response.json())
        .then((json) => setData(json));
    };

    fetchMembers();
  }, []);
  //-------------------------------------------------------------

  //------Search---------------------------------------------------
  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toLowerCase().indexOf(q) > -1 ||
        row.firstName.toLowerCase().indexOf(q) > -1 ||
        row.lastName.toLowerCase().indexOf(q) > -1 ||
        row.email.toLowerCase().indexOf(q) > -1
    );
  }
  //---------------------------------------------------------------
  const [q, setQ] = useState("");
  const [data, setData] = useState([]);
  const student = search(data);

  return (
    <div>
      <button className="add-member-button" onClick={handleClickOpen}>
        <span className="icon-button">
          <FontAwesomeIcon icon={faUserPlus} size="lg" />
        </span>
        Add Student
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Students
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ margin: 30 }}
          />
          <div className="flex" style={{ height: 590, width: "100%" }}>
            <DataGrid
              rows={student}
              columns={columnsAdd}
              pageSize={100}
              checkboxSelection
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
