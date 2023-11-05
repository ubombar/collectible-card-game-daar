import { CardPicker } from "@/components/CardPicker";


export const CreateAuctionPage = () => {
    return (
        <CardPicker 
        lastPageMessage={"People will see your trade offer in the auctions page, they will bid their offer. It is up to you to reject, accept or cancel their offers."}
        lastPageButton={"Finish and Create Auction"}/>
    );
}