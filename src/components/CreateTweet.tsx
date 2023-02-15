import { useState } from "react";
import { trpc } from "../utils/trpc";
import {object, string} from "zod";

export const tweetSchema = object({
    text: string({
        required_error: "Tweet text is required",
    }).min(10).max(280)
})






export function CreateTweet(){
        const [text, setText] = useState("");
        const [error, setError] = useState("");
        const {mutateAsync} = trpc.tweet.create.useMutation()

        function handleSubmit(e) {
            e.preventDefault();

            if(text.length < 10) {
                return 
            }

            mutateAsync({text})

        };



    return(
        <form onSubmit={handleSubmit}>
        
        <textarea 
        onChange={(e)=> setText(e.target.value)}
        
        
        />
        
        <div>
            <button type="submit">Tweet</button>
        </div>



        </form>
    )


}