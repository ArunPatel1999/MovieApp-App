package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.NetworkImageView;
import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.ParsedRequestListener;
import com.bumptech.glide.Glide;
import com.moviepurtesrting.R;
import com.moviepurtesrting.enitity.Movie;

import java.net.URI;


public class FullDetailsActivity extends AppCompatActivity {


    private final String MOVIEPUR_URL = "https://moviepur-api.herokuapp.com/";
    private TextView movieName,movieDescription,movieRating,movieType,movieGenre,movieLanguage;
    private ImageView movieImage;

    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_full_details);

       movieName = (TextView) findViewById(R.id.movieName);

        movieImage = (ImageView) findViewById(R.id.movieImage);

        movieDescription = (TextView)  findViewById(R.id.movieDescription);
        movieRating = (TextView)   findViewById(R.id.movieRating);
        movieType = (TextView)  findViewById(R.id.movieType);
        movieGenre = (TextView)   findViewById(R.id.movieGenre);
        movieLanguage = (TextView)  findViewById(R.id.movieLanguage);


        setFullDetails();
    }


    private void setFullDetails() {
        String movieId = getIntent().getStringExtra("MOVIE_ID");
        AndroidNetworking.post(MOVIEPUR_URL+"/main/get/"+movieId)
                .build()
                .getAsObject(Movie.class, new ParsedRequestListener() {
                    @Override
                    public void onResponse(Object response) {
                        Log.i("zzz",""+response);
                        Movie movie = (Movie) response;
                        movieName.setText(movie.getName());
                        movieDescription.setText(" "+movie.getDescription());
                        movieRating.setText(""+movie.getRating());
                        movieType.setText(movie.getType());
                        movieGenre.setText(""+movie.getGenre());
                        movieLanguage.setText(""+movie.getLanguage());

                    }

                    @Override
                    public void onError(ANError anError) {
                        Log.i("zzz",""+anError);
                    }
                });
    }

}