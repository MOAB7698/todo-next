import { NextRequest, NextResponse } from "next/server";

// اگر USE_MOCK=1 باشد یا NEXT_PUBLIC_BACKEND_URL ست نشده باشد => از Mock استفاده کن
const USE_MOCK = process.env.USE_MOCK === "1";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");
const FALLBACK = "https://jsonplaceholder.typicode.com/todos?_limit=5";

/**
 * Mock Store - داده‌ها در حافظه‌ی سرور Next نگهداری می‌شوند.
 * با ری‌استارت dev از بین می‌روند. برای شروع، با ۵ آیتم Seed می‌کنیم.
 */
type Task = { id: number; title: string; completed: boolean };
let mockReady = false;
let mockTasks: Task[] = [];
let mockLastId = 0;

async function ensureMockSeed() {
  if (mockReady) return;
  try {
    const res = await fetch(FALLBACK, { cache: "no-store" });
    const raw = (await res.json()) as any[];
    mockTasks = raw.map((t) => ({
      id: Number(t.id),
      title: String(t.title),
      completed: Boolean(t.completed),
    }));
    mockLastId = mockTasks.reduce((m, t) => Math.max(m, t.id), 0) || 0;
  } catch {
    // اگر اینترنت/فالس‌بک در دسترس نبود، با چند آیتم دیفالت Seed می‌کنیم
    mockTasks = [
      { id: 1, title: "نمونه ۱", completed: false },
      { id: 2, title: "نمونه ۲", completed: true },
      { id: 3, title: "نمونه ۳", completed: false },
      { id: 4, title: "نمونه ۴", completed: false },
      { id: 5, title: "نمونه ۵", completed: true },
    ];
    mockLastId = 5;
  }
  mockReady = true;
}

export async function GET() {
  try {
    if (!USE_MOCK && BACKEND) {
      const res = await fetch(`${BACKEND}/tasks`, { cache: "no-store" });
      const data = await res.json();
      return NextResponse.json(data);
    }

    // MOCK
    await ensureMockSeed();
    // برای شباهت با بک‌اند، آخرین‌ها اول
    const data = [...mockTasks].sort((a, b) => b.id - a.id);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Task>; // { title, completed? }
    if (!USE_MOCK && BACKEND) {
      const res = await fetch(`${BACKEND}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: body.title, completed: !!body.completed }),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: 201 });
    }

    // MOCK
    await ensureMockSeed();
    const title = String(body.title ?? "").trim();
    if (!title) return NextResponse.json({ error: "title required" }, { status: 400 });
    const newTask: Task = {
      id: ++mockLastId,
      title,
      completed: Boolean(body.completed),
    };
    mockTasks.unshift(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Task> & { id: number };
    if (!USE_MOCK && BACKEND) {
      const res = await fetch(`${BACKEND}/tasks/${body.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: body.title,
          completed: body.completed,
        }),
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    // MOCK
    await ensureMockSeed();
    const id = Number(body.id);
    const idx = mockTasks.findIndex((t) => t.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (typeof body.title === "string") {
      const t = body.title.trim();
      if (t) mockTasks[idx].title = t;
    }
    if (typeof body.completed === "boolean") {
      mockTasks[idx].completed = body.completed;
    }
    return NextResponse.json(mockTasks[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    if (!idParam) return NextResponse.json({ error: "id required" }, { status: 400 });

    if (!USE_MOCK && BACKEND) {
      await fetch(`${BACKEND}/tasks/${idParam}`, { method: "DELETE" });
      return NextResponse.json({ ok: true });
    }

    // MOCK
    await ensureMockSeed();
    const id = Number(idParam);
    const before = mockTasks.length;
    mockTasks = mockTasks.filter((t) => t.id !== id);
    if (mockTasks.length === before) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
