package models;

import com.google.gson.annotations.SerializedName;


public class ApiError {

    @SerializedName("message")
    public final String message;

    @SerializedName("code")
    public final int code;

    public ApiError(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
