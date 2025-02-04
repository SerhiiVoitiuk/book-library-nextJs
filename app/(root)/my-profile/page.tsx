import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, exists, desc } from "drizzle-orm";

const Page = async () => {
  const latestBook = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  const borrowedBooks = await db
    .select()
    .from(books)
    .where(
      exists(
        db
          .select()
          .from(borrowRecords)
          .where(eq(borrowRecords.bookId, books.id))
      )
    )
    .orderBy(desc(books.createdAt))
    .limit(10);

  return (
    <>
      {/* <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form> */}

      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};
export default Page;
