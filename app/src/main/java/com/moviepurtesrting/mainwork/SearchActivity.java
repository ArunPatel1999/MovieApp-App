package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.moviepurtesrting.R;
import com.moviepurtesrting.enitity.MovieLite;

import java.util.List;

public class SearchActivity extends AppCompatActivity {

    EditText sercheMoviename;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
    }

    public void serche(View view)
    {
        getMovieByName();
    }

    private void getMovieByName()
    {
        sercheMoviename = findViewById(R.id.search_movie_name);

        List<MovieLite> movieLiteList;

        
    }
}