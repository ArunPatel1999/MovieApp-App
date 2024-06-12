import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
const ImageViewScreen = ({route}) => {
  const {url} = route.params;
  const images = [
    {
      url: url,
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageViewer imageUrls={images} renderIndicator={() => null} />
      </View>
    </SafeAreaView>
  );
};

export default ImageViewScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});
