import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const findBookById = await Book.find({ _id: id });
    return NextResponse.json({ data: findBookById }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "Internal Server Error", err },
      { status: 500 }
    );
  }
}
