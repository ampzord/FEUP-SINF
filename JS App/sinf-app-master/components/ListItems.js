import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';

export default class ListItems extends Component {
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          renderItem={this.props.renderItem}
        />
      </View>
    );
  }
}

ListItems.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
}