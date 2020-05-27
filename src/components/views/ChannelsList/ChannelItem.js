import React from 'react';
import { object, func } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { NavLink } from "react-router-dom";


class ChannelItem extends React.Component {

  // handleClick = () => {
  //   this.props.onChoose(this.props.channel.name);
  // }

  render() {
    return (
      <Card>
        <NavLink to={`channels/${this.props.channel.id}`}>
        <CardActionArea>
          <CardMedia
            component="div"
            image={
              require(`public/images/${this.props.channel.image}`)
            }
            title="Contemplative Reptile"
          />

          <CardContent>
            {this.props.channel.name}
          </CardContent>

        </CardActionArea>
        </NavLink>
      </Card>
  );}
}

ChannelItem.propTypes = {
  channel: object.isRequired,
  onChoose: func.isRequired,
};

export default ChannelItem;
