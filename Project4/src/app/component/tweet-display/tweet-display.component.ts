import {Component, Inject, OnInit} from '@angular/core';
import {Tweet} from '../../model/query-result';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GoogleCloudService} from '../../service/analytics/google-cloud.service';
import {ApplicationConstants} from '../../util/application-constants';

@Component({
  selector: 'app-tweet-display-component',
  templateUrl: './tweet-display.component.html',
  styleUrls: ['./tweet-display.component.css']
})

export class TweetDisplayComponent implements OnInit {
  public tweet: Tweet;
  public tweetUnformatted: Tweet;
  public documentScore: number;
  public documentMagnitude: number;

  constructor(private dialogRef: MatDialogRef<TweetDisplayComponent>, @Inject(MAT_DIALOG_DATA) data, private score: GoogleCloudService) {
    this.tweetUnformatted = data.tweet;
    if (this.tweetUnformatted['queryMetadata.query_language'] != null) {
      this.tweetUnformatted['queryMetadata.query_language'] = ApplicationConstants.getFormattedLanguageName(this.tweetUnformatted['queryMetadata.query_language'][0]);
    }
    if (this.tweetUnformatted['queryMetadata.query_topic'] != null) {
      this.tweetUnformatted['queryMetadata.query_topic'] = ApplicationConstants.getFormattedTopicName(this.tweetUnformatted['queryMetadata.query_topic'][0]);
    }
    if (this.tweetUnformatted['queryMetadata.query_city'] != null) {
      this.tweetUnformatted['queryMetadata.query_city'] = ApplicationConstants.getFormattedCityName(this.tweetUnformatted['queryMetadata.query_city'][0]);
    }
    this.tweet = this.tweetUnformatted;
    this.score.getScore(this.tweet).subscribe(scores => {
      if (scores.response != null) {
        console.log('Success');
      } else {
        console.log(scores);
        this.documentScore = scores['documentSentiment']['score'];
        this.documentMagnitude = scores['documentSentiment']['magnitude'];
      }
    });
  }

  ngOnInit() {
  }
}
