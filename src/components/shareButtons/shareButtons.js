import React from 'react'
import {
    ShareButtons,
    generateShareIcon,
} from 'react-share';

require('./shareButtons.scss');

const {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');

const shareUrl = 'http://aucklandelections.nz';
const title = 'Auckland Elections';

export default class SocialMediaShareButtons extends React.Component {
    constructor(context) {
        super( context);
    }


    render() {
        let facebook =
            <FacebookShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button">
                <FacebookIcon
                    size={32}
                    round />
            </FacebookShareButton>;

        let twitter =
            <TwitterShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button">
                <TwitterIcon
                    size={32}
                    round />
            </TwitterShareButton>;

        let googlePlus =
            <GooglePlusShareButton
                url={shareUrl}
                className="Demo__some-network__share-button">
                <GooglePlusIcon
                    size={32}
                    round />
            </GooglePlusShareButton>;

        let linkedin =
            <LinkedinShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button">
                <LinkedinIcon
                    size={32}
                    round />
            </LinkedinShareButton>;

        let pintereset =
            <PinterestShareButton
                url={shareUrl}
                media={'http://aucklandelections.nz/images/national-launch.png'}
                className="Demo__some-network__share-button">
                <PinterestIcon size={32} round />
            </PinterestShareButton>;
        return(
            <div className="share-buttons-container">
                {facebook}
                {twitter}
                {googlePlus}
                {linkedin}
                {pintereset}
            </div>
        );
    }
}
