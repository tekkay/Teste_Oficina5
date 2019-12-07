import React from "react";

import axios from "axios";
import moment from "moment";
import { utils } from "../../common";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import users from ".";

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
  labelInfo: {
    fontSize: 16
  },
  divQRCode: {
    marginTop: 60,
    textAlign: "center"
  }
};

class viewUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      albums: ""
    };
    this.newTab = this.newTab.bind(this);
  }

  loadUsers = async () => {
    try {
      const resPost = await axios.get(
        `${utils.server}/users/${this.props.match.params.id}`
      );
      const resType = await axios.get(
        `${utils.server}/albums/${resPost.data.idPost}`
      );

      this.setState({ post: resUsers.data, albums: resType.data });
    } catch (err) {
      utils.showError(err);
    }
  };

  componentDidMount() {
    this.loadUsers();
    this.loadAlbums();
  }

  render() {
    const { classes } = this.props;

    const users = this.state.users;

    const albums = this.state.albums.map(albums => {
      return `${albums.description} `;
    });

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Users</h4>
              </CardHeader>
              <form onSubmit={this.edit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <h4>
                        Usuários:{" "}
                        <label className={classes.labelInfo}>{users}</label>
                      </h4>
                      <h4>
                        Albums:{" "}
                        <label className={classes.labelInfo}>
                          {String(albums)}
                        </label>
                      </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} />
                  </GridContainer>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(viewUsers);
