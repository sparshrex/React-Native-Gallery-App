import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const GalleryApp = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const cachedPhotos = await AsyncStorage.getItem('photos');
      
      if (cachedPhotos) {
        const parsedPhotos = JSON.parse(cachedPhotos);
        setPhotos(parsedPhotos);
      }
      
      const response = await axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s');
      
      const fetchedPhotos = response.data.photos.photo;
      
      if (JSON.stringify(photos) !== JSON.stringify(fetchedPhotos)) {
        setPhotos(fetchedPhotos);
        await AsyncStorage.setItem('photos', JSON.stringify(fetchedPhotos));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const limitTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     {loading ? (
        <Text>Loading...</Text>
      ) : (
        photos.map(photo => (
          <View key={photo.id} style={styles.photoContainer}>
            <Image source={{ uri: photo.url_s }} style={styles.photo} />
            <Text style={styles.photoTitle}>{limitTitle(photo.title)}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  photoContainer: {
    margin: 8,
    alignItems: "center",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  photoTitle: {
    marginTop: 8,
    textAlign: "center",
    maxWidth: 150,
  },
});

export default GalleryApp;
