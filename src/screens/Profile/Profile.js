//react components
import React from 'react';
import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import Header from '../../components/Header/Header';
//styles
import {styles} from './ProfileStyle';
import {ScreenNames} from '../../global';

//svg
import FavSvg from '../../assets/svg/heart.svg';
import DonateSvg from '../../assets/svg/donateSvg.svg';
import MovieRequestSvg from '../../assets/svg/movieseriesrequest 1.svg';
import MovieFeedbackSvg from '../../assets/svg/feedback.svg';
import ReportSvg from '../../assets/svg/flag.svg';
//redux
import {connect} from 'react-redux';

const Profile = ({navigation, userInfo}) => {
  //function : navigation function
  const navigationToMovieRequest = () => {
    navigation.navigate(ScreenNames.MOVIEREQUEST);
  };
  const navigationToFavouritePage = () => {
    navigation.navigate(ScreenNames.FAVOURITE);
  };
  const navigationToMovieFeedback = () => {
    navigation.navigate(ScreenNames.MOVIEFEEDBACK);
  };
  const navigationToMovieReport = () => {
    navigation.navigate(ScreenNames.MOVIEREPORT);
  };

  //UI
  return (
    <View style={styles.mainView}>
      <Header ShowSearchButton={true} />
      <ScrollView>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#1a1a1a',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#FFF',
            borderWidth: 1,
            marginTop: 20,
            marginBottom: 30,
            borderRadius: 30,
          }}>
          {/* <Image style={{ width: "100%", height: "100%", resizeMode: "stretch", borderRadius: 60 }} source={require("../../assets/images/Moviepur.png")} /> */}
          <Text
            style={{
              color: '#FFF',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Moviepur
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => navigationToFavouritePage()}>
            <View style={styles.listing}>
              <FavSvg />
              <Text style={styles.TextStyle}>favourite</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.listing}>
              <DonateSvg />
              <Text style={styles.TextStyle}>Donate us</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => navigationToMovieRequest()}>
            <View style={styles.listing}>
              <MovieRequestSvg />
              <Text style={styles.TextStyle}>Movie Request</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigationToMovieFeedback()}>
            <View style={styles.listing}>
              <MovieFeedbackSvg />
              <Text style={styles.TextStyle}>Feedback</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => navigationToMovieReport()}>
            <View style={styles.listing}>
              <ReportSvg />
              <Text style={styles.TextStyle}>Report</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
					onPress={()=>navigationToMovieFeedback()}
				>
					<View style={styles.listing}>
						<MovieFeedbackSvg />
						<Text style={styles.TextStyle}>Feedback</Text>
					</View>
				</TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, null)(Profile);
