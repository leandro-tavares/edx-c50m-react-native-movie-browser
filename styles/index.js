import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-start",
  },
  title: {
    textAlign: "center",
    fontFamily: "Verdana",
    fontSize: 20,
  },
  list: {
    padding: 20,
    marginBottom: 30,
    borderRadius: 10,
    height: "80%",
  },
  item: {
    padding: 10,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    // borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 10,
  },

  listItem: {
    backgroundColor: "#ccc",
    borderRadius: 10,
  },

  listItemText: {
    color: "#fff",
  },

  itemNotFound: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  itemNotFoundText: {
    fontWeight: "bold",
    color: "blue",
    marginTop: 10,
  },

  poster: {
    width: 40,
    height: 60,
    marginRight: 10,
  },

  search: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 20,
    paddingRight: 20,
    color: "#ccc",
    // backgroundColor: "#333",
  },

  paginationButton: {
    // backgroundColor: "#666",
    padding: 10,
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "#333",
    borderRadius: 10,
    minWidth: 60,
    alignSelf: "center",
    margin: 5,
  },

  paginationText: {
    color: "#ccc",
  },

  searchInput: {
    // borderColor: "#666",
    // borderStyle: "solid",
    // borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  searchButton: {
    height: 35,
    width: 45,
    padding: 10,
    color: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "#666",
    borderRadius: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },

  movieContainer: { flex: 1, backgroundColor: "#000" },

  movieDescription: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 10,
    marginTop: 10,
  },

  movieDescriptionPoster: { width: "60%" },
  movieDescriptionContainer: { width: "40%", position: "relative" },
  movieDescriptionText: { color: "#fff", marginBottom: 20, fontSize: 16 },
  movieimdbRating: {
    position: "absolute",
    zIndex: 100,
    right: 11,
    top: 0,
    backgroundColor: "green",
    color: "#fff",
    width: 40,
    height: 40,
    fontSize: 14,
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
  },

  moviePoster: {
    width: 225,
    height: 350,
  },

  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
  },

  movieInfoContainer: {
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderTopColor: "#333",
    borderTopWidth: 1,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },

  movieInfo: {
    color: "#aaa",
    marginLeft: 10,
    marginRight: 10,
  },

  movieAwards: {
    color: "#fff",
    alignSelf: "center",
    marginBottom: 20,
  },

  movieRatingsContainer: {
    flexDirection: "row",
    // alignItems: "stretch",
    justifyContent: "space-between",
    marginTop: 0,
  },

  movieRating: {
    // margin: 5,
    // padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: "30%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#111",
  },

  movieRatingSource: {
    color: "#ccc",
    marginBottom: 5,
    fontSize: 11,
    alignSelf: "center",
  },

  movieRatingValue: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center",
    justifyContent: "center",
  },

  itemTextGroup: {
    marginTop: 10,
    marginBottom: 20,
  },

  itemTextContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    marginBottom: 4,
    // flex: 1,
    // flexWrap: "wrap",
  },

  itemTextSection: {
    fontWeight: "bold",
    color: "#aaa",
    fontSize: 15,
  },

  itemTextDetail: {
    color: "#fff",
  },
});
