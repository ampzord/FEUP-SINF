package pipetube.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import pipetube.R;


public class RegisterFirstFragment extends Fragment {

    private EditText firstName;
    private EditText lastName;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.activity_register, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        firstName = view.findViewById(R.id.user_name_id);
        lastName = view.findViewById(R.id.pass_name_id);

    }

    private void addBlurListenersToFields() {
        firstName.setOnFocusChangeListener((v, hasFocus) -> {
            if (!hasFocus && firstName.getText().toString().equals(""))
                showErrorMessage(firstName);
        });

        lastName.setOnFocusChangeListener((v, hasFocus) -> {
            if (!hasFocus && lastName.getText().toString().equals(""))
                showErrorMessage(lastName);
        });
    }

    private void showErrorMessage(EditText firstName) {
    }

    private boolean validateFields() {

        if(firstName.getText().toString().equals("")) {
            showErrorMessage(firstName);
            return false;
        }

        if(lastName.getText().toString().equals("")) {
            showErrorMessage(lastName);
            return false;
        }

        return true;
    }


}
