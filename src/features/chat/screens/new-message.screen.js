import React from "react";
import { FlatList, View } from "react-native";
import { Avatar, List, TouchableRipple } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import dataFollowing from "../../../utils/mock/dataFollowing";

const NewMessageBackground = styled.View`
  flex: 1;
  background-color: ${colors.bg.primary};
`;

const ListItem = styled(List.Item)`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[4]};
`;

export const NewMessageScreen = ({ navigation }) => {
  return (
    <NewMessageBackground>
      <FlatList
        data={dataFollowing}
        ListHeaderComponent={() => (
          <View style={{ padding: 10 }}>
            <Text variant="label" style={{color: colors.text.secondary}}>Following</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <ListItem
              onPress={() =>
                navigation.navigate("Conversation", { user: item.name })
              }
              title={<Text variant="message_name">{item.name}</Text>}
              left={() => (
                <TouchableRipple
                  onPress={() => navigation.navigate("ViewProfile")}
                >
                  <Avatar.Image size={60} source={{ uri: item.avatar }} />
                </TouchableRipple>
              )}
            />
          );
        }}
        keyExtractor={(index) => index.id}
        showsVerticalScrollIndicator={false}
      />
    </NewMessageBackground>
  );
};
