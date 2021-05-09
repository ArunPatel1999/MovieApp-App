package com.moviepurtesrting.enitity;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public class Movie {


    private int id;
    private String name, image_url, description;
    private float rating;
    private boolean movieOrNot;

    private Map<String,String> download_link = new LinkedHashMap<String, String>(5, 0.25f);

    private Set<String> genre = new HashSet<String>(5,0.5f);

    private Set<String> language = new HashSet<String>(2,0.5f);


    public Movie(){}

    public Movie(int id, String name, String image_url, String description, float rating, boolean movieOrNot, Map<String, String> download_link, Set<String> genre, Set<String> language) {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
        this.description = description;
        this.rating = rating;
        this.movieOrNot = movieOrNot;
        this.download_link = download_link;
        this.genre = genre;
        this.language = language;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public boolean isMovieOrNot() {
        return movieOrNot;
    }

    public void setMovieOrNot(boolean movieOrNot) {
        this.movieOrNot = movieOrNot;
    }

    public Map<String, String> getDownload_link() {
        return download_link;
    }

    public void setDownload_link(Map<String, String> download_link) {
        this.download_link = download_link;
    }

    public Set<String> getGenre() {
        return genre;
    }

    public void setGenre(Set<String> genre) {
        this.genre = genre;
    }

    public Set<String> getLanguage() {
        return language;
    }

    public void setLanguage(Set<String> language) {
        this.language = language;
    }
}
