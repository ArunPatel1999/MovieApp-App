//import : react components
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
//import : custom components
import MyText from 'components/MyText/MyText';
import EpisodesLoader from 'components/CustomLoader/EpisodesLoader';
//import : utils
import {Colors, MyIcon, Server} from 'global/index';
//import : styles
import {styles} from './EpisodesModalStyle';
//import : redux
import {connect} from 'react-redux';

const EpisodesModal = ({
  visible,
  setVisibility,
  accessId,
  SeriesId,
  TotalSeasons,
}) => {
  //hook : states
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  //hook : modal states
  const [epLoader, setEpLoader] = useState(false);
  //function : modal function
  const getAllEpisodes = async seasonNumber => {
    setEpLoader(true);
    try {
      const paramsData = {
        userId: accessId,
      };
      const endPoint = `${Server.movie_detail}${SeriesId}/season/${seasonNumber}`;
      const {response, status} = await Server.getAPI(endPoint, paramsData);
      if (status) {
        setEpisodes(response);
      }
    } catch (error) {
      console.log('error in getAllEpisodes', error);
    }
    setEpLoader(false);
  };
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      onShow={() => getAllEpisodes(selectedSeason)}
      animationType="fade"
      transparent>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View style={styles.mainView}>
          <MyText
            text={'SEASONS'}
            marginVertical={10}
            fontSize={16}
            fontWeight="bold"
          />
          <View>
            <FlatList
              data={TotalSeasons}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      getAllEpisodes(item);
                      setSelectedSeason(item);
                    }}
                    style={{
                      marginRight: 10,
                      borderRadius: 10,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        selectedSeason == item
                          ? Colors.THEME_GREEN
                          : Colors.WHITE,
                      paddingHorizontal: 10,
                    }}>
                    <MyText
                      text={`Season ${item}`}
                      textColor={
                        selectedSeason == item ? Colors.WHITE : Colors.BLACK
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <MyText
            text={'EPISODES'}
            marginVertical={10}
            fontSize={16}
            fontWeight="bold"
          />
          {epLoader ? (
            <Eploader />
          ) : (
            <FlatList
              data={episodes}
              renderItem={EpRenderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  accessId: state.user.accessId,
});
export default connect(mapStateToProps, null)(React.memo(EpisodesModal));

const Eploader = () => {
  return <EpisodesLoader />;
};

const EpRenderItem = ({item, index}) => {
  console.log(item);
  return (
    <View
      key={item.partId}
      style={{
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: Colors.DARK_JUNGLE_GREEN,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              width: '100%',
              height: 100,
              borderColor: '#FFF',
              borderWidth: 0.2,
              borderRadius: 100,
            }}
          />
          <MyIcon.AntDesign
            name="play"
            size={24}
            style={{position: 'absolute'}}
            color={Colors.WHITE}
          />
        </TouchableOpacity>

        <View
          style={{
            width: '65%',
            marginLeft: 10,
          }}>
          <MyText text={item.name} fontSize={16} fontWeight="bold" />
          <MyText
            text={`Part : ${item.number}`}
            fontSize={16}
            fontWeight="bold"
          />
          <MyText text={item.description} />
        </View>
      </View>
    </View>
  );
};
