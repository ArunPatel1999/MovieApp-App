package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.ParsedRequestListener;
import com.moviepurtesrting.R;
import com.moviepurtesrting.adapters.RequestAdapter;
import com.moviepurtesrting.enitity.MovieLite;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SearchingData extends AppCompatActivity {

    private List<MovieLite> movieLiteList;
    private RequestAdapter requestAdapter;
    private final String MOVIEPUR_URL = "https://moviepur-api.herokuapp.com/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_searching_data);

        movieLiteList =  new ArrayList<>();
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this,RecyclerView.VERTICAL,false);
        recyclerView.setLayoutManager(layoutManager);
        requestAdapter = new RequestAdapter(movieLiteList,this);
        recyclerView.setAdapter(requestAdapter);

        TextView showName =  findViewById(R.id.showName);
        showName.setText(getIntent().getStringExtra("NAME"));
        getBySerch(getIntent().getStringExtra("URL"));
    }

    public void backButton(View view){
        Intent i =new Intent(SearchingData.this,SearchMoive.class);
        startActivity(i);
    }


    private void  getBySerch(String end) {
        AndroidNetworking.get(MOVIEPUR_URL+end)
                .build()
                .getAsObjectList(MovieLite.class, new ParsedRequestListener() {
                    @Override
                    public void onResponse(Object response) {
                        movieLiteList.clear();
                        movieLiteList.addAll((Collection<? extends MovieLite>) response);
                        if(movieLiteList.isEmpty())
                            movieLiteList.add(new MovieLite(0,"NA",null));
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