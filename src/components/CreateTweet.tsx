import { useState } from "react";
import { trpc } from "../utils/trpc";
import { object, string } from "zod";
import { errorUtil } from "zod/lib/helpers/errorUtil";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required",
  })
    .min(10)
    .max(280),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync } = trpc.tweet.create.useMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await tweetSchema.parse({ text });
    } catch (e) {
      setError(e.message);
      return;
    }

    mutateAsync({ text });
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <form onSubmit={handleSubmit} className="mb-4 flex w-full flex-col p-4">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-md border-2 p-4 shadow"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
}
