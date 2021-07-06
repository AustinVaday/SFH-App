import React, { useState } from "react";
import styled from "styled-components/native";
import { IconButton } from "react-native-paper";
import Menu, { MenuItem } from "react-native-material-menu";

const LeftHeader = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

export const ViewPostingRightHeader = () => {
  const [menu, setMenu] = useState(null);

  const setMenuRef = (ref) => {
    setMenu(ref);
  };

  const hideMenu = () => {
    menu.hide();
  };

  const showMenu = () => {
    menu.show();
  };

  return (
    <LeftHeader>
      <Menu
        ref={setMenuRef}
        button={<IconButton icon="dots-vertical" onPress={showMenu} />}
      >
        <MenuItem onPress={hideMenu}>Report</MenuItem>
      </Menu>
    </LeftHeader>
  );
};
