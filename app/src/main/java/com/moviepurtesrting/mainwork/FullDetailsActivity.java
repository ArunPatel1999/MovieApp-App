package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.ParsedRequestListener;
import com.bumptech.glide.Glide;
import com.moviepurtesrting.R;
import com.moviepurtesrting.enitity.Movie;

import java.util.Map;
import java.util.Random;
import java.util.Set;


public class FullDetailsActivity extends AppCompatActivity {


    private final String MOVIEPUR_URL = "https://moviepur-api.herokuapp.com/";
    private TextView movieName,movieDescription,type,releaseDate,imdv,our,tomato;
    private ImageView movieImage;
    private TableLayout movieGenres,movieLanguages,movieDownloads;

    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_full_details);


        movieImage = (ImageView) findViewById(R.id.movieImage);
        type = (TextView) findViewById(R.id.type);

        movieName = (TextView) findViewById(R.id.movieName);
        releaseDate = (TextView) findViewById(R.id.releaseDate);

        imdv = (TextView) findViewById(R.id.imdv);
        our = (TextView) findViewById(R.id.our);
        tomato = (TextView) findViewById(R.id.tomato);

        movieDescription = (TextView)  findViewById(R.id.movieDescription);

        movieGenres = (TableLayout)   findViewById(R.id.genres);
        movieLanguages = (TableLayout)  findViewById(R.id.languages);
        movieDownloads = (TableLayout)  findViewById(R.id.downloads);

        setFullDetails(this);
    }


    private void setFullDetails(Activity activity) {
        String movieId = getIntent().getStringExtra("MOVIE_ID");
        AndroidNetworking.post(MOVIEPUR_URL+"/main/get/"+movieId)
                .build()
                .getAsObject(Movie.class, new ParsedRequestListener() {
                    @Override
                    public void onResponse(Object response) {
                        Movie movie = (Movie) response;

                        Glide.with(activity).load(movie.getImage_url()).centerInside().into(movieImage);
                        type.setText(movie.getType());

                        movieName.setText(movie.getName());
                        releaseDate.setText("releaseDate : "+movie.getReleaseDate());
                        movieDescription.setText(" "+movie.getDescription());

                        imdv.setText("IMDv : "+movie.getRating().get("IMDb"));
                        our.setText("Moviepur : "+movie.getRating().get("Moviepur"));
                        tomato.setText("Rotten Tomatoes : "+movie.getRating().get("Rotten Tomatoes")+" %");

                        addForGenreAndLanguage(activity,movieGenres,movie.getGenre());
                        addForGenreAndLanguage(activity,movieLanguages,movie.getLanguage());
                        addForDownload(activity,movieDownloads,movie.getDownload_link());
                    }

                    @Override
                    public void onError(ANError anError) {
                        Log.i("zzz",""+anError);
                    }
                });
    }


    private void addForGenreAndLanguage(Context context, TableLayout layout, Set<String> items){
        TableRow row = null;
        Random rd = new Random();
        int i=0;
        for (String value : items ) {
            if(i % 3 == 0){
                if(row != null)
                    layout.addView(row);
                row = new TableRow(context);
            }
            Button button = new Button(context);
            button.setText(value);
            button.setBackgroundColor( Color.rgb(rd.nextInt(255),rd.nextInt(255),rd.nextInt(255)) );
            TableRow.LayoutParams trParams = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.WRAP_CONTENT);
            row.addView(button, trParams);
            i++;
        }
        layout.addView(row);
    }




    @SuppressLint("NewApi")
    private void addForDownload(Context context, TableLayout layout, Map<String,String> map){
        Random rd = new Random();

        map.keySet().forEach( x-> {
            TableRow  row= new TableRow(context);

            Button button = new Button(context);
            button.setText(x);

            button.setOnClickListener(v -> getDownload(map.get(x)));

            button.setBackgroundColor( Color.rgb(rd.nextInt(255),rd.nextInt(255),rd.nextInt(255)) );
            TableRow.LayoutParams trParams = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.MATCH_PARENT);
            row.addView(button, trParams);

            layout.addView(row);
        });

    }

    private void getDownload(String downloadUrl){
        Log.i("zzz",downloadUrl);

    }

}