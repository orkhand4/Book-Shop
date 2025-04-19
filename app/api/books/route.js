import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";
import { z } from "zod";

const bookSchema = z.object({
  name: z.string().min(3).max(10),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("Invalid URL format"),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req) {
  try {
    console.log("Attempting to add a new book...");
    await connectDB();

    const body = await req.json();
    console.log("Received book data:", body);

    if (
      !body.name ||
      !body.price ||
      !body.imageUrl ||
      !body.description ||
      !body.author ||
      !body.category ||
      !body.stockCount
    ) {
      console.log("Missing fields");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    //check body with zod schema

    const parsedBody = bookSchema.safeParse(body);
    if (!parsedBody.success) {
      console.log("Validation error:", parsedBody.error.errors);
      return NextResponse.json(
        { message: "Validation error", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const newBook = new Book({
      name: body.name,
      price: body.price,
      imageUrl: body.imageUrl,
      description: body.description,
      author: body.author,
      category: body.category,
      stockCount: body.stockCount,
    });

    console.log("Saving new book:", newBook);

    await newBook.save();
    console.log("Book added successfully:", newBook);

    return NextResponse.json(
      { message: "Book successfully added", data: newBook },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error adding book:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const allBooks = await Book.find();
    return NextResponse.json({ data: allBooks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
