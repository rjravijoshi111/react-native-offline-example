import React from "react";
import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { styles } from "./styles";
import { getImageBaseURL } from "../../services/api-end-points";
const MyPostComponent = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FastImage
          style={styles.avatar}
          source={{
            uri: getImageBaseURL() + item.creator_details.avatar,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.titleInner}>
          <Text numberOfLines={4} style={styles.title}>
            {"Title: " + item?.title}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{"Category: " + item?.category}</Text>
      <Text style={styles.link}>{"Website: " + item?.website}</Text>
      <Text style={styles.title}>{"Description: " + item?.description}</Text>
      <View>
        <Text style={styles.title}>{"Media"}</Text>
        <View style={{ flexDirection: "row" }}>
          {item?.materials && item?.materials?.map((imageData: any, index: number) => {
            return (
              <View key={index}>
                <FastImage
                  style={styles.avatar}
                  source={{
                    uri: getImageBaseURL() + imageData.media_file,
                    headers: { Authorization: "someAuthToken" },
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default MyPostComponent;
