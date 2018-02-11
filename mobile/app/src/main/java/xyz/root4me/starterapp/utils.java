package xyz.root4me.starterapp;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.os.Build;
import android.util.Log;
import android.view.View;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by root4me on 11/11/16.
 */

public class utils {

    private static final String TAG = "UTILS";

    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    public static void showProgress(final boolean show, final View progress, final View hideView) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            //int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            int shortAnimTime = 200;

            if (hideView != null) {
                hideView.setVisibility(show ? View.GONE : View.VISIBLE);
                hideView.animate().setDuration(shortAnimTime).alpha(
                        show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                        hideView.setVisibility(show ? View.GONE : View.VISIBLE);
                    }
                });
            }

            progress.setVisibility(show ? View.VISIBLE : View.GONE);
            progress.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    progress.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            progress.setVisibility(show ? View.VISIBLE : View.GONE);
            progress.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }

    public static String readStream(InputStream in) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        StringBuilder sb = new StringBuilder();

        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        return sb.toString();
    }

    public JSONObject httpRequest(String urlString, String method, JSONObject params, String authToken) {

        Log.d(TAG, "Inside httpPost");

        URL url = null;
        HttpURLConnection urlConnection = null;

        try {
            url = new URL(urlString);
            Log.d(TAG, urlString);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setConnectTimeout(10000);
            urlConnection.setRequestMethod(method);
            urlConnection.setRequestProperty("Content-Type", "application/json");
            Log.d(TAG, "token : " + authToken);
            urlConnection.setRequestProperty("x-access-token", authToken);

            if (method == "POST") {
                urlConnection.setDoOutput(true);
                OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
                out.write(String.valueOf(params));
                out.close();
            }

            InputStream in = null;
            if (urlConnection.getResponseCode() == 401) {
                in = new BufferedInputStream(urlConnection.getErrorStream());
            } else {
                in = new BufferedInputStream(urlConnection.getInputStream());
            }
            String inp = utils.readStream(in);

            Log.d(TAG, "urlConnection.getInputStream : " + inp);

            JSONObject res = new JSONObject(inp);

            // retun response JSON
            return res;

        } catch (Exception e) {
            Log.d(TAG, "Inside error");

            e.printStackTrace();

            JSONObject j = null;
            j = new JSONObject();
            try {
                j.put("success", false);
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return j;

        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
                Log.i(TAG, "http Disconnecting ...");
            }
        }
    }

}
