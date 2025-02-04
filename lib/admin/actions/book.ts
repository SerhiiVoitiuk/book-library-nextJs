"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        coverUrl: params.coverUrl || "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
        videoUrl: params.videoUrl || "234",
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
