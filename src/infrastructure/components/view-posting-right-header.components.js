import React, { useRef } from "react";
import styled from "styled-components/native";
import { IconButton, List } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

const LeftHeader = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

export const ViewPostingRightHeader = () => {
  const refRBSheet = useRef();

  return (
    <LeftHeader>
      <IconButton
        icon="dots-vertical"
        underlayColor="transparent"
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
        }}
      >
        <List.Item
          onPress={() => {}}
          style={{ padding: 0 }}
          title="Report"
          left={() => <List.Icon icon="flag" />}
        />
        <List.Item
          onPress={() => {}}
          style={{ padding: 0 }}
          title="Unfollow"
          left={() => <List.Icon icon="account-cancel" />}
        />
      </RBSheet>
    </LeftHeader>
  );
};
