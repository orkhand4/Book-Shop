import { NextResponse } from "next/server";

const users = [
  {
    id: 1,
    fullName: "John Doe",
    salary: 50000,
    level: "Senior",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    salary: 60000,
    level: "Junior",
  },
];

export async function GET(req) {
  return NextResponse.json(
    { mes: "This is GET method (Users)", data: users },
    { status: 200 }
  );
}

export async function POST(req) {
  return NextResponse.json({ mes: "This is POST method (Users)" });
}
