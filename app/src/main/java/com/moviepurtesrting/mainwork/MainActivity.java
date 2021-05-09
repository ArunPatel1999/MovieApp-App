package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import com.moviepurtesrting.R;
import com.moviepurtesrting.adapters.RequestAdapter;
import com.moviepurtesrting.enitity.MovieLite;
import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private List<MovieLite> movieLiteList;
    private RequestAdapter requestAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        movieLiteList = new ArrayList<>();

        Toolbar toolBar=findViewById(R.id.toolbar);
        toolBar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                if(item.getItemId() == R.id.search_button)
                {
                        startActivity(new Intent(MainActivity.this, SearchActivity.class));
                }
                return false;
            }
        });

        recyclerView = findViewById(R.id.recyclerView);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this,RecyclerView.VERTICAL,false);
        recyclerView.setLayoutManager(layoutManager);
        requestAdapter = new RequestAdapter(movieLiteList,this);
        recyclerView.setAdapter(requestAdapter);
        getAllMovie();
    }

    public void getAll(View view)    { getAllMovie();                   }
    public void getMovie(View view)  { getMovie_Vs_Series(true);  }
    public void getSeries(View view) { getMovie_Vs_Series(false); }


    private void  getAllMovie()
    {
        movieLiteList.add(new MovieLite(1,"this my name ","https://images.pexels.com/photos/2625752/pexels-photo-2625752.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500.jpg"));
        movieLiteList.add(new MovieLite(3,"view","https://images.pexels.com/photos/3327981/pexels-photo-3327981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500.jpg"));
        movieLiteList.add(new MovieLite(5,"big ","https://images.pexels.com/photos/1547708/pexels-photo-1547708.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500.jpg"));
        requestAdapter.notifyDataSetChanged();
    }

    private void  getMovie_Vs_Series(boolean type)
    {
        /*
        if(type)
               //call Movie
        else
               //call series
          */
        movieLiteList.add(new MovieLite(1,"this my name ","https://images.pexels.com/photos/2625752/pexels-photo-2625752.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500.jpg"));
        movieLiteList.add(new MovieLite(3,"view","https://images.pexels.com/photos/3327981/pexels-photo-3327981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500.jpg"));
        movieLiteList.add(new MovieLite(5,"big ","https://images.pexels.com/photos/1547708/pexels-photo-1547708.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500.jpg"));
        requestAdapter.notifyDataSetChanged();
    }


}