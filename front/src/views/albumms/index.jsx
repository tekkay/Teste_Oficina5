import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { utils } from "../../common";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  itemNumber: {
    cursor: "pointer",
    marginRight: 5,
    marginLeft: -1,
    userSelect: "none",
    position: "relative",
    float: "left",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: 1.42857143,
    textDecoration: "none",
    color: "#337ab7",
    backgroundColor: "#fff",
    borderStyle: "solid",
    border: 1,
    borderColor: "#ddd"
  }
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPage: 1,
      allPerPage: 15,
      redirect: false,
      page: ""
    };
    this.loadPosts = this.loadPosts.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  setRedirect = async page => {
    this.setState({
      redirect: true,
      page: page
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/${this.state.page}`} />;
    }
  };

  handleClick(event) {
    this.setState({ currentPage: Number(event.target.dataset.id) });
  }
  deletePost = async idPost => {
    //const user = JSON.parse(sessionStorage.getItem("user"));
    axios
      .delete(`${utils.URL_BASE_API}/post/${idPost}`, {
      })
      .then(res => {
        this.setRedirect('home');    
        this.state.posts = res.data;    
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  loadPosts = async () => {
    //const user = JSON.parse(sessionStorage.getItem("user"));
    axios
      .get(`${utils.URL_BASE_API}/posts`, {
        
      })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        alert(err.response);
      });
  };
  confirmDelete = async idPost => {
    confirmAlert({
      message: "Você quer deletar este Post?",
      buttons: [
        {
          label: "Sim",
          value: "Sim",
          onClick: async () => this.deletePost(idPost)
        },
        {
          label: "Não",
          value: "Não"
        }
      ]
    });
  };

  componentDidMount() {
    this.loadPosts();
  }

  render() {
    const { classes } = this.props;
    //logica pagination
    const indexOfLastAll = this.state.currentPage * this.state.allPerPage;
    const indexOfFirstAll = indexOfLastAll - this.state.allPerPage;
    const currentAll = this.state.posts.slice(indexOfFirstAll, indexOfLastAll);
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.posts.length / this.state.allPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={classes.itemNumber}
          key={number}
          data-id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
    const allPosts = currentAll.map(posts => {
      return [ 
        <label className={classes.labelInfo}>
            {posts.post}
        </label>,
        <div>
        <Button
        value="Ver"
        color="success"
        onClick={this.setRedirect.bind(this, `comments/${commnets.idComment}`)}
        >
          Ver
        </Button>
        <Button
          value="Editar"
          color="info"
          onClick={this.setRedirect.bind(this, `editPost/${posts.idPost}`)}
        >
          Editar
        </Button>
        <Button
          value="Excluir"
          onClick={this.confirmDelete.bind(this, bairros.idPost)}
          color="danger"
        >
          Excluir
        </Button>
        </div>
      ];
    });
 
    return (
      <div>
        {this.renderRedirect()}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Posts</h4>
              </CardHeader>
              <CardBody style={{ paddingTop: 0 }}>
                <Button
                    value="Cadastrar novo post"
                    style={{ float: "right" }}
                    color="info"
                    onClick={this.setRedirect.bind(this, "addPost")}
                    >
                    Cadastrar novo Post
                    </Button>
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "Post","",""
                  ]}
                  tableData={allPosts}
                />
              </CardBody>
              <div>
                <ul style={{ listStyle: "none", display: "flex" }}>
                  <li
                    className={classes.itemNumber}
                    key={1}
                    data-id={1}
                    onClick={this.handleClick}
                  >
                    {"<<"}
                  </li>
                  {renderPageNumbers}
                  <li
                    className={classes.itemNumber}
                    key={Math.ceil(
                      this.state.posts.length / this.state.allPerPage
                    )}
                    data-id={Math.ceil(
                      this.state.posts.length / this.state.allPerPage
                    )}
                    onClick={this.handleClick}
                  >
                    {">>"}
                  </li>
                </ul>
              </div>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
