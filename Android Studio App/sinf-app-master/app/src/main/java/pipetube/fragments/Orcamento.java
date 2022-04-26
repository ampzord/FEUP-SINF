package pipetube.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import pipetube.R;
import pipetube.initializer.PipeTubeApplication;

import static android.app.PendingIntent.getActivity;


public class Orcamento extends Fragment{

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        //((PipeTubeApplication) Objects.requireNonNull(getActivity().getApplication()).getApplicationContext().inject(this);

        return inflater.inflate(R.layout.orcamento, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {

    }

}
