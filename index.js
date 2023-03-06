import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// checks if the event triggered has a particular data attr (the three buttons have diff data attr  which makes it easy to identify them)
document.addEventListener('click', (e) => {
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }else if(e.target.dataset.reply){
        handleCommentClick(e.target.dataset.reply)
    }else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }else if(e.target.dataset.comment){
        handleReplyClick(e.target.dataset.comment)
    }
})

const handleReplyClick = (param) => {
    const commentInput = document.getElementById('comment-input')
    console.log(commentInput.value)
        const targetTweetObj = tweetsData.filter((tweet)=>{
            return tweet.uuid === param
        })[0]
        targetTweetObj.replies.unshift({
            handle: `@Danishaft-Code 💎`,
            profilePic: `images/troll.jpg`,
            tweetText: commentInput.value
        })
        render()
}

const handleLikeClick = (tweetId) =>{
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
        targetTweetObj.isLiked = false
    }else {
        targetTweetObj.likes++
        targetTweetObj.isLiked = true
    }
    render()
}

const handleRetweetClick = (param) => {
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === param
    })[0]

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
        targetTweetObj.isRetweeted = false
    }else {
        targetTweetObj.retweets++
        targetTweetObj.isRetweeted = true
    }
    render()
}
 const handleCommentClick = (param) =>{
    document.getElementById(`replies-${param}`).classList.toggle('block')

 }


const handleTweetBtnClick = () => {
    const tweetInput = document.getElementById('tweet-input')
    console.log(tweetInput)
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Danishaft-Code 💎`,
            profilePic: `images/troll.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
    }
    tweetInput.value = ''
}

const getFeedHtml = () => {
    let feedHtml = ``
    tweetsData.forEach((tweet) => {
        let likeIconClass = ''
        let retweetIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        if(tweet.isRetweeted){
            retweetIconClass ='retweeted'
        }

        let repliesHtml = ``
        if(tweet.replies.length > 0){
            tweet.replies.forEach((reply)=>{
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }


        feedHtml +=`<div class="tweet">
        <div class="tweet-inner"> 
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class ="hidden" id="replies-${tweet.uuid}">
            ${repliesHtml}
            <div class="comment-cont">
                <input type="text" placeholder="reply" id="comment-input">
				<button class="comment-btn" id="comment-btn" data-comment="${tweet.uuid}">reply</button>
			</div>
        </div>  
    </div>`
    })
    return feedHtml
}

const render = () => {
    const feed = document.getElementById('feed')
    feed.innerHTML = getFeedHtml()
}
render()
