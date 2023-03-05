import { tweetsData } from "./data.js";

const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value)
    tweetInput.value = ''
})

document.addEventListener('click', (e) => {
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }

})
const handleRetweetClick = (param) => {
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === param
    })[0]
    console.log(targetTweetObj)

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
        targetTweetObj.isRetweeted = false
    }else {
        targetTweetObj.retweets++
        targetTweetObj.isRetweeted = true
    }
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
    </div>`
    })
    return feedHtml
}

const render = () => {
    const feed = document.getElementById('feed')
    feed.innerHTML = getFeedHtml()
}
render()
