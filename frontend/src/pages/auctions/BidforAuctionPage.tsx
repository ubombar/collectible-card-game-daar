import { CardPicker } from "@/components/CardPicker";


export const BidforAuctionPage = () => {
    return (
        <CardPicker 
        lastPageMessage={"The seller will see your bid, it is up to them to reject, accept or cancel the auction. You can track the status of your bidding on the details of the auction."}
        lastPageButton={"Finish and Offer Trade"}/>
    );
}