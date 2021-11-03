import React, { useState } from "react";
import { KeyboardAvoidingView, FlatList, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { HeaderDetailPosting } from "../components/header-detail-posting.components";
import { CommentDetailPosting } from "../components/comment-detail-posting.components";

const CommentSection = styled.View`
  padding-bottom: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
`;

const { height } = Dimensions.get("window");

export const ViewPostingScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");

  const { post } = route.params;

  return (
    <SafeArea>
      <FlatList
        data={post}
        ListEmptyComponent={() => {
          return (
            <ListEmptySection style={{ height: height / 4 }}>
              <MCIcon
                name={"comment-text-outline"}
                size={100}
                color={colors.icon.secondary}
              />
              <Text
                variant="list_empty_message"
                style={{
                  paddingBottom: 20,
                  paddingTop: 20,
                }}
              >
                Comments Are Empty
              </Text>
            </ListEmptySection>
          );
        }}
        ListHeaderComponent={<HeaderDetailPosting post={post} />}
        renderItem={({ item }) => (
          <CommentDetailPosting item={item} onNavigate={navigation.navigate} />
        )}
        keyExtractor={(item) => item.creator.toString()}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={120}>
        <CommentSection>
          <TextInput
            mode="outlined"
            placeholder="Write a comment..."
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={{ height: 40, width: "95%", alignSelf: "center" }}
            theme={{
              roundness: 15,
              colors: {
                primary: colors.brand.primary,
                placeholder: colors.text.tertiary,
                background: colors.bg.primary,
              },
            }}
          />
        </CommentSection>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};
