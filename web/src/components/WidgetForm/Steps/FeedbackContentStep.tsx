import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../ScreenShotButton";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenShot, setScreenShot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  const feedbackTypesInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(e:FormEvent){
    e.preventDefault();
    console.log(comment)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypesInfo.image.source}
            alt={feedbackTypesInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypesInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea  
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500  focus:ring-brand-500 focus:ring-1 focus:outline-none  resize-none"
          placeholder="Conte com detalhes o que está acontecendo..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className="flex gap-2 mt-2">
        
          <ScreenShotButton 
            screenShot={screenShot}
            onScreenshotTook={setScreenShot}
          />
          <button 
            type="submit"
            disabled={comment.length === 0} 
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}
