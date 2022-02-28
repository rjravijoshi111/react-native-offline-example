import React, { createRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./styles";
import * as ImagePicker from "react-native-image-picker";
import { createPost, setLoading } from "./actions";
import { connect } from "react-redux";
/* toggle includeExtra */
const includeExtra = true;
const regNumbers = /^\d+$/;
const regWebsite =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

function CreatePostScreen(props: any) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [errortext, setErrortext] = useState("");

  const keyboardVerticalOffset = Platform.OS === "ios" ? 50 : 0;

  const categoryInputRef = createRef();
  const websiteInputRef = createRef();
  const descriptionInputRef = createRef();

  const [response, setResponse] = React.useState<any>(null);

  const actions: Action[] = [
    {
      title: "Take Image",
      type: "capture",
      options: {
        saveToPhotos: true,
        mediaType: "photo",
        includeBase64: false,
        includeExtra,
      },
    },
    {
      title: "Select Image",
      type: "library",
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: "photo",
        includeBase64: false,
        includeExtra,
      },
    },
  ];

  const removeImage = (index: number) => {
    let tempResponse = { ...response };
    let tempResponseAssets = response?.assets;
    tempResponseAssets.splice(index, 1);
    tempResponse.assets = [...tempResponseAssets];
    setResponse({ ...tempResponse });
  };

  const onButtonPress = React.useCallback((type, options) => {
    setOptionsVisible(false);
    if (type === "capture") {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  const handleSubmitPress = () => {
    setErrortext("");
    if (!title) {
      Alert.alert("Please fill Title");
      return;
    }
    if (!category) {
      Alert.alert("Please fill Category");
      return;
    }
    if (!regNumbers.test(category)) {
      Alert.alert("Category accepts only numbers");
      return;
    }
    if (!website) {
      Alert.alert("Please fill Website");
      return;
    }
    if (!regWebsite.test(website)) {
      Alert.alert("Please enter valid website link");
      return;
    }
    if (
      !response ||
      !(Object.keys(response).length > 0) ||
      !(response?.assets?.length > 0)
    ) {
      Alert.alert("Please select photo");
      return;
    }
    if (!description) {
      Alert.alert("Please fill Description");
      return;
    }
    // const fileArray = response?.assets.map((e: object) => Platform.OS == 'android' ? e.uri : e.uri.replace('file://', ''));
    const token = props.accessToken;
    var formData = new FormData();

    // Appending photo
    let photosResArr = response?.assets;
    console.log("photosResArr--?", photosResArr);
    photosResArr.map((e: any) => {
      // return {
      //   name: e.fileName,
      //   type: e.type,
      //   // uri: Platform.OS === "android" ? e.uri : e.uri.replace("file://", ""),
      //   uri: Platform.OS === "ios" ? e.uri : e.uri.replace("file://", ""),
      // };
      formData.append("media_list", {
        // name: e.fileName,
        name: "myDefault.jpg",
        type: e.type,
        // uri: Platform.OS === "android" ? e.uri : e.uri.replace("file://", ""),
        // uri: Platform.OS === "ios" ? e.uri : e.uri.replace("file://", ""),
        uri: e.uri,
      });
    });
    // console.log('imagesData-->', imagesData);

    formData.append("title", title);
    formData.append("category", category);
    formData.append("website", website);
    formData.append("description", description);
    console.log("FORMDATA: ", formData);

    // fetch("https://api.nitrx.com/api/v1/posts/", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Authorization": "Bearer " + token,
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log("Fetch Success==================");
    //     console.log(responseData);
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //   });

    props.createPost({
      data: formData,
      onSuccess: (response: any) => {
        Alert.alert("Success", response.data.message, [
          {
            title: "Ok",
            onPress: () => {
              props.navigation.navigate("HomeScreen");
            },
          },
        ]);
      },
      onError: (error: any) => {
        Alert.alert("Error", error?.message);
      },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {errortext != "" ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Modal
          style={styles.modalStyle}
          visible={optionsVisible}
          animationType="slide"
          transparent
        >
          <>
            <TouchableOpacity
              onPress={() => setOptionsVisible(false)}
              style={styles.modalInnerContainer}
            />
            <View style={styles.outerViewModal}>
              <View>
                {actions.map(({ title, type, options }, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      key={index}
                      onPress={() => onButtonPress(type, options)}
                    >
                      <Text style={styles.optionText}>{title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </>
        </Modal>
        <ScrollView>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setTitle(text)}
              placeholder="Title"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              value={title}
              onSubmitEditing={() =>
                categoryInputRef.current && categoryInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              ref={categoryInputRef}
              style={styles.inputStyle}
              onChangeText={(text) => setCategory(text)}
              placeholder="Category"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              value={category}
              onSubmitEditing={() =>
                websiteInputRef.current && websiteInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              ref={websiteInputRef}
              style={styles.inputStyle}
              onChangeText={(text) => setWebsite(text)}
              placeholder="Website"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="url"
              returnKeyType="next"
              value={website}
              onSubmitEditing={() =>
                descriptionInputRef.current &&
                descriptionInputRef?.current?.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>

          {response &&
          Object.keys(response).length > 0 &&
          response?.assets &&
          response?.assets?.length > 0 ? (
            response?.assets.map(({ uri }: any, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={styles.crossContainer}
                >
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={styles.selectedImage}
                    source={require("../../assets/images/plus.png")}
                  />
                </TouchableOpacity>
                <View key={uri} style={styles.image}>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={{ width: "100%", height: 200 }}
                    source={{ uri: uri }}
                  />
                </View>
              </View>
            ))
          ) : (
            <TouchableOpacity
              onPress={() => setOptionsVisible(true)}
              style={styles.selectMedia}
            >
              <View style={styles.plusContainer}>
                <Image
                  style={styles.plusIcon}
                  source={require("../../assets/images/plus.png")}
                />
              </View>
              <Text style={styles.selectText}>Select Media</Text>
            </TouchableOpacity>
          )}
          <View style={styles.descriptionInputWrapper}>
            <TextInput
              ref={descriptionInputRef}
              multiline={true}
              style={styles.descriptionInputStyle}
              onChangeText={(text) => setDescription(text)}
              placeholder="Description"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="done"
              value={description}
              onSubmitEditing={() => Keyboard.dismiss()}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          disabled={props.isLoading}
          activeOpacity={0.5}
          onPress={handleSubmitPress}
        >
          {!props.isLoading ? (
            <Text style={styles.buttonTextStyle}>CREATE POST</Text>
          ) : (
            <ActivityIndicator color={"#000"} />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state: any) => {
  let isLoading = state.CreatePostReducer.isLoading;
  let accessToken = state.LoginReducer.accessToken;
  return {
    isLoading,
    accessToken,
  };
};

const mapDispatchToProps = {
  createPost: createPost,
  setLoading: setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);
