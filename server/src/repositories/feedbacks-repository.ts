export interface FeedbackCreateProps {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface feedbacksRepository {
  create: (data: FeedbackCreateProps) => Promise<void>;
}
