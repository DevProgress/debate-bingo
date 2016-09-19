import React, { Component } from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');

export default class Social extends Component {
  render() {
    const shareUrl = window.location.href.split('#')[0]
    const media = shareUrl + "images/mixed.png"

    return (
      <div className="social-icons-bar">
        <div className="title">
          {this.props.heading}
        </div>
        <div className="social-media">
          <TwitterShareButton
            url={shareUrl}
            title={this.props.title}
            className="share-button">
            <TwitterIcon className="desktop" size={50} round />
          </TwitterShareButton>
          {<div className="share-count">
            &nbsp;
          </div>}
        </div>

        <div className="social-media">
          <FacebookShareButton
            url={shareUrl}
            title={this.props.title}
            className="share-button">
            <FacebookIcon className="desktop" size={50} round />
          </FacebookShareButton>
          {<FacebookShareCount
            url={shareUrl}
            className="share-count">
            {count => count}
          </FacebookShareCount>}
        </div>

        <div className="social-media">
          <GooglePlusShareButton
            url={shareUrl}
            className="share-button">
            <GooglePlusIcon className="desktop" size={50} round />
          </GooglePlusShareButton>
          {<GooglePlusShareCount
            url={shareUrl}
            className="share-count">
            {count => count}
          </GooglePlusShareCount>}
        </div>

        <div className="social-media">
          <LinkedinShareButton
            url={shareUrl}
            title={this.props.title}
            className="share-button">
            <LinkedinIcon className="desktop" size={50} round />
          </LinkedinShareButton>
          {<LinkedinShareCount
            url={shareUrl}
            className="share-count">
            {count => count}
          </LinkedinShareCount>}

        </div>

        <div className="social-media">
          <PinterestShareButton
            url={shareUrl}
            media={media}
            title={this.props.title}
            className="share-button">
            <PinterestIcon className="desktop" size={50} round />
          </PinterestShareButton>
          {<PinterestShareCount
            url={shareUrl}
            className="share-count">
            {count => count}
          </PinterestShareCount>}
        </div>
      </div>
    );
  }
}
