import React, { PureComponent } from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
// import FastImage from 'react-native-fast-image';

export default class Attachments extends PureComponent {
  _renderItem = ({ item }) => {
    if (item.shouldDelete) {
      return null;
    }

    if (item.type === -1) {
      return (
        <TouchableOpacity
          onPress={this.props.onAddAttachment}
          style={{
            marginHorizontal: 5,
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#F3F3F3',
          }}
        >
          <Icon type="MaterialIcons" name="add-a-photo" style={{ color: '#FFF', fontSize: 64 }} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => this.props.onSelectAttachment(item)}
        style={{
          marginHorizontal: 5,
          width: 150,
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          backgroundColor: '#F3F3F3',
        }}
      >
        <Image
          source={item.isLocal ? { uri: item.sizes.small.uri } : { uri: item.sizes.small.url }}
          style={{ width: 150, height: 150, borderRadius: 5 }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { attachments } = this.props;

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 15 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={[{ type: -1, key: 'add-photo' }, ...attachments]}
        renderItem={this._renderItem}
      />
    );
  }
}
