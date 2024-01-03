import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({roundNumber}) {
  console.log('calculating advertiser score');
  const player = usePlayer();
  const roundNumberText = 'round' + roundNumber;
  
  //const adQuality = player.get("adQuality");
  const productionQuality = player.get(roundNumberText.concat("_choices"))[0]
  const advertisementQuality = player.get(roundNumberText.concat("_choices"))[1]
  const priceOfProduct = player.get(roundNumberText.concat("_choices"))[2]
  const productionCost = player.get(roundNumberText.concat("_choices"))[3]
  const warrantType = player.get(roundNumberText.concat("_choices"))[4];

  const currentScore = player.get("score") || 0; 
  const choices = player.get(roundNumberText.concat("_choices"));
  const argueChoice = choices ? choices[5] : "not set";


  let imageUrl = "";
  let image2Url = "";
  //console.log('roundNumberText', roundNumberText)
  if (advertisementQuality === "high") {
    imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
  } else if (advertisementQuality === "low") {
    imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
  }

  const numChallengers = player.get("numChallengers") || 0;
  const oldsalesCount = player.get("salesCount") || 0;
  const oldnumBuyers = player.get("numBuyers") || 0;
  const savedCurrentScore = player.get("currentScore") || 0;
  let salesCount = 0;

  let fine = 0; 
  let comp = 0;
  const profit = priceOfProduct - productionCost;

  let newchallengers = Math.round(numChallengers * 0.6);
  if (warrantType === "standard" && productionQuality !== "high"){
    fine = 2 * profit * newchallengers; 
  } else if (warrantType === "premium" && productionQuality !== "high") {
    fine = 3 * profit * newchallengers; 
  }
  if (warrantType === "premium" && productionQuality !== "low") {
    comp = 6 * profit * newchallengers;
  }

  if (argueChoice === "to") {
    image2Url = "/images/argue.png"; 
    salesCount = profit * (oldnumBuyers + (numChallengers-newchallengers)) + comp - fine;
    
  } else if (argueChoice === "not to") {
    image2Url = "/images/admit.png"; 
    salesCount = oldsalesCount;
    newchallengers = numChallengers;
    fine = 0;
    comp = 0;
  }
  
  //let points = 10;
  let points = priceOfProduct

  const min = 10;
  const max = 90;
  
  //  switch (advertisementQuality){
  //    case "high":
  //      switch (priceOfProduct) {case "high": min = 50; break; case "low": min = 70; break;
  //      };
  //    case "low":
  //      switch (priceOfProduct) {case "high": min =10, max=20; break; case "low": min = 50, max = 80; break;}
  //  }

  const finalScore = currentScore + salesCount

  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    player.set("score", finalScore);
  }
  
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1 className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        Sales
      </h1>
      <br/><br/>
      <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
        {/* <p className="text-sm text-gray-500"> */}
        <p>
          You chose to produce a <b>{productionQuality}</b> quality product.
        </p>
        <p>
          You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
        You sold it at a price of <b>${priceOfProduct}</b>.
        <br /> <br />
        </p>

        <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

        
        <p>
          It was advertised to an audience of 100 users, and <b>{oldnumBuyers}</b> users bought your product.
        </p>
        <p> Your choice from last round is: <b>{argueChoice}</b> argue.</p>
        <br />
        <img src={image2Url} alt="Toothpaste Standard" width="250" height="250"/>
        <p>You got <b>{(numChallengers-newchallengers)}</b> challengers changed their mind.</p>
        <p>You got <b>{newchallengers}</b> challengers remained.</p>
        <p>The gives the <b> new fine of ${fine}</b> overall.</p> 
        <p>You got <b> newly compensated by ${comp}</b> overall.</p>
        <p> 
          You earned <b>${priceOfProduct - productionCost}</b>  per product x <b>{oldnumBuyers + (numChallengers-newchallengers)}</b> units sold - fine <b>${fine}</b> + compensation <b>${comp}</b> = <b>{salesCount}</b> points in sales.
        </p><br/>
        <p>You could have earned <b>{oldsalesCount}</b> from last round.</p>
        <p> Your score for this round is: <b>{salesCount} </b></p>
        <p> Your total score is: <b>{salesCount + currentScore}</b> </p><br/><br/>
        <p> 
          Click to proceed to the next round to sell products in this marketplace.
        </p><br /> 
        <Button handleClick={handleSubmit} primary>
        I'm done!
      </Button>
      </div>
    </div>
  );
}