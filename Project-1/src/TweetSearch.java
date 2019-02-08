
import models.*;
import models.HashtagEntity;
import sun.net.www.content.text.plain;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.sun.org.apache.xpath.internal.operations.Bool;
import com.vdurmont.emoji.EmojiParser;

import jdk.management.resource.internal.TotalResourceContext;
import twitter4j.*;
import twitter4j.auth.Authorization;
import twitter4j.auth.AuthorizationFactory;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

/**
 * @author kiran
 *
 */


public class TweetSearch {

	public static String searchApi = "https://api.twitter.com/1.1/search/tweets.json?q=";
	public static String bearerToken = "bearer AAAAAAAAAAAAAAAAAAAAAMqD8QAAAAAAqzmtY6%2FIwI9O3L%2FsD0l%2BJnGPdOo%3DOJ9y4ee8ig8pJeTsmDQ0oGvNZ5bt3unQner3pjm2hj875jGPEV";
	public static List<Catagory> catagories = new ArrayList<Catagory>();
	public static String[] languages = new String[] {"th"};//{"en", "hi", "th", "fr", "es"};
	//NY, Delhi, Bangkok, Paris, Mexico city
	//public static String[] cities1 = new String[] {"40.712776,-74.005974,2mi", "28.644800,77.216721,2mi", "13.756331,100.501762,2mi",
		//	"48.856613,2.352222,2mi", "19.195520,-99.428670,2mi"};
	public static Map<String, String> cities = new HashMap<String,String>();
	
	public static String currentDirectory = System.getProperty("user.dir");
	public static String executionLogFile = currentDirectory + "//executionLog.txt";
	public static String rootFolder =  DateTimeFormatter.ofPattern("yyyy-MM-dd").format( LocalDateTime.now()).toString()+"_delhi";
	public static int requestsCount = 0;
	/**
	 * @param args
	 * @throws IOException 
	 * @throws TwitterException 
	 */
	public static void main(String[] args) throws IOException, TwitterException {		
		try {
			 
			initialize();
			//Eg:Tweet_FriSep0712:16:38EDT2018.txt - Remove spaces and ':' from the date
			File directory = new File(currentDirectory+"\\"+rootFolder);
			if(!directory.exists()) {
				directory.mkdir();
			}
			 
			while(!isJobComplete()) {
				for (Catagory catagory : catagories) {
					if(catagory.weight > catagory.iterationCount) {
						for (String language : languages) {
							String outputFile = "Tweet_" +  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date()).toString().replaceAll("\\s","").replaceAll(":", "").replaceAll("\\.", "") +".json";
							int count = getAndSaveTweets(catagory.name, null, language, outputFile, catagory.mainCategory);
							//Thread.sleep(2000);
							catagory.tweetCount += count;
							requestsCount--;
						}
						for (String city : cities.keySet()) {
							String outputFile = "Tweet_" +  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date()).toString().replaceAll("\\s","").replaceAll(":", "").replaceAll("\\.", "") +".json";
							int count = getAndSaveTweets(catagory.name, city, null, outputFile, catagory.mainCategory);
							//Thread.sleep(2000);
							catagory.tweetCount += count;
							requestsCount--;
						}
						
						System.out.println("The current Catagory is: "+catagory.name +" ...The number of requests pending:" + requestsCount);					
						Thread.sleep(2000);
						
					}
					catagory.iterationCount++;
				}
			}
			

			//delete the old contents in the executionlog file and append the job count and the catagoreis json
			Gson gson = new Gson();			
			String executionFile = gson.toJson(catagories);
			BufferedWriter bWriter = new BufferedWriter(new FileWriter(currentDirectory + "\\"+ rootFolder +"\\ExecutionFile.txt",true));
			bWriter.append(executionFile);
			bWriter.close();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static Boolean isJobComplete() {
		for (Catagory catagory : catagories) {
			if(catagory.weight > catagory.iterationCount) {
				return false;
			}
			else {
				continue;
			}
		}
		return true;
	}


	public static void initialize() {
		try {
			Gson gson = new Gson();
			Reader reader = new FileReader(currentDirectory + "\\Input.json");
			java.lang.reflect.Type catagoryType = new TypeToken<List<Catagory>>() {}.getType(); 
			catagories = gson.fromJson(reader, catagoryType);
			cities.putIfAbsent("nyc", "40.712776,-74.005974,2000mi");
			cities.putIfAbsent("delhi", "28.644800,77.216721,2000mi");
			cities.putIfAbsent("bangkok", "13.756331,100.501762,2000mi");
			cities.putIfAbsent("paris", "48.856613,2.352222,2000mi");
			cities.putIfAbsent("mexico city", "19.195520,-99.428670,2000mi");
			
			for (Catagory catagory : catagories) {
				requestsCount += catagory.weight;
			}
			requestsCount = requestsCount;
			System.out.println("Total number of requests to be triggered are: " + requestsCount);
		} catch (JsonIOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonSyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static int getAndSaveTweets(String category, String location, String language, String outputfile, String mainCategory) throws TwitterException, IOException {		
		try 
		{
			
			StringBuilder requiredApiBuilder = new StringBuilder(searchApi);
			requiredApiBuilder.append("'" + category + "'");
			if(location != null) {
				requiredApiBuilder.append("&geocode=" + cities.get(location));
			}
			if(language != null) {
				requiredApiBuilder.append("&lang=" + language);
			}
			requiredApiBuilder.append("&count=100");
			HttpClient client = HttpClientFactory.getInstance();
			Map<String, String> headers = new HashMap<String, String>();
			headers.putIfAbsent("Authorization", bearerToken);		

			ConfigurationBuilder builder = new ConfigurationBuilder();
			builder.setApplicationOnlyAuthEnabled(true);
			Authorization authorization = AuthorizationFactory.getInstance(builder.build());
			String urlSting = requiredApiBuilder.toString();		
			
			HttpRequest request = new HttpRequest(RequestMethod.GET, urlSting, null, authorization, headers);
			HttpResponse response = client.request(request);			
			
			JSONObject jsonObject = response.asJSONObject();
			//String string  = jsonObject.toString();
			
			Gson gson = new Gson();
			java.lang.reflect.Type catagoryType = new TypeToken<Search>() {}.getType(); 
			Search search = gson.fromJson(jsonObject.toString(), catagoryType);
			if(search.tweets != null && search.tweets.size() > 0) {
				/*List<CustomTweet> customTweets = new ArrayList<CustomTweet>();
				for (Tweet tweet : search.tweets) {	
					if(tweet.retweetedStatus == null) {
						CustomTweet customTweet = Map(tweet);
						if(customTweet != null) {
							customTweet.topic = mainCategory;
							customTweet.city = location;
							customTweets.add(customTweet);
						}						
					}					
				}
				String jsonString = gson.toJson(customTweets);*/

				BufferedWriter bWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(currentDirectory + "\\"+ rootFolder +"\\"+ outputfile,true),"UTF8") );
				bWriter.append(jsonObject.toString());
				bWriter.close();
				
				BufferedWriter bWriter1 = new BufferedWriter(new FileWriter(currentDirectory + "\\"+ rootFolder +"\\ExecutionFile.txt",true));
				bWriter1.append(requiredApiBuilder.toString());
				bWriter1.newLine();				
				bWriter1.close();
				return 0;
			}
			return 0;
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 0;
		}
	}
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
	public static CustomTweet Map(Tweet tweet) {
		try {
			CustomTweet customTweet = new CustomTweet();
			if(tweet.coordinates != null) {
				customTweet.tweet_loc = tweet.coordinates.getLongitude() + "," + tweet.coordinates.getLatitude();
			}
			customTweet.coordinates = tweet.coordinates;			 
			Instant instant = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy").parse(tweet.createdAt).toInstant();
			instant = instant.truncatedTo( ChronoUnit.HOURS);
			customTweet.createdAt = DateTimeFormatter.ISO_INSTANT.format(instant).toString();
			//customTweet.createdAt = roundDates(tweet.createdAt);
			customTweet.displayTextRange = tweet.displayTextRange;
			customTweet.entities = tweet.entities;
			customTweet.extendedEntities = tweet.extendedEntities;
			customTweet.favoriteCount = tweet.favoriteCount;
			customTweet.id = tweet.id;
			customTweet.idStr = tweet.idStr;
			customTweet.place = tweet.place;
			customTweet.quotedStatusId = tweet.quotedStatusId;
			customTweet.quotedStatusIdStr = tweet.quotedStatusIdStr;
			customTweet.retweeted = tweet.retweeted;
			customTweet.tweet_text = tweet.text;
			customTweet.truncated = tweet.truncated;
			customTweet.tweet_lang = tweet.lang;			
			if(tweet.entities != null) {
				if(tweet.entities.hashtags != null && tweet.entities.hashtags.size() > 0) {
					for (HashtagEntity hashtag : tweet.entities.hashtags) {
						customTweet.hashtags.add(hashtag.text.toLowerCase());
						tweet.text = tweet.text.replace("#"+hashtag.text, " ");
					}
				}
				if(tweet.entities.urls != null && tweet.entities.urls.size() > 0) {
					for (UrlEntity urlItem : tweet.entities.urls) {
						customTweet.tweet_urls.add(urlItem.url.toLowerCase());
						tweet.text = tweet.text.replace(urlItem.url, " ");
					}
				}
				if(tweet.entities.userMentions != null && tweet.entities.userMentions.size() > 0) {
					for (MentionEntity userMention : tweet.entities.userMentions) {
						customTweet.mentions.add(userMention.screenName.toLowerCase());
						tweet.text = tweet.text.replace("@"+userMention.name, " ");
					}
				}
				customTweet.tweet_emoticons.addAll(EmojiParser.extractEmojis(tweet.text));
				tweet.text = EmojiParser.removeAllEmojis(tweet.text);				
				
				Pattern pattern = Pattern.compile("(\\Q:)\\E|\\Q:D\\E|\\Q:(\\E|\\Q:wink:\\E)");
				Matcher matcher = pattern.matcher(tweet.text);
				while(matcher.find()) {									
					customTweet.tweet_emoticons.add(matcher.group());  
				}  
				tweet.text = matcher.replaceAll("");	
			}
			switch (tweet.lang) {
			case "en":
				customTweet.text_en = tweet.text;
				break;
			case "es":
				customTweet.text_es = tweet.text;
				break;
			case "fr":
				customTweet.text_fr = tweet.text;
				break;
			case "hi":
				customTweet.text_hi = tweet.text;
				break;
			case "th":
				customTweet.text_th = tweet.text;
				break;
			default:
				break;
			}			
			return customTweet;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public static void getAndSaveStreamingTweets() {
		 try {
			 //https://github.com/Twitter4J/Twitter4J/blob/master/twitter4j-examples/src/main/java/twitter4j/examples/stream/PrintSampleStream.java
			 
			 ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
			 configurationBuilder.setApplicationOnlyAuthEnabled(true);
			 configurationBuilder.setOAuthConsumerKey("3nar7eM7oWjrgeUQH8RvhlTDO");
			 configurationBuilder.setOAuthConsumerSecret("RnWg5gITK5Mwo3FutcoX8d0ZLVsLp8PsrL0md4B80FDkcMnLZ2");
			 configurationBuilder.setOAuthAccessToken("1035703525324541952-WxntgPGzowU90aUr3poOqGLwhzDr6Q");
			 configurationBuilder.setOAuthAccessTokenSecret("i0jquCYVa8Y5vUvEJl2DFIgYyVkV48EGYm8laEtMlcPoS");
			/* Twitter4j.
			 StatusListener listener = new StatusListener(){
			        public void onStatus(Status status) {
			            System.out.println(status.getUser().getName() + " : " + status.getText());
			        }
			        public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {}
			        public void onTrackLimitationNotice(int numberOfLimitedStatuses) {}
			        public void onException(Exception ex) {
			            ex.printStackTrace();
			        }
			    };
			    TwitterStream twitterStream = new TwitterStreamFactory().getInstance();
			    twitterStream.addListener(listener);
			    // sample() method internally creates a thread which manipulates TwitterStream and calls these adequate listener methods continuously.
			    twitterStream.sample();
			 
			 
			 TwitterStream twitterStream = new TwitterStreamFactory(configurationBuilder.build()).getInstance();
			 
			 QueryResult result = twitter.search(query);*/
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
