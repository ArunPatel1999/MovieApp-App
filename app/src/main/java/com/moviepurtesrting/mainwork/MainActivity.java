package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.ParsedRequestListener;
import com.moviepurtesrting.R;
import com.moviepurtesrting.adapters.RequestAdapter;
import com.moviepurtesrting.enitity.MovieLite;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class MainActivity extends AppCompatActivity {

    private List<MovieLite> movieLiteList;
    private RequestAdapter requestAdapter;
    private final String MOVIEPUR_URL = "https://moviepur-api.herokuapp.com/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        movieLiteList = new ArrayList<>();

        Toolbar toolBar=findViewById(R.id.toolbar);
        toolBar.setOnMenuItemClickListener(item -> {
            if(item.getItemId() == R.id.search_button)
                    startActivity(new Intent(MainActivity.this, SearchActivity.class));
            return false;
        });

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this,RecyclerView.VERTICAL,false);
        recyclerView.setLayoutManager(layoutManager);
        requestAdapter = new RequestAdapter(movieLiteList,this);
        recyclerView.setAdapter(requestAdapter);
        getAllAndMovieAndSeries("/all");
    }

    public void getAll(View view)    { getAllAndMovieAndSeries("/all");  }
    public void getMovie(View view)  { getAllAndMovieAndSeries("/movie");  }
    public void getSeries(View view) { getAllAndMovieAndSeries("/series");  }

    private void  getAllAndMovieAndSeries(String end)
    {
     AndroidNetworking.get(MOVIEPUR_URL+end)
                .build()
                .getAsObjectList(MovieLite.class, new ParsedRequestListener() {
                    @Override
                    public void onResponse(Object response) {
                        movieLiteList.clear();
                        movieLiteList.addAll((Collection<? extends MovieLite>) response);
                        requestAdapter.notifyDataSetChanged();
                    }
                    @Override
                    public void onError(ANError anError) {
                        movieLiteList.clear();
                        movieLiteList.add(new MovieLite(0,"NA",null));
                        requestAdapter.notifyDataSetChanged();
                    }
                });
    }


}