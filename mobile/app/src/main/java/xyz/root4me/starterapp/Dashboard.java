package xyz.root4me.starterapp;

import android.app.Activity;
import android.app.DialogFragment;
import android.os.Bundle;

public class Dashboard extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        // TODO check for valid troken

        // Launch login dialog
        DialogFragment signin = new SigninDialog();
        signin.show(getFragmentManager(), "signin");

    }
}
