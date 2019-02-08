import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.vdurmont.emoji.EmojiParser;

import models.Catagory;
import models.CustomTweet;
import models.HashtagEntity;
import models.MentionEntity;
import models.Tweet;
import models.UrlEntity;

public class PreProcess {
	public static int count_thai  =0;
	public static String roundDates(String inputDate) {         
		try {
			TemporalAccessor temporalAccessor = DateTimeFormatter.ISO_INSTANT.parse(inputDate);
			Instant instant = Instant.from(temporalAccessor);        
			instant = instant.truncatedTo( ChronoUnit.HOURS);         
			return DateTimeFormatter.ISO_INSTANT.format(instant);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("This is issue");
			e.printStackTrace();
			
			return inputDate;
		}     
	}
	public static CustomTweet Map(CustomTweet tweet) {
		try {
					
			String tweetText = tweet.tweet_text == null? tweet.text: tweet.tweet_text;;
			if(tweet.city == "New York City (NYC)") {
				tweet.city = "nyc";
			}
			if(tweet.tweet_loc != null) {
				System.out.println(tweet.tweet_loc);
				tweet.tweet_loc = tweet.tweet_loc.replace(",2mi", "");
			}
						
			
			try {
				Instant instant = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy").parse(tweet.createdAt).toInstant();
				tweet.createdAt = DateTimeFormatter.ISO_INSTANT.format(instant).toString();
				tweet.createdAt = roundDates(tweet.createdAt);
			} catch (Exception e) {
				tweet.createdAt = roundDates(tweet.createdAt);
				System.out.println("Formated correct");
			}
			
			if(tweet.entities != null) {
				if(tweet.entities.hashtags != null && tweet.entities.hashtags.size() > 0) {
					for (HashtagEntity hashtag : tweet.entities.hashtags) {
						tweet.hashtags.add(hashtag.text.toLowerCase());
						tweetText = tweetText.toLowerCase().replace("#"+hashtag.text.toLowerCase(), "");
					}
				}
				if(tweet.entities.urls != null && tweet.entities.urls.size() > 0) {
					for (UrlEntity urlItem : tweet.entities.urls) {
						tweet.tweet_urls.add(urlItem.url.toLowerCase());
						tweetText = tweetText.toLowerCase().replace(urlItem.url.toLowerCase(), "");
					}
				}
				if(tweet.entities.userMentions != null && tweet.entities.userMentions.size() > 0) {
					for (MentionEntity userMention : tweet.entities.userMentions) {
						tweet.mentions.add(userMention.screenName.toLowerCase());
						tweetText = tweetText.toLowerCase().replace("@"+userMention.screenName.toLowerCase(), "");
					}
				}
				tweet.tweet_emoticons.addAll(EmojiParser.extractEmojis(tweetText));
				tweetText = EmojiParser.removeAllEmojis(tweetText);				
				
				Pattern pattern = Pattern.compile("(\\Q:)\\E|\\Q:D\\E|\\Q:(\\E|\\Q:wink:\\E)");
				Matcher matcher = pattern.matcher(tweetText);
				while(matcher.find()) {									
				   tweet.tweet_emoticons.add(matcher.group());  
				}  
				tweetText = matcher.replaceAll("");				
			}
			String item = tweet.tweet_lang == null ? tweet.lang : tweet.tweet_lang;
			switch (item) {
			case "en":
				tweet.text_en = tweetText;
				break;
			case "es":
				System.out.println("This is es tweet");
				tweet.text_es = tweetText;
				break;
			case "fr":
				System.out.println("This is fr tweet");
				tweet.text_fr = tweetText;
				break;
			case "hi":
				System.out.println("This is hi tweet");
				tweet.text_hi = tweetText;
				break;
			case "th":
				System.out.println("This is th tweet");
				tweet.text_th = tweetText;
				break;
			default:
				break;
			}			
			return tweet;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	public static String currentDirectory = System.getProperty("user.dir");

	public static void main(String[] args) {
		try {
			File folder = new File(currentDirectory);
			String targetDirectory = "2018-09-20_delhi";
			for (File directory : folder.listFiles()) {
				String directoryName = directory.getName();
				if(directory.isDirectory() && directoryName.equals(targetDirectory)) {					
					File rootDirectory = new File(currentDirectory+"\\UpdatedTweets\\"+directoryName);
					if(!rootDirectory.exists()) {
						rootDirectory.mkdirs();
					}
					for (File file : directory.listFiles()) {
						String fileName = file.getName();
						if(fileName.contains(".json")) {							
							List<CustomTweet> tweets = new ArrayList<>();
							List<CustomTweet> updatedTweets = new ArrayList<>();
							Gson gson = new Gson();
							Reader reader = new FileReader(file.getAbsolutePath());
							java.lang.reflect.Type catagoryType = new TypeToken<List<CustomTweet>>() {}.getType();
							tweets = gson.fromJson(reader, catagoryType);
							for (CustomTweet tweet : tweets) {
								CustomTweet updatedTweet = Map(tweet);
								updatedTweets.add(updatedTweet);
							}
							String jsonString = gson.toJson(updatedTweets);

							BufferedWriter bWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(currentDirectory+"\\UpdatedTweets\\"+ directoryName + "\\"+ fileName,true),"UTF8") );
							bWriter.append(jsonString);
							bWriter.close();
							System.out.println("Processing the file "+ fileName +" in the directory: " + directoryName);
						}
						
					}
					
				}
			}
			System.out.println("count: "+ count_thai);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}
	
}
