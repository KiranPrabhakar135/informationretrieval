package models;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.SerializedName;

public class CustomTweet {
	
	//Remove the below filds
	 	public String text;
	 	public String lang;
	    public CustomTweet() {
	    	hashtags = new ArrayList<>();
	    	mentions = new ArrayList<>();
	    	tweet_urls = new ArrayList<>();
	    	tweet_emoticons = new ArrayList<>();
		}
	
	public String tweet_loc;	
    public String city;
    public String topic;
    
    @SerializedName("coordinates")
    public Coordinates coordinates;
    
    public List<String> hashtags;
    
    public List<String> mentions;
    public List<String> tweet_urls;
    public List<String> tweet_emoticons;

    /**
     * UTC time when this Tweet was created.
     */
    @SerializedName("created_at")
    public String createdAt;
    
    @SerializedName("entities")
    public TweetEntities entities;
    
    @SerializedName("extended_entities")
    public   TweetEntities extendedEntities;

    /**
     * Nullable. Indicates approximately how many times this Tweet has been "favorited" by Twitter
     * users.
     */
    @SerializedName("favorite_count")
    public   Integer favoriteCount;



    /**
     * The integer representation of the unique identifier for this Tweet. This number is greater
     * than 53 bits and some programming languages may have difficulty/silent defects in
     * interpreting it. Using a signed 64 bit integer for storing this identifier is safe. Use
     * id_str for fetching the identifier to stay on the safe side. See Twitter IDs, JSON and
     * Snowflake.
     */
    @SerializedName("id")
    public   long id;

    /**
     * The string representation of the unique identifier for this Tweet. Implementations should use
     * this rather than the large integer in id
     */
    @SerializedName("id_str")
    public   String idStr;

    /**
     * Nullable. When present, indicates a BCP 47 language identifier corresponding to the
     * machine-detected language of the Tweet text, or "und" if no language could be detected.
     */
  
    public   String tweet_lang;

    /**
     * Nullable. When present, indicates that the tweet is associated (but not necessarily
     * originating from) a Place.
     */
    @SerializedName("place")
    public   Place place;


    /**
     * This field only surfaces when the Tweet is a quote Tweet. This field contains the
     * integer value Tweet ID of the quoted Tweet.
     */
    @SerializedName("quoted_status_id")
    public  long quotedStatusId;

    /**
     * This field only surfaces when the Tweet is a quote Tweet. This is the string representation
     * Tweet ID of the quoted Tweet.
     */
    @SerializedName("quoted_status_id_str")
    public  String quotedStatusIdStr;

    
    /**
     * Perspectival. Indicates whether this Tweet has been retweeted by the authenticating user.
     */
    @SerializedName("retweeted")
    public boolean retweeted;
    /**
     * The actual UTF-8 text of the status update. See twitter-text for details on what is currently
     * considered valid characters.
     */
    @SerializedName("tweet_text")
    public String tweet_text;
    
    @SerializedName("text_en")
    public String text_en;
    @SerializedName("text_es")
    public String text_es;
    @SerializedName("text_fr")
    public String text_fr;
    @SerializedName("text_th")
    public String text_th;
    @SerializedName("text_hi")
    public String text_hi;
    
   


    /**
     * An array of two unicode code point indices, identifying the inclusive start and exclusive end
     * of the displayable content of the Tweet.
     */
    @SerializedName("display_text_range")
    public List<Integer> displayTextRange;

    /**
     * Indicates whether the value of the text parameter was truncated, for example, as a result of
     * a retweet exceeding the 140 character Tweet length. Truncated text will end in ellipsis, like
     * this ... Since Twitter now rejects long Tweets vs truncating them, the large majority of
     * Tweets will have this set to false.
     * Note that while native retweets may have their toplevel text property shortened, the original
     * text will be available under the retweeted_status object and the truncated parameter will be
     * set to the value of the original status (in most cases, false).
     */
    @SerializedName("truncated")
    public boolean truncated;
  

}
