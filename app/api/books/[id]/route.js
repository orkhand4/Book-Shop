import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

// GET - Kitabın id ilə alınması
export async function GET(req, { params }) {
  try {
    const { id } = params; // Burada await istifadə etməyə ehtiyac yoxdur
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

// DELETE - Kitabın id ilə silinməsi
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Burada await istifadə etməyə ehtiyac yoxdur
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
