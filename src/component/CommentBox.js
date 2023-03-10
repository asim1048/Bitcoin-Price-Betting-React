import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import { withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import moment from "moment";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import { FaHeart } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {},
})(MuiAccordion);
const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: "auto",
    display: "inline-block",
    width: "auto !important",
    "&$expanded": {
      minHeight: "auto",
      display: "inline-block",
      width: "auto !important",
    },
  },
  content: {
    margin: "0px 0 ",
    justifyContent: "center",
    "&$expanded": {
      margin: "0px 0 ",
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: "10px 0 !important",
    },
  },
}))(MuiAccordionDetails);
const useStyles = makeStyles((theme) => ({
  UserBox: {
    display: "flex",
    marginBottom: "10px",
    // alignItems: "center",
    "& h6": {
      fontWeight: "600",
      fontSize: "14px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& small": {
      color: "#BFBFBF",
      fontSize: "12px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      },
    },
    "& p": {
      color: "#BFBFBF",
      fontSize: "14px",
      marginTop: "5px",
      fontWeight: 500,
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
    "& div": {
      width: "100%",
      backgroundColor: "transparent",
    },
    "& figure": {
      margin: "0",
      marginRight: "15px",
      height: "40px",
      width: "44px",
      borderRadius: "50%",
      overflow: "hidden",
      backgroundColor: "#101010",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        height: "30px",
        width: "30px",
        marginRight: "8px",
      },
      "& img": {
        width: "auto",
        minWidth: "100%",
        minHeight: "100%",
      },
    },
    "& .searchaddress": {
      paddingTop: "16px",
      "& .figure": {
        margin: "0",
        marginRight: "15px",
        position: "relative",
        "& .profileimage": {
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          [theme.breakpoints.down("xs")]: {
            height: "40px",
            width: "40px",
          },
          "& img": {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "50px",
          },
        },
      },
      "& button": {
        backgroundColor: "#373636",
        height: "40px",
        borderRadius: "5px",
        [theme.breakpoints.down("xs")]: {
          height: "40px",
        },
      },
    },
  },
}));

export default function ({ data, dataList, listPublicExclusiveHandler }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [replyMessage, setReplyMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = React.useState(false);

  const commentPostHandler = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    setIsSubmit(true);
    if (replyMessage !== "" && replyMessage.length < 200) {
      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.commentReplyOnPost,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            postId: dataList._id,
            message: replyMessage,
            commentId: data?._id,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmit(false);
          listPublicExclusiveHandler();
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setReplyMessage("");
        }
      } catch (error) {
        setIsSubmit(false);
        toast.error(error);
        setIsLoading(false);
      }
    }
  };

  const likesHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.likeDislikeCommentOnPost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          postId: dataList._id,
          commentId: data?._id,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [isHidePost1, setIsHidePost1] = React.useState(false);

  const [isHidePostdata, setIsHidePostData] = React.useState();
  // console.log(">>>>>>>>", dataList, data, isHidePostdata);
  // console.log(">>><<<<<<>>>>>", isHidePostdata);

  const handleDeleteFunction = (data) => {
    console.log("data>>>>", data);
    setIsHidePost1(true);
    setIsHidePostData(data);
  };
  const deleteComment = async (id) => {
    // console.log("id<<<<<", id);
    try {
      const res = await Axios({
        method: "DELETE",
        url: Apiconfigs.deleteCommentReplyOnPost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: dataList._id,
          commentId: isHidePostdata?.commentId,
          commentReplyId: isHidePostdata?._id,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        setIsHidePost1(false);

        setIsHidePost1(false);
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      setIsHidePost1(false);
    }
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }

  const deleteCommentHandler = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: Apiconfigs.commentOnPost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: dataList._id,
          commentId: data?._id,
        },
      });
      if (res.data.responseCode === 200) {
        setIsHidePost(false);

        listPublicExclusiveHandler();
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      setIsHidePost(false);
    }
  };

  return (
    <>
      {dataList && (
        <Box className={classes.UserBox}>
          <figure>
            <img
              src={
                data?.userId?.profilePic
                  ? data?.userId?.profilePic
                  : "images/user.png"
              }
            />
          </figure>

          <Box>
            <Typography variant="h6">
              {data?.userId?.userName
                ? data?.userId.userName
                : data?.userId.name
                  ? data?.userId.name
                  : ""}
            </Typography>
            <Typography variant="body2" component="small">
              {moment(data?.time).local().fromNow()}
              {data?.postType}
            </Typography>{" "}
            <br />
            <Box style={{ width: "80%" }}>
              <Typography
                variant="body2"
                style={{
                  padding: "5px 0px",
                  overflow: "hidden",
                  // maxWidth: "150px",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.message}
              </Typography>
            </Box>
            <Accordion square
              // expanded={expanded === 'panel1'} 
              onChange={handleChange("panel1")}>
              <Box mt={1}>
                <Button color="primary" size="large" onClick={likesHandler}>
                  <FaHeart
                    className={classes.socialbox}
                    style={isLike ? { color: "red" } : {}}
                  />{" "}
                  &nbsp; Like
                </Button>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Button color="primary" size="large">
                    <small>Reply</small>
                  </Button>
                </AccordionSummary>
                <>
                  {data?.userId?._id === auth.userData?._id && (
                    <Button
                      color="primary"
                      size="large"
                      onClick={() => setIsHidePost(true)}
                    >
                      <DeleteIcon className={classes.socialbox} />
                      Delete
                    </Button>
                  )}
                </>
              </Box>
              <AccordionDetails>
                <Box>
                  {data?.reply?.map((data, i) => {
                    return (
                      <Box className={classes.UserBox} key={i}>
                        <figure>
                          <img
                            src={
                              data?.userId?.profilePic
                                ? data?.userId?.profilePic
                                : "images/user.png"
                            }
                          />
                        </figure>
                        <Box>
                          <Typography variant="h6">
                            {data?.userId.userName}
                          </Typography>
                          <Typography variant="body2" component="small">
                            {moment(data?.time).local().fromNow()}

                            {data?.postType}
                          </Typography>{" "}
                          <br />
                          <Typography
                            variant="body2"
                            style={{
                              padding: "5px 0px",
                              overflow: "hidden",
                              maxWidth: "150px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {data?.message}
                          </Typography>
                          {data?.userId?._id === auth.userData?._id && (
                            <Button
                              color="primary"
                              size="large"
                              style={{ marginLeft: "20px" }}
                              onClick={() => {
                                // deleteComment(data);
                                handleDeleteFunction(data);
                              }}
                            >
                              <DeleteIcon className={classes.socialbox} />
                              Delete
                            </Button>
                          )}
                        </Box>
                      </Box>
                    );
                  })}

                  <Box className="searchaddress">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={2} sm={2}>
                        <Box className="figure">
                          <Box className="profileimage">
                            <img
                              src={
                                auth.userData?.profilePic
                                  ? auth.userData?.profilePic
                                  : "images/user.png"
                              }
                              alt="user data"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={10} sm={10}>
                        <Box className="figure">
                          <form onSubmit={(event) => commentPostHandler(event)}>
                            <Grid container spacing={1}>
                              <Grid item xs={9} sm={9}>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  name="Text Field"
                                  value={replyMessage}
                                  placeholder="Write here..."
                                  type="text"
                                  error={isSubmit && replyMessage === ""}
                                  fullWidth
                                  // multiline={true}
                                  onChange={(e) =>
                                    setReplyMessage(e.target.value)
                                  }
                                />
                                <FormHelperText error>
                                  {isSubmit && replyMessage === "" && (
                                    <Box ml={1} style={{ fontSize: "12px" }}>
                                      Comment is required
                                    </Box>
                                  )}
                                </FormHelperText>
                                <FormHelperText error>
                                  {isSubmit && replyMessage.length > 200 && (
                                    <Box ml={1} style={{ fontSize: "12px" }}>
                                      Comment should not more than 200 characters.
                                    </Box>
                                  )}
                                </FormHelperText>
                              </Grid>
                              <Grid item xs={3} sm={3} align="center">
                                <Button
                                  size="large"
                                  color="primary"
                                  type="submit"
                                  style={{ height: "40px" }}
                                  fullWidth
                                  onClick={commentPostHandler}
                                >
                                  <SendIcon style={{ color: "#E31A89" }} />
                                </Button>
                              </Grid>
                            </Grid>
                          </form>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Dialog
            open={isHidePost}
            onClose={() => setIsHidePost(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* {row.status} */}
                {`Are you sure want to  delete this comment?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                // disabled={loader2}
                onClick={deleteCommentHandler}
              >
                Yes
                {/* {loader2 && <ButtonCircularProgress />} */}
              </Button>
              <Button
                onClick={() => setIsHidePost(false)}
                variant="contained"
                color="primary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isHidePost1}
            onClose={() => setIsHidePost1(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* {row.status} */}
                {`Are you sure want to  delete this comment?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                // disabled={loader2}
                onClick={deleteComment}
              >
                Yes
                {/* {loader2 && <ButtonCircularProgress />} */}
              </Button>
              <Button
                onClick={() => setIsHidePost1(false)}
                variant="contained"
                color="primary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
}
