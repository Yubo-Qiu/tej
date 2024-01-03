# SwapneelM take-home assessment

<h3>1. Short Answer (500 words): Discuss how you would plan the feature including any designs, references, links to resources you’ve used to determine the best way to develop such a feature.</h3>
   
Since we are dealing with warrants and the buyers could challenge the warrant with limited information known, the very first idea I got was Texas pokers. Because the buyers would challenge it every round if they are competing with each other (since there is a scoreboard) and there is no costs. I am guessing we need to make them pay a little if they challenge wrong, and we give reward to the producer if they are being honest, and extra reward to the producer if they were honest and still get challenged. I also borrowed the concept of "raise" to the warrant system so that if the producer is being challenged, he or she lied about the advertisment, they could choose to raise the bet so that the challenger would be scared off; or if they were being honest, they could make the reward bigger and make the challenger pay more. The more detailed rules are below:

So at fisrt, at the stage where the producer could choose which ad to use, which price, and which quality, I added a new feature called warrant so that the producer would have to choose whether they want to warrant the product at this step. If you warrant, it would automatically mean that you are warranting that this item you produce has high quality (otherwise it would not make sense if you warrant this item to have a low quality). As long as you produce the product in low quality, no matter what ad or price you use, the challenge would be successful. I set three types of warrants that the producer could use. 

The first type is "no warrant", it would not attract the buyers too much, but the buyers can not challenge you either; so there is only "to buy" or "not to buy" to the buyer.  

The second type is a standard warrant, so you would bet 100% of your profit per product (price - cost) to the buyer, once a buyer challenge you, you then have to be fined 100% of your profit for this one product. As a buyer, you can only choose to be a buyer or a challenger, you can not be both. I think this is fair because as long as you have the same number of people buying your product with the number of people who challenge your product, then you would end up 0. If more people want to buy, you gain; otherwise, you are losing money in this round. But till this step, the challenger would not have to pay anything if they challenge wrong, so the challengers at this step have no costs to their actions. 

The third type is called premium warrant, this is the one that requires the buyer to pay some costs if they bet wrong in case the buyer side is challenging it every round. If the producer lied with premium warrant and got challenged, they will be fine with 2 times the profit per product. If they can profit 10 if they sell one toothpaste, with the above condition, they will be fined by 20 per challenge if they lie. This is clearly unbalanced since the fine is too high. But the challenger also need to compensate the producer if they challenge wrong, the compensation would be 5 times the profit per product (5 times looks a big number, but if a producer is producing with good quality, the profit would be small; moreover, there will not be that many people who would want to challenge a premium warrant).  

Then we move to the next step which is called raise. This is a seperate page from the ad page. This step is a psychology page where you migh play some tricks. As you were charged by the challenged, you are then brought to the court. You can choose to argue at the court or admit at the court. If you argue, the score will be remained as your final score for this round and you will move to the next round. If you choose to argue, we are adding amother 100% of profit per product on both the challenge side and also the producer side (long sentence short, we are raising the bet). SoNow it is the challenger's turn to choose whether they want to insist the challenge or to chicken out. If they chicken out, we will then follow the previous warrant rules on them; as for the ones who raise, we follow this warrant rules which includes the add-on 100%.   

<h3>2. Short Answer (500 words): Discuss why this feature is reflective of a real-world marketplace and what kind of trade-offs you would want to consider to make this feature easy for users to employ.</h3>

I think this is close to the real world market since when you accuse the quality of some products to be low, some producer would admit it fast and pay the fine; but some would bring you to the court and see if it scares you off even if they were wrong. Because most of the time, when it takes too much time to deal with, the challenger would just quit if this is not worth it. That's why we have this raise step for you to raise. Since if you choose to lie on the court, you will be fined with more fee, but on the other hand, the challenger will be rewarded more; if the challenge turned out to be false, it would be false accusation and the producer would want compensation for the reputation reduction. That's why I think this is close to the real market. 

<h3>3. Coding Assessment: Implement the “warrants” feature and open a pull request to our original repository.</h3>

It is implemented in the base-producer-experiment folder.

I have only done the solo game and it works perfectly. The code template already had bugs on the multi-players mode when I got the code, so I did the solo game first. 

<h3>Bonus: We are also looking for suggestions to reorganize the UI to create a simplified layout for the producer ‘Advertisements.jsx’ page. Remember that all the choices a player has to make in the game should be simple to follow so you don’t want to make very complex design choices.</h3>

![image](https://github.com/Yubo-Qiu/tej/assets/112975920/73b4d801-bbc6-4ad0-a7ec-5447bd58781f)

I think if we have big buttons and less words for instructions, it would make the what the user has to do more straighforward. Images could help as well. 

<h3>Bonus: We are also looking for a leaderboard across all producers to show who is making the most and least money in the marketplace. Implement a feature to show a leaderboard across all producers, so in each round a producer can see how the market is doing.</h3>

<h3>Bonus: We would like you to learn about setting up the admin dashboard (typically available at localhost:3000/admin) and the data import, export, so that you can build live experiment tracking. For this task, we would like to be able to export the game setup so that experiments are possible to monitor. You will develop documentation that shares how one might easily (in 2-3 steps) get an analysis of “decision traces” representing the series of decisions over multiple rounds that have been played by a producer in this marketplace. This will require you to build Python-based data analysis notebooks with plots representing visual walkthroughs of user-led choices in the experiment.</h3>

