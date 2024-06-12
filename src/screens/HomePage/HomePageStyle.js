import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainView: {
    padding: 20,
  },
  TextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  titleStyleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
  },
  specialSectionView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c465c',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  specialSectionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
