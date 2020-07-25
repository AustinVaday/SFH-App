import React from "react";

import { View, TouchableOpacity } from "react-native";
import Menu, { MenuItem } from "react-native-material-menu";
import Icon from "react-native-vector-icons/FontAwesome";

export default class PostSettingButton extends React.PureComponent {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginLeft: 200 }}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
              <Icon name="ellipsis-v" size={25} color="#BABBBA"/>
            </TouchableOpacity>
          }
        >
          <MenuItem onPress={this.hideMenu}>Report</MenuItem>
          <MenuItem onPress={this.hideMenu}>Unfollow</MenuItem>
        </Menu>
      </View>
    );
  }
}
