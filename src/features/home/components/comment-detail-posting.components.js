import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Avatar, IconButton, Card } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const CommentSection = styled.View`
  flex-direction: row;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
`;

const RightSideCommentSection = styled.View`
  flex: 1;
  padding-left: ${(props) => props.theme.space[2]};
`;

const NameAndCommentCard = styled(Card)`
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.comment};
`;

const BottomRightSideCommentSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const LikesSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[1]};
`;

export const CommentDetailPosting = ({ item, onNavigate }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const clickLike = () => {
    if (upvoted) {
      setUpvoted(false);
      setDownvoted(false);
    } else {
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const clickDislike = () => {
    if (downvoted) {
      setDownvoted(false);
      setUpvoted(false);
    } else {
      setUpvoted(false);
      setDownvoted(true);
    }
  };

  return (
    <CommentSection>
      <TouchableWithoutFeedback
        onPress={() => {
          onNavigate("ViewGuestProfile");
        }}
      >
        <Avatar.Image size={45} source={{ uri: item.avatar }} />
      </TouchableWithoutFeedback>
      <RightSideCommentSection>
        <NameAndCommentCard>
          <Text variant="comment_name">{item.name}</Text>
          <Text variant="caption">{item.comment}</Text>
        </NameAndCommentCard>
        <BottomRightSideCommentSection>
          <Text variant="date">{item.date}</Text>
          <LikesSection>
            <IconButton
              icon={upvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
              color={upvoted ? colors.brand.primary : colors.icon.secondary}
              underlayColor="transparent"
              style={{ margin: 0 }}
              size={20}
              onPress={clickLike}
            />
            <Text variant="numbers">{item.likes}</Text>
            <IconButton
              icon={downvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
              color={downvoted ? colors.brand.primary : colors.icon.secondary}
              underlayColor="transparent"
              style={{ paddingTop: 2, margin: 0 }}
              size={20}
              onPress={clickDislike}
            />
          </LikesSection>
        </BottomRightSideCommentSection>
      </RightSideCommentSection>
    </CommentSection>
  );
};
