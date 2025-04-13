import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/book";

export async function GET(req) {
  try {
    await connectDB();
    const allBooks = await Book.find();
    return NextResponse.json({ data: allBooks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "Internal Server Error", err },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);

    const newBxook = new Book({
      name: body.name,
      price: body.price,
    });

    await newBxook.save();

    return NextResponse.json(
      { mes: "THIS IS GET METOD (Books)" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { mes: "Internal Server Error", err },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const deleteBookById = await Book.findByIdAndDelete(body.id);
    return NextResponse.json({ data: "Deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "Internal Server Error", err },
      { status: 500 }
    );
  }
}