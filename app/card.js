import React, { useState } from 'react';
import { StyleSheet, Text,  View, Dimensions, Image, Button, TouchableOpacity, TouchableHighlight } from 'react-native';

const Card = () => {
  const [selectedImage, setSelected] = useState(0);

  const setChoice = (s) => setSelected(selectedImage = s);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Poll Title</Text>
          <TouchableOpacity style={styles.tag} >
            <Text style={{flex: 1, margin: 5}}>#LNDSCP</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={setChoice(1)}>
          <Image style={styles.imageStyle} source={require('../assets/eifel1.jpg')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={setChoice(2)}>
          <Image style={styles.imageStyle} source={require('../assets/eifel2.jpg')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{flex: 1}}><Text>{selectedImage}</Text></View>
        <Button style={styles.buttons} title="VOTE" color="#F51007"></Button>
        <Text style={styles.dateText}>Mar 5</Text>
      </View>
    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer: { 
    width: deviceWidth - 50, 
    backgroundColor: '#aaaaaa',
    height: 325,
    borderRadius: 15,

    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,

    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10
  },
  imageStyle: {
    height: 200,
    width: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  bottomContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }, 
  buttons: {
    margin: 10,
    alignSelf: 'center',
    flex: 1
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },
  titleArea: {
    flexDirection: "row",
  },
  tag: {
    borderRadius: 20,
    backgroundColor: '#F2A50C',
    height: 30,
    margin: 5,
  },
  dateText: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    flex: 1
  }
});

export default Card;
