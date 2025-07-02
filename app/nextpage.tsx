import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';

export default function nextpage() {

    const URL = "https://reactnative.dev/movies.json";
    const [movies, setMovies] = useState();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

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

    const handleRefresh = () =>{

      setRefresh(true);
      getMovies();
      setRefresh(false);
    }

    const router = useRouter();

    useEffect(()=>{getMovies();}, [])

    const handlePress = ()=>{

      router.push('/page4');
    }

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
                refreshing = {refresh}
                onRefresh={handleRefresh}
            />
            )}

            <View>
              <TouchableOpacity onPress={handlePress} style = {styles.button}>
                <Text style = {styles.buttonText}>Next Page</Text>
              </TouchableOpacity>
            </View>
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
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});