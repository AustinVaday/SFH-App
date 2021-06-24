import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Text,
} from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { HeaderDetailPosting } from "../components/header-detail-posting.components";
import { CommentDetailPosting } from "../components/comment-detail-posting.components";
import styled from "styled-components/native";

const CommentSection = styled.View`
  padding-bottom: ${(props) => props.theme.space[1]};
  background-color: white;
`;

export const ViewPostingScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");

  const { user } = route.params;

  return (
    <View style={styles.screen}>
      <FlatList
        data={user.numComments}
        
        ListHeaderComponent={<HeaderDetailPosting user={user} />}
        renderItem={({ item }) => (
          <CommentDetailPosting item={item} onNavigate={navigation.navigate} />
        )}
        keyExtractor={(item) => item.commentID.toString()}
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
                nderlineColor: "blue",
                placeholder: "#cecbce",
                background: "white",
              },
            }}
          />
        </CommentSection>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
