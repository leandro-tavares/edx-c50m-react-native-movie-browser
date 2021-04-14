import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  AsyncStorage,
} from "react-native";

import { createStackNavigator } from "react-navigation";
import { Feather, FontAwesome } from "@expo/vector-icons";

import ItemText from "./components/ItemText";
import { styles } from "./styles";

import { movie as movieAPI, search as searchAPI } from "./mockData";

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Movies List",
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      search: "",
      notfound: false,
      page: 1,
      qtyPages: 1,
    };
  }

  sortResults = (obj, prop, asc) => {
    const sorted = obj.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    return sorted;
  };

  getMovies = (search, page) => {
    fetch(`https://www.omdbapi.com/?s=${search}&page=${page}&apikey=c2a92de0`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        const movies = result.Search;

        if (!movies) {
          this.setState({
            movies: null,
            notfound: true,
            page: 1,
          });
          return;
        }

        const qtyPages = Math.ceil(Number(result.totalResults) / 10, 0);

        const moviesSortedByYear = this.sortResults(movies, "Year", false);
        this.setState({
          movies: moviesSortedByYear,
          notfound: false,
          page: page,
          qtyPages,
        });
      });

    // /***** mockData *****/
    // const moviesSortedByYear = this.sortResults(
    //   searchAPI.Search,
    //   "Year",
    //   false
    // );
    // this.setState({
    //   movies: moviesSortedByYear,
    //   notfound: false,
    //   page: page,
    //   qtyPages: 2,
    // });
  };

  componentDidMount() {}

  render() {
    const { movies, search, notfound, page, qtyPages } = this.state;

    return (
      <View style={styles.screen}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            autoCompleteType="off"
            autoCorrect={false}
            autoFocus
            onChangeText={(val) => {
              this.setState({
                search: val.trim(),
              });
            }}
            onKeyPress={(e) => {
              this.setState({
                notfound: false,
              });
            }}
            onSubmitEditing={(val) => {
              this.getMovies(this.state.search, 1);
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.getMovies(this.state.search, 1);
            }}
          >
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>

        {movies ? (
          <View>
            <View style={styles.pagination}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  this.getMovies(search, 1);
                }}
                disabled={page === 1 ? true : false}
              >
                <Feather name="chevrons-left" style={styles.paginationText}>
                  first
                </Feather>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  this.getMovies(search, page - 1);
                }}
                disabled={page === 1 ? true : false}
              >
                <Feather name="chevron-left" style={styles.paginationText}>
                  prev
                </Feather>
              </TouchableOpacity>

              <Text style={styles.movieInfo}>
                Page: {page} / {qtyPages}
              </Text>

              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  this.getMovies(search, page + 1);
                }}
                disabled={page === qtyPages ? true : false}
              >
                <Feather name="chevron-right" style={styles.paginationText}>
                  next
                </Feather>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  this.getMovies(search, qtyPages);
                }}
                disabled={page === qtyPages ? true : false}
              >
                <Feather name="chevrons-right" style={styles.paginationText}>
                  last
                </Feather>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.list}>
              {movies.map((item) => (
                <View key={item.imdbID}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("MovieScreen", {
                        title: item.Title,
                        imdbID: item.imdbID,
                      })
                    }
                  >
                    <View style={styles.item}>
                      <Image
                        style={styles.poster}
                        source={{
                          uri: item.Poster.split("SX300.jpg").join("SX60.jpg"),
                        }}
                      />
                      <View>
                        <Text style={styles.listItemText}>{item.Title}</Text>
                        <Text style={styles.listItemText}>
                          Year: {item.Year}
                        </Text>
                        <Text style={styles.listItemText}>
                          Type: {item.Type}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : notfound ? (
          <View style={styles.itemNotFound}>
            <Text>Movies not found for this search:</Text>
            <Text style={styles.itemNotFoundText}>{search}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

class MovieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title");
    return {
      headerTitle: title,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      movie: {},
    };
  }

  getMovieDetail = (imdbID) => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=c2a92de0`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          movie: result,
        });
      });

    // /***** mockData *****/
    // this.setState({
    //   movie: movieAPI,
    // });
  };

  componentDidMount() {
    try {
      this.getMovieDetail(this.props.navigation.getParam("imdbID"));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      Poster,
      Source,
      Title,
      Year,
      Plot,
      Rated,
      Runtime,
      Released,
      Director,
      Writer,
      Actors,
      Genre,
      Production,
      Country,
      Language,
      Type,
      DVD,
      BoxOffice,
      Awards,
      Ratings,
      imdbRating,
      imdbVotes,
      imdbID,
      Website,
      Metascore,
    } = this.state.movie;

    return (
      <ScrollView style={styles.movieContainer} maximumZoomScale={1.9}>
        <View style={styles.movieDescription}>
          <View style={styles.movieDescriptionPoster}>
            <Image source={{ uri: Poster }} style={styles.moviePoster} />
            <Text style={styles.movieimdbRating}>{imdbRating}</Text>
          </View>
          <View style={styles.movieDescriptionContainer}>
            <Text style={styles.movieTitle}>{Title}</Text>
            <Text style={styles.movieDescriptionText}>({Year})</Text>
            <Text style={styles.movieDescriptionText}>{Plot}</Text>
          </View>
        </View>

        <View style={styles.movieInfoContainer}>
          <Text style={styles.movieInfo}>Rated: {Rated}</Text>
          <Text style={styles.movieInfo}>|</Text>
          <Text style={styles.movieInfo}>{Runtime}</Text>
          <Text style={styles.movieInfo}>|</Text>
          <Text style={styles.movieInfo}>Released: {Released}</Text>
        </View>

        <View style={styles.itemTextGroup}>
          <ItemText item="Director" text={Director} />
          <ItemText item="Writer" text={Writer} />
          <ItemText item="Actors" text={Actors} />
          <ItemText item="Genre" text={Genre} />
          <ItemText item="Production" text={Production} />
          <ItemText item="Country" text={Country} />
          <ItemText item="Language" text={Language} />
          <ItemText item="Type" text={Type} />
          <ItemText item="DVD" text={DVD} />
          <ItemText item="BoxOffice" text={BoxOffice} />
          {Website && Website !== "N/A" ? (
            <TouchableOpacity
              onPress={() => Linking.openURL(Website)}
              style={styles.itemTextContainer}
            >
              <Text style={styles.itemTextSection}>Website: </Text>
              <Text style={styles.itemTextDetail}>{Website} </Text>
              <Feather name="external-link" size={14} color="#ccc" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View>
          <View style={styles.movieInfoContainer}>
            <Text style={styles.movieInfo}>Awards</Text>
          </View>
          <Text style={styles.movieAwards}>
            <Feather name="award" size={20} color="yellow" /> {Awards}
          </Text>
        </View>

        {Ratings ? (
          <View style={{ marginBottom: 20 }}>
            <View style={styles.movieInfoContainer}>
              <Text style={styles.movieInfo}>Ratings</Text>
            </View>
            <View style={styles.movieRatingsContainer}>
              {Ratings.map((rating) => (
                <View key={rating.Source} style={styles.movieRating}>
                  <Text style={styles.movieRatingSource}>{rating.Source}</Text>
                  <Text style={styles.movieRatingValue}>
                    <Feather name="star" size={16} color="yellow" />{" "}
                    {rating.Value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={{ marginBottom: 100 }}>
          <View style={styles.movieInfoContainer}>
            <Text style={styles.movieInfo}>More Info</Text>
          </View>

          <View style={styles.movieRatingsContainer}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://www.imdb.com/title/${imdbID}`)
                }
                style={styles.itemTextContainer}
              >
                <Text style={styles.movieInfo}>
                  <FontAwesome name="imdb" size={18} color="yellow" /> Votes:{" "}
                  {imdbVotes}{" "}
                  <Feather name="external-link" size={14} color="#ccc" />
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.imdb.com/title/${imdbID}/criticreviews`
                  )
                }
                style={styles.itemTextContainer}
              >
                <Text style={styles.movieInfo}>
                  <Feather name="check-square" size={18} color="yellow" />{" "}
                  Metascore: {Metascore}{" "}
                  <Feather name="external-link" size={14} color="#ccc" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen,
  MovieScreen,
});

export default AppNavigator;
