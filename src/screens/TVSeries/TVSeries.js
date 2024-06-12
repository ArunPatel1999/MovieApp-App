//import : react components
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
//import : custom components
import Header from '../../components/Header/Header';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
//service
import * as service from './TVSeriesService';
import {Server} from '../../global';

const TVSeries = () => {
  //hook : states
  const [recommondationSeries, setRecommondationSeries] = useState([]);
  const [mostLikeSeries, setMostLikeSeries] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  //function : service function
  const getAllRecommandations = async () => {
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
        type: 'WEB_SERIES',
      };
      const {response, status} = await Server.getAPI(
        Server.recommandation,
        paramsData,
      );
      if (status) {
        setRecommondationSeries(response.data);
      }
    } catch (error) {
      console.error('error in getAllRecommandations', error);
    }
  };
  const getAllMostLikes = async () => {
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
        type: 'WEB_SERIES',
      };
      const {response, status} = await Server.getAPI(
        Server.most_like,
        paramsData,
      );
      if (status) {
        setMostLikeSeries(response.data);
      }
    } catch (error) {
      console.error('error in getAllRecommandations', error);
    }
  };
  const getAllSeries = async () => {
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
        type: 'WEB_SERIES',
      };
      const {response, status} = await Server.getAPI(
        Server.find_all,
        paramsData,
      );
      if (status) {
        setAllSeries(response.data);
      }
    } catch (error) {
      console.error('error in getAllRecommandations', error);
    }
  };
  //function : render function
  const mostLikedSeriesRender = ({item}) => (
    <SeriesCard key={item.id} imageUrl={item.image} item={item} />
  );
  //useEffect
  useEffect(() => {
    getAllRecommandations();
    getAllMostLikes();
    getAllSeries();
  }, []);

  //UI
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Header ShowSearchButton={true} />
      <ScrollView>
        <View>
          <Text style={styles.TextStyle}>Recommandation Series</Text>
          {recommondationSeries.length > 0 ? (
            <FlatList
              horizontal={true}
              data={recommondationSeries}
              renderItem={mostLikedSeriesRender}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.ActivityIndicatorView}>
              <ActivityIndicator size="small" color="#00ff00" />
            </View>
          )}
        </View>
        <View>
          <Text style={styles.TextStyle}>Most Likes Series</Text>
          {mostLikeSeries.length > 0 ? (
            <FlatList
              horizontal={true}
              data={mostLikeSeries}
              renderItem={mostLikedSeriesRender}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.ActivityIndicatorView}>
              <ActivityIndicator size="small" color="#00ff00" />
            </View>
          )}
        </View>
        <View>
          <Text style={styles.TextStyle}>All Series</Text>
          {allSeries.length > 0 ? (
            <FlatList
              horizontal={true}
              data={allSeries}
              renderItem={mostLikedSeriesRender}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.ActivityIndicatorView}>
              <ActivityIndicator size="small" color="#00ff00" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TVSeries;

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 14,
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
