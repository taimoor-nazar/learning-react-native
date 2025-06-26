import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const nextpage = () => {

    const URL = "https://reactnative.dev/movies.json";
    const [movies, setMovies] = useState();
    const [loading, setLoading] = useState(true);

    const getMovies = async () =>{

        try {
            
            const response = await fetch(URL);
            const data = await response.json();
            setMovies(data.movies);

        } catch (error) {
            
            alert(error);
        }
        finally{
            setLoading(false);
        }

    }

    useEffect(()=>{getMovies();}, [])

    return (
        <View style={styles.container}>
            {loading ? (
            <View style={styles.loader}>
                <ActivityIndicator color="blue" size="large" />
            </View>
            ) : (
            <FlatList
                data={movies}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.releaseYear}</Text>
                </View>
                )}
            />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2, // Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default nextpage