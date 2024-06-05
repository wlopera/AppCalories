/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const staticInfo = {
  name: 'William Lopera',
  uri: 'https://avatars.githubusercontent.com/u/10101138',
};

const Header = () => {
  const {canGoBack, goBack} = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hola ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Bienvenido a tu meta</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{uri: staticInfo.uri}} style={styles.profileImage} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  arrowContainer: {
    justifyContent: 'center',
    marginLeft: -12,
    paddingRight: 8,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#711111',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
