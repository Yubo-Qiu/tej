import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function Tradeoff({roundNumber}) {
    const player = usePlayer();
    const roundNumberText = 'round' + roundNumber;

    const [numBuyers, setNumBuyers] = useState(0);
    const [numChallengers, setNumChallengers] = useState(0);

    const [choiceOfArgue, setChoiceOfArgue] = useState(player.round.get("choiceOfArgue") || "not set");
  
  //const adQuality = player.get("adQuality");
    const choices = player.get(roundNumberText.concat("_choices")) || [];
    const productionQuality = choices[0] || "not set";
    const advertisementQuality = choices[1] || "not set";
    const priceOfProduct = choices[2] || 0;
    const productionCost = choices[3] || 0;
    const warrantType = choices[4] || "not set";
    const argueChoice = choices[5] || "not set";
    const currentScore = player.get("score") || 0; 
  
  useEffect(() => {
    const min = 10;
    const max = 90;
    const calculatedNumBuyers = Math.floor(Math.random() * (max - min) + min);

    let calculatedNumChallengers = 0;
    if (warrantType === "standard") {
      calculatedNumChallengers = Math.round((100 - calculatedNumBuyers) * 0.5);
    } else if (warrantType === "premium") {
      calculatedNumChallengers = Math.round((100 - calculatedNumBuyers) * 0.3);
    }else if (warrantType === "empty") {
        calculatedNumChallengers = 0;
    }

    setNumBuyers(calculatedNumBuyers);
    setNumChallengers(calculatedNumChallengers);
  }, []);

  let imageUrl = "";
  //console.log('roundNumberText', roundNumberText)
  if (advertisementQuality === "high") {
    imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
  } else if (advertisementQuality === "low") {
    imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
  }

  
  let fine = 0; // Default fine is 0
  let comp = 0;
  const profit = priceOfProduct - productionCost;
  
  if (warrantType === "standard" && productionQuality !== "high"){
    fine = 1 * profit * numChallengers; 
  } else if (warrantType === "premium" && productionQuality !== "high") {
    fine = 2 * profit * numChallengers; 
  }
    
  if (warrantType === "premium" && productionQuality !== "low") {
    comp = 5 * profit * numChallengers;
  }
  
  let couldhave = (priceOfProduct - productionCost) * numBuyers;

  let current = numBuyers * (priceOfProduct - productionCost);
  if (fine > 0){
    current = numBuyers * (priceOfProduct - productionCost) - fine; 
  } else if (comp > 0) {
    current = numBuyers * (priceOfProduct - productionCost) + comp; 
  }

  const salesCount = current
  const finalScore = currentScore + salesCount


    function handleSubmit() {
  
        const choices = [
            player.get(roundNumberText.concat("_choices"))[0], // productionQuality
            player.get(roundNumberText.concat("_choices"))[1], // advertisementQuality
            player.get(roundNumberText.concat("_choices"))[2], // priceOfProduct
            player.get(roundNumberText.concat("_choices"))[3], // productionCost
            player.get(roundNumberText.concat("_choices"))[4], // warrantType
            player.round.get("choiceOfArgue") // argueChoice
        ];

        player.set("numChallengers", numChallengers);
        player.set("salesCount", salesCount);
        player.set("numBuyers", numBuyers);
        player.set("currentScore", current);
        player.set(roundNumberText.concat("_choices"), choices);
        player.stage.set("submit", true);//player.stage.submit();
    
    }
  
    return (
        
        <div className="mt-3 sm:mt-5 p-20">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1 className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
          Argue or Admit? 
        </h1><br/><br/>
        <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
          <p>
            You chose to produce a <b>{productionQuality}</b> quality product.<br />
            You chose to advertise it as a <b>{advertisementQuality}</b> quality product. <br/>
            You sold it at a price of <b>${priceOfProduct}</b>. <br />
          </p><br/>
          <p>
          <strong>Note: </strong> skip this step if you chose "No Warrant" in the last step, 
          <br />since you are not challenged when there's no warrants!
          <br/>Just click on any buttons down there, you score will remian the same! 
          </p>
  
          <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>
  
          
          <p>
            It was advertised to an audience of 100 users, and {numBuyers} users bought your product.<br/>
            You have {numChallengers} challengers to you warrants.
          </p><br/>
          <p> 
            You could have earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold = {couldhave} points in sales.<br/>
            The challenges would fine ${fine} in total.
            The challenges would compensate ${comp} in total.
          </p>
          <p> Your potential score for this round is: {current} </p>
          <p><br/>
          <strong>Note: </strong>This is the step where you want to play a bit of psychology and raise the bet possibly.<br/>
            You could choose to accept the fine if want to admit your misinformation about the warrant,<br/>
            or you choose to raise the bet by further arguing.
          </p> 
          <p>
            By further arguing, you raise the fine by 100% of interest per challenge, <br/>
            but it also raises the challenger's possible compensate by 100% of interest per challenge; <br/>
            the challengers would need to reconsider whether they want to further argue with you. 
          </p> <br/>
          <p> If they further <b> argue </b>, we change the rules of warranting, raising the risk for both sides. </p>
          <p> If they <b>quit</b>, they will withdraw their challenge.</p>
          <p>
          <strong>Note: </strong> you can raise so the fish on the hook needs to pay more, <br/> 
          or you could scare them off so you maybe pay less fine.
          </p>
          <p> You could choose to argue or admit about your warrants:</p>
          <p> Choosing <b>argue </b> means you want to make some changes.<br/>
          Choosing <b>admit</b> means you will accept the score for this round.</p>
          <p> 
            Click to proceed to the next round to sell products in this marketplace.
          </p><br/>
          <p>Your current choice is <b>{player.round.get("choiceOfArgue")}</b> argue!</p>
          <div className="flex justify-center space-x-4">
          <ArgueAlternative title="Choose to Argue"  argue="to" imageUrl={"url(/images/argue.png)"} on_button_click={(e) => handleArgueChoice(e, "to")}/>
          <ArgueAlternative title="Choose to Admit"  argue="not to" imageUrl={"url(/images/admit.png)"} on_button_click={(e) => handleArgueChoice(e, "not to")}/>
        </div>
        </div>
        <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
        <br/><br/>
        <Button handleClick={handleSubmit} primary>
            I'm done!
        </Button>
        </div>
        </div>
        
    );

    function handleArgueChoice(e, choiceOfArgue ) {
        player.round.set("choiceOfArgue", choiceOfArgue);
        
        console.log("Saved choiceOfArgue to player.round object: ", choiceOfArgue);
        
    }
}

function ArgueAlternative({ title, imageUrl, argue, on_button_click }) {
    return (
      <div className="h-50 w-50 pb-6">
    
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              imageUrl
              //"url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
          }}
          alt={title}
        />
        <div className="flex">
          <h2>{title}. <br/> </h2>
        </div>
        <Button handleClick={on_button_click} adargue={argue} primary>
          📣 Choose {argue} argue!
        </Button>
      </div>
    );
}

