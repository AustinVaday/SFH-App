import React from "react";
import {
  FlatList,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, List } from "react-native-paper";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
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

const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
`;

const { height } = Dimensions.get("window");

export const NewMessageScreen = ({ navigation }) => {
  return (
    <NewMessageBackground>
      <FlatList
        data={dataFollowing}
        ListEmptyComponent={() => {
          return (
            <ListEmptySection style={{ height: height / 2 }}>
              <MCIcon
                name={"account-group"}
                size={100}
                color={colors.icon.secondary}
              />
              <Text
                variant="list_empty_title"
                style={{
                  paddingBottom: 20,
                  paddingTop: 20,
                }}
              >
                No Following
              </Text>
              <Text variant="list_empty_message">
                When you follow people, you will see them here
              </Text>
            </ListEmptySection>
          );
        }}
        ListHeaderComponent={() => (
          <View style={{ padding: 10 }}>
            <Text variant="label" style={{ color: colors.text.secondary }}>
              Following
            </Text>
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
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("ViewProfile")}
                >
                  <Avatar.Image size={60} source={{ uri: item.avatar }} />
                </TouchableWithoutFeedback>
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
