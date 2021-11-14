import React, { useState } from "react";
import { Avatar, Icon } from "react-native-elements"
import { View } from "react-native"

import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { timeDifference } from "../../../components/utilities/time-difference.components";
import { useUser } from "../../../services/hooks/useUser";

import {
  CommentSection,
  RightSideCommentSection,
  NameAndCommentCard,
  BottomRightSideCommentSection,
  LikesSection,
} from "../styles/comment-card.styles";

export const CommentCard = ({ item }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const user = useUser(item.creator).data;

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

  if (user === undefined) {
    return <View />;
  }

  return (
    <CommentSection>
        <Avatar rounded size="small" source={{ uri: user.profilePhoto }} onPress={() => console.log("avatar clicked")} />
      <RightSideCommentSection>
        <NameAndCommentCard>
          <Text variant="comment_name">{user.username}</Text>
          <Text variant="comment">{item.text}</Text>
        </NameAndCommentCard>
        <BottomRightSideCommentSection>
          <Text variant="comment_date">{item.creation === null
            ? "now"
            : timeDifference(new Date(), item.creation.toDate())}</Text>
          <LikesSection>
            <Icon
              name={upvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
              type="material-community"
              color={upvoted ? colors.brand.primary : colors.icon.secondary}
              underlayColor="transparent"
              style={{ padding: 5 }}
              size={20}
              onPress={clickLike}
            />
            <Text variant="comment_votes">{}</Text>
            <Icon
              name={downvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
              type="material-community"
              color={downvoted ? colors.brand.primary : colors.icon.secondary}
              underlayColor="transparent"
              style={{ paddingTop: 7, padding: 5 }}
              size={20}
              onPress={clickDislike}
            />
          </LikesSection>
        </BottomRightSideCommentSection>
      </RightSideCommentSection>
    </CommentSection>
  );
};
