package com.moviepurtesrting.mainwork;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.ParsedRequestListener;
import com.bumptech.glide.Glide;
import com.moviepurtesrting.R;
import com.moviepurtesrting.enitity.Movie;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Random;
import java.util.Set;

@SuppressLint("NewApi")
public class FullDetailsActivity extends AppCompatActivity {


    private final String MOVIEPUR_URL = "https://moviepur-api.herokuapp.com/";
    private TextView movieName,movieDescription,type,releaseDate,imdv,our,tomato;
    private ImageView movieImage;
    private TableLayout movieGenres,movieLanguages,movieDownloads;
    private Context context;
    private Map<String, String> downloadLink;

    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_full_details);
        context=this;

        movieImage =  findViewById(R.id.movieImage);
        type = findViewById(R.id.type);

        movieName =  findViewById(R.id.movieName);
        releaseDate =  findViewById(R.id.releaseDate);

        imdv =  findViewById(R.id.imdv);
        our = findViewById(R.id.our);
        tomato =  findViewById(R.id.tomato);

        movieDescription =  findViewById(R.id.movieDescription);

        movieGenres =  findViewById(R.id.genres);
        movieLanguages =   findViewById(R.id.languages);
        movieDownloads =   findViewById(R.id.downloads);

        setFullDetails();
    }


    private void setFullDetails() {
        String movieId = getIntent().getStringExtra("MOVIE_ID");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        AndroidNetworking.post(MOVIEPUR_URL+"/main/get/"+movieId)
                .build()
                .getAsObject(Movie.class, new ParsedRequestListener() {
                    @Override
                    public void onResponse(Object response) {
                        Movie movie = (Movie) response;

                        Glide.with(context).load(movie.getImage_url()).centerInside().into(movieImage);
                        type.setText(movie.getType());

                        movieName.setText(movie.getName());

                        String relesedate = movie.getReleaseDate();
                        if(relesedate!=null)
                        {
                            LocalDate dt = LocalDate.parse(relesedate);
                            relesedate = formatter.format(dt);
                        }
                        releaseDate.setText("Release Date : "+relesedate);
                        movieDescription.setText(movie.getDescription());

                        imdv.setText("IMDv : "+movie.getRating().get("IMDb"));
                        our.setText("Moviepur : "+movie.getRating().get("Moviepur"));
                        tomato.setText("Rotten Tomatoes : "+movie.getRating().get("Rotten Tomatoes")+" %");

                        downloadLink = movie.getDownload_link();
                        addForGenreAndLanguage(movieGenres,movie.getGenre());
                        addForGenreAndLanguage(movieLanguages,movie.getLanguage());
                        addForDownload(movieDownloads,movie.getDownload_link());
                    }

                    @Override
                    public void onError(ANError anError) {
                        Log.i("zzz",""+anError);
                    }
                });
    }


    private void addForGenreAndLanguage(TableLayout layout, Set<String> items){
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
            button.setWidth(30);
            TableRow.LayoutParams trParams = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.WRAP_CONTENT);

            trParams.setMargins(30, 0, 0, 0);
            button.setLayoutParams(trParams);
            button.setBackgroundColor( Color.rgb(rd.nextInt(255),rd.nextInt(255),rd.nextInt(255)) );
            row.addView(button, trParams);
            i++;
        }
        layout.addView(row);
    }



    private void addForDownload(TableLayout layout, Map<String,String> map){
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
        DownloadManager dm = (DownloadManager) getSystemService(context.DOWNLOAD_SERVICE);
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        dm.enqueue(request);

    }


    public void videoPlayer(View view) {
     if(downloadLink!=null && !downloadLink.isEmpty())  {
         Intent intent =  new Intent(context, VideoController.class);
         intent.putExtra("DOWNLOADLINKS", (Serializable) downloadLink);
         context.startActivity(intent);
     }
    }

}