import {Constants} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3d3d3d',
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 0.5,
    paddingLeft: 10,
    height: 50,
  },
  input: {
    width: '80%',
    fontSize: 16,
    color: '#FFF',
  },
  noMovieErrorText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: Constants.HEIGHT / 2.9,
    fontSize: 18,
  },
});
