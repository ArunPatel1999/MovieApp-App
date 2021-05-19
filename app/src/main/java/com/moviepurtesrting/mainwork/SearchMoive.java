package com.moviepurtesrting.mainwork;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TableLayout;
import android.widget.TableRow;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.ParsedRequestListener;
import com.moviepurtesrting.R;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RequiresApi(api = Build.VERSION_CODES.O)
public class SearchMoive extends AppCompatActivity {


    private final String MOVIEPUR_URL = "https://moviepur-api.herokuapp.com/";
    private Context context ;
    private Spinner dropdown;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_moive);
        context = this;

        dropdown = findViewById(R.id.spinner1);
        String[] items = new String[]{"IMDb", "Rotten Tomatoes", "Moviepur"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items);
        dropdown.setAdapter(adapter);

        TableLayout genreList = findViewById(R.id.genresList);
        TableLayout languageList = findViewById(R.id.languageLIst);

        setGenresAndLanguage("all/getAllGenres", genreList);
        setGenresAndLanguage("all/getAllLanguages",languageList);
    }

    public void backButton(View view)    {
        Intent i =new Intent(SearchMoive.this,MainActivity.class);
        startActivity(i);
    }

    public void searchMovie(View view)    {
    EditText editText = findViewById(R.id.name);
        if(!editText.getText().toString().isEmpty()){
            Intent intent =  new Intent(context, SearchingData.class);
            intent.putExtra("NAME",editText.getText().toString());
            intent.putExtra("URL","all/name/"+editText.getText().toString());
            context.startActivity(intent);
        }
    }


    private void setGenresAndLanguage(String end,TableLayout layout){
        AndroidNetworking.get(MOVIEPUR_URL+end)
                .build()
                .getAsObjectList(String.class, new ParsedRequestListener() {
                    @Override
                    public void onResponse(Object response) {
                        addForGenreAndLanguage(layout, (List<String>) response,end.contains("Genres"));
                    }

                    @Override
                    public void onError(ANError anError) {} });
    }



    private void addForGenreAndLanguage(TableLayout layout, List<String> items,Boolean genreOrNot){

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
                button.setAllCaps(false);
                button.setText(value);
                button.setWidth(30);
                button.setOnClickListener(v -> getDownload(value,genreOrNot));
                TableRow.LayoutParams trParams = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.WRAP_CONTENT);

                trParams.setMargins(30, 10, 0, 10);
                button.setLayoutParams(trParams);
                button.setBackgroundColor( Color.rgb(rd.nextInt(255),rd.nextInt(255),rd.nextInt(255)) );
                row.addView(button, trParams);
                i++;
            }
            layout.addView(row);
    }

    private void getDownload(String genres,boolean genreOrNot){
        Intent intent =  new Intent(context, SearchingData.class);
        intent.putExtra("NAME",genres);
        intent.putExtra("URL","all/"+ (genreOrNot ?"genre/":"language/") +genres);
        context.startActivity(intent);
    }

    public void searchMovieByYear(View view){
        EditText startYear = findViewById(R.id.startYear);
        EditText endYear = findViewById(R.id.endYear);
        if(startYear.getText() == null)
            startYear.setText(""+1900);
        if(endYear.getText() == null)
            startYear.setText(""+ LocalDate.now().getYear());
        Intent intent =  new Intent(context, SearchingData.class);
        intent.putExtra("NAME","Search By Year");
        intent.putExtra("URL","all/releaseDate/"+startYear.getText()+"/"+endYear.getText());
        context.startActivity(intent);
    }

    public void searchMovieByRating(View view){
        String raterName = dropdown.getSelectedItem().toString();
        EditText minText = findViewById(R.id.min);
        EditText maxText = findViewById(R.id.max);

        int min = (minText.getText() == null || String.valueOf(minText.getText()).isEmpty()) ? 0   : Integer.parseInt(String.valueOf(minText.getText()))  ;
        int max = (maxText.getText() == null || String.valueOf(maxText.getText()).isEmpty()) ? 100 : Integer.parseInt(String.valueOf(maxText.getText()))  ;

        Intent intent =  new Intent(context, SearchingData.class);
        intent.putExtra("NAME","Search By "+raterName+" Rating");
        intent.putExtra("URL","all/rating/"+raterName+"/"+min+"/"+max);
        context.startActivity(intent);
    }

}