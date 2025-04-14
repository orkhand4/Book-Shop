import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

// GET - Bütün kitabları almaq
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

// POST - Yeni kitab əlavə etmək
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    
    if (!body.name || !body.price) {
      return NextResponse.json(
        { message: "Book name and price are required" },
        { status: 400 }
      );
    }

    const newBook = new Book({
      name: body.name,
      price: body.price,
    });

    await newBook.save();

    return NextResponse.json(
      { message: "Book successfully added", data: newBook },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

// DELETE - Kitabı silmək
export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.id) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    const deleteBookById = await Book.findByIdAndDelete(body.id);
    
    if (!deleteBookById) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Book successfully deleted", data: deleteBookById },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
