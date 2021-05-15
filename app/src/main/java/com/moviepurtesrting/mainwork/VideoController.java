package com.moviepurtesrting.mainwork;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListPopupWindow;
import android.widget.MediaController;
import android.widget.Spinner;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.VideoView;

import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.DefaultExtractorsFactory;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSourceFactory;
import com.moviepurtesrting.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class VideoController extends AppCompatActivity {

    private Context context;
    private  Map<String,String> links;
    private List<TableRow> rows = new ArrayList<>();
    private TableLayout tableLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_controller);
        context=this;

       links = (Map<String, String>) getIntent().getSerializableExtra("DOWNLOADLINKS");

        String link ="https://www.youtube.com/watch?v=JGwWNGJdvx8&list=RDMMnYh-n7EOtMA&index=10" ;
        for (String key : links.keySet())
                link=links.get(key);

        startVideoPlay(link);
    }


    public void setQuality(View view){
        tableLayout = findViewById(R.id.videoQualDrop);
        rows.forEach(z -> tableLayout.removeView(z));
        rows.clear();
        links.keySet().forEach( x-> {
            TableRow row= new TableRow(context);

            Button button = new Button(context);
            button.setText(x);
            button.setOnClickListener(v -> startVideoPlay(links.get(x)) );

            TableRow.LayoutParams trParams = new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.MATCH_PARENT);
            row.addView(button, trParams);
            tableLayout.addView(row);
            rows.add(row);
        });
    }


    private void startVideoPlay(String link){

        rows.forEach(z -> tableLayout.removeView(z));
        rows.clear();

        VideoView videoView =  findViewById(R.id.videoplayer);
        MediaController mediaController = new MediaController(this);
        mediaController.setAnchorView(videoView);
        Uri video = Uri.parse(link);
        videoView.setMediaController(mediaController);
        videoView.setVideoURI(video);
        videoView.start();
    }

}