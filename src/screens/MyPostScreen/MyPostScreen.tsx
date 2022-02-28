import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Text
} from 'react-native';
import styles from './styles';
import { myPost, setLoading } from './actions';
import { connect } from 'react-redux';
import { getMyPost } from '../../services/api-end-points';
import MyPostComponent from '../../components/MyPostComponent/MyPostComponent';

function MyPostScreen(props: any) {
  let [currentCount, setCurrentCount] = useState(1);

  const getMyPostData = () => {
    const token = props.accessToken;
    console.log("ON getMyPostData: ", currentCount);
    props.myPost({
      currentPage: currentCount,
      token,
      onSuccess: () => {
        let nextCount = currentCount + 1;
        setCurrentCount(nextCount);
      },
      onError: () => { },
    });
  };


  // My Posts API CALL
  useEffect(() => {
    getMyPostData();
  }, []);


  // Pagination
  const loadMoreData = () => {
    if (props.next) {
      getMyPostData();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {props.isLoading && <View style={styles.loadingIndicator}>
        <ActivityIndicator
          size={'large'}
          color='white'
          animating={props.isLoading}
        />
      </View>}
      <FlatList
        style={styles.listStyle}
        data={props.listData}
        renderItem={(item) => <MyPostComponent item={item?.item} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0}
        keyExtractor={item => item.id}
        ListEmptyComponent={() =>
          <View style={styles.emptyContainer}>
            <Text style={styles.noData}>NO DATA</Text>
          </View>}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state: any) => {
  let isLoading = state.MyPostReducer.isLoading;
  let data = state.MyPostReducer.data;
  let count = state.MyPostReducer.count;
  let next = state.MyPostReducer.next;
  let previous = state.MyPostReducer.previous;
  let listData = state.MyPostReducer.listData;
  let accessToken = state.LoginReducer.accessToken;
  return {
    isLoading,
    accessToken,
    data,
    next,
    previous,
    count,
    listData
  };
};

const mapDispatchToProps = {
  myPost: myPost,
  setLoading: setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostScreen);
