import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Image } from "react-native-elements";
import { Card } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Text } from "../../../components/typography/text.components";
import { shadowTextStyle } from "../../../infrastructure/theme/colors";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

const CardContainer = styled(Card)`
  width: 100%;
  align-self: center;
`;

const BottomCard = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

const VideoContainer = styled.View`
  padding: 1px;
  width: 33.3%;
`;

const SavesList = styled(FlatList)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex-grow: 1;
`;

const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
  height: ${hp("25%")}px;
`;

export const SavesTab = ({ route, navigation }) => {
  const { uid } = route.params;
  const [userPosts, setUserPosts] = useState([]);

  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (uid === firebase.auth().currentUser.uid) {
        setUserPosts(currentUserPosts);
      } else {
        firebase
          .firestore()
          .collection("posts")
          .where("creator", "==", uid)
          .orderBy("creation", "desc")
          .get()
          .then((snapshot) => {
            let posts = snapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
            });
            setUserPosts(posts);
          });
      }
    });
  }, [uid]);

  const listEmptyComponent = () => {
    return (
      <ListEmptySection>
        <Text
          variant="list_empty_message"
          style={{
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          Save the first video
        </Text>
        <Text
          variant="list_empty_message"
          style={{
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          Favorite any video you want to save and rewatch later. Saved videos will appear here.
        </Text>
      </ListEmptySection>
    );
  };

  return (
    <SavesList
      data={userPosts}
      ListEmptyComponent={listEmptyComponent}
      renderItem={({ item }) => {
        return (
          <VideoContainer>
            <CardContainer>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{ width: "100%", height: 250 }}
                  source={{ uri: item.videoThumbnail }}
                />
              </TouchableOpacity>
              <BottomCard>
                <Text variant="trending_post_title" style={shadowTextStyle()}>
                  {item.title}
                </Text>
              </BottomCard>
            </CardContainer>
          </VideoContainer>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      listKey={(item) => item.id.toString()}
      numColumns={3}
    />
  );
};
