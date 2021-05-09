package com.moviepurtesrting.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.moviepurtesrting.R;
import com.moviepurtesrting.enitity.MovieLite;

import java.util.List;

public class RequestAdapter extends RecyclerView.Adapter<RequestAdapter.ViewHolder> {

    private List<MovieLite> dataset;
    private Context context;

    public RequestAdapter(List<MovieLite> dataset, Context context) {
        this.dataset = dataset;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view= LayoutInflater.from(parent.getContext()).inflate(R.layout.movies_list,parent,false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.mName.setText(dataset.get(position).getName());
        holder.mId.setText(dataset.get(position).getId()+"");
        holder.mId.setVisibility(View.INVISIBLE);
        Glide.with(context).load(dataset.get(position).getImage_url()).into(holder.mImage);

        holder.movieClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //for next Time
            }
        });

    }

    @Override
    public int getItemCount() {
        return dataset.size();
    }



    class ViewHolder extends RecyclerView.ViewHolder
    {
        TextView mName,mId;
        ImageView mImage;
        RelativeLayout movieClick;


        ViewHolder(final View itemView)
        {
            super(itemView);

            mImage = itemView.findViewById(R.id.mImage);
            mName = itemView.findViewById(R.id.mName);
            mId = itemView.findViewById(R.id.mId);
            movieClick = itemView.findViewById(R.id.movieClick);
        }
    }
}
