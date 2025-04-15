import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

export async function GET({ params }) {
  try {
    const { id } = params; 
    await connectDB();
    const findBookById = await Book.findById(id);

    if (!findBookById) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: findBookById }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params; 
    await connectDB();
    const findBookById = await Book.findByIdAndDelete(id);

    if (!findBookById) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Book successfully deleted", data: findBookById },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
