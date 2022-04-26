package pipetube;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.Button;

import javax.inject.Inject;

import androidx.appcompat.app.AppCompatActivity;
import pipetube.initializer.PipeTubeApplication;
import pipetube.repository.CustomerRepository;

public class RegisterActivity extends AppCompatActivity {

    @Inject
    CustomerRepository customerRepository;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_register);

        ((PipeTubeApplication)getApplication()).getApplicationComponent().inject(this);

        SharedPreferences sharedPreferences = getSharedPreferences(getResources().getString(R.string.STORED_FILE), Context.MODE_PRIVATE);

        Button mButton = findViewById(R.id.btn_login);

        mButton.findViewById(R.id.btn_login).setOnClickListener(button -> validateAndSendRequest());
    }

    private void validateAndSendRequest() {

        System.out.println("SEND SERVER REQUEST");

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        this.finish();
    }
}
