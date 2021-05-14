package com.moviepurtesrting.enitity;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public class Movie {


    private int id;
    private String name, image_url;
    private String description;
    private String releaseDate;
    private String type;

    private Map<String, Float> rating = new LinkedHashMap<>(3,0.1f);

    private Map<String,String> download_link = new LinkedHashMap<>(5, 0.25f);

    private Set<String> genre = new HashSet<>(5,0.5f);

    private Set<String> language = new HashSet<>(2,0.5f);

    public Movie() { }

    public Movie(int id, String name, String image_url, String description, String releaseDate, String type, Map<String, Float> rating, Map<String, String> download_link, Set<String> genre, Set<String> language) {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
        this.description = description;
        this.releaseDate = releaseDate;
        this.type = type;
        this.rating = rating;
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

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Float> getRating() {
        return rating;
    }

    public void setRating(Map<String, Float> rating) {
        this.rating = rating;
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
