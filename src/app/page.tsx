"use client";

import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "./client";
import { CROWDFUNDING_FACTORY } from "./contracts/contracts";
import { useReadContract } from "thirdweb/react";
import { CampaignCard } from "./components/campaigncard";


export default function Home() {
  const contract = getContract({
    client: client,
    chain: defineChain(1320),
    address: CROWDFUNDING_FACTORY
  });

  const { data: campaigns, isPending } = useReadContract({
    contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: []
  });
  console.log(campaigns);

  // const data = await readContract({
  //   contract,
  //   method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
  //   params: []
  // })
  // 

  return (
    <main className="mx-auto max-w-7xl px-4 mt-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-4">Campaigns:</h1>
        <div className="grid grid-cols-3 gap-4">
          {!isPending && campaigns && (
            campaigns.length > 0 ?(
              campaigns.map((campaign)=>(
                <CampaignCard 
                  key={campaign.campaignAddress}
                  campaignAddress={campaign.campaignAddress}
                />
              ))
            ):(
              <p>NO campaign Found</p>
            )
          )}

        </div>
      </div>
    </main>
  );
}
