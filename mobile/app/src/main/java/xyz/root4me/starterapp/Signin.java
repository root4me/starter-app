package xyz.root4me.starterapp;

import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by root4me on 2/10/18.
 */

public class Signin extends AsyncTask<Void, Void, Boolean> {

    private static final String TAG = "SIGNIN";

    private final String mUsername;
    private final String mPassword;
    String mUrl = "";
    private String mLoginMessage;

    Signin(String username, String password, String url) {
        mUsername = username;
        mPassword = password;
        mUrl = url;
    }

    @Override
    protected Boolean doInBackground(Void... params) {

        Log.i(TAG, "Inside doInBackground  .. Attempting to log in");

        try {
            JSONObject login = new JSONObject();
            try {
                login.put("user", mUsername);
                login.put("pwd", mPassword);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            utils l = new utils();

            JSONObject res = l.httpRequest(mUrl + "/user/login", "POST", login, null);
            String s = res.getString("success");

            if (Boolean.parseBoolean(s)) {
                // store token in shared pref
                //SharedPreferences.Editor editor = getSharedPreferences("xyz.root4me.starterapp",).edit();

                //editor.putString("token", res.getString("token"));

                Log.i(TAG, res.getString("token"));

                //editor.commit();

                return true;
            } else {
                return false;

            }

            //return login(login);
        } catch (Exception e) {
            return false;
        }

    }

}
