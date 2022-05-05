import { prisma } from "../../prisma";

import {
  feedbacksRepository,
  FeedbackCreateProps,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements feedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateProps) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
