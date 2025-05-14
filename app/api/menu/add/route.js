import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from "@/lib/prisma";
import * as fs from 'fs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name")?.toString();
    const category = formData.get("category")?.toString();
    const price = parseFloat(formData.get("price")?.toString() || '0');
    const status = formData.get("status")?.toString();
    
    const files = formData.getAll("images");
    
    if (!name || !category || isNaN(price) || !status || files.length === 0) {
      return NextResponse.json(
        { error: "All fields are required and must be valid" }, 
        { status: 400 }
      );
    }
    
    const savedFiles = [];
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created directory: ${uploadDir}`);
      } else {
        console.log(`Directory already exists: ${uploadDir}`);
      }
    } catch (dirError) {
      console.error("Error with directory operations:", dirError);
      return NextResponse.json(
        { error: `Directory error: ${dirError.message}` }, 
        { status: 500 }
      );
    }
    
    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const timestamp = Date.now() + Math.floor(Math.random() * 1000);
        const ext = file.name.split('.').pop();
        const filename = `${name.replace(/\s+/g, '-')}-${timestamp}.${ext}`;
        
        const path = join(uploadDir, filename);
        await writeFile(path, buffer);
        savedFiles.push(`/uploads/${filename}`);
        console.log(`Saved file to: ${path}`);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
      }
    }
    
    if (savedFiles.length === 0) {
      return NextResponse.json(
        { error: "Failed to save any of the uploaded files" }, 
        { status: 500 }
      );
    }
    
    try {
      const newMenuItem = await prisma.menuItem.create({
        data: {
          name,
          price,
          status,
          category,
          imageUrl: JSON.stringify(savedFiles),
        },
      });
      
      return NextResponse.json({
        ...newMenuItem,
        imageUrls: savedFiles,
      }, { status: 201 });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` }, 
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Error adding menu item:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` }, 
      { status: 500 }
    );
  }
}
