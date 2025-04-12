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
  const body = await req.json();

  //const name = body.name;
  const { id } = body;
  const user = users.find((user) => user.id == id);
  if (!user) {
    return NextResponse.json({ mes: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { mes: "This is POST method (Users)", data: user },
    { status: 200 }
  );
}

export async function DELETE(req) {
  const body = req.json();
  const { id } = body;

  const findUser = users.find((user) => user.id == id);
  if (!findUser) {
    return NextResponse.json({ mes: "User not found by ID" }, { status: 404 });
  }

  const newUsers = users.filter((user) => user.id != id);
  return NextResponse.json(
    { mes: "User deleted by ID", data: newUsers },
    { status: 200 }
  );
}
