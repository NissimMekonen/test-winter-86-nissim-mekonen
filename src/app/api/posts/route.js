import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newPost = await Post.create(body);
  return NextResponse.json(newPost);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
