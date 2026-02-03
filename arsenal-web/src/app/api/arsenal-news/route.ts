import { NextResponse } from "next/server";

type NewsApiArticle = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source?: { name?: string };
};

export const revalidate = 600; // cache 10 นาที

function estimateReadMinutes(text: string) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function timeAgoTH(iso: string) {
  const t = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.max(0, Math.floor((now - t) / 60000));
  if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} ชั่วโมงที่แล้ว`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} วันที่แล้ว`;
}

function pickTag(title: string, desc: string) {
  const s = `${title} ${desc}`.toLowerCase();
  if (s.includes("transfer") || s.includes("สัญญา") || s.includes("ย้ายทีม") || s.includes("ต่อสัญญา")) {
    return { label: "TRANSFER NEWS", tone: "gold" as const };
  }
  if (s.includes("match") || s.includes("report") || s.includes("ผลบอล") || s.includes("พรีวิว") || s.includes("พบกับ")) {
    return { label: "MATCH REPORT", tone: "red" as const };
  }
  return { label: "COMMUNITY", tone: "dark" as const };
}

function isArsenalRelated(title: string, desc: string) {
  // ✅ กรองซ้ำฝั่งเรา กันหลุดแบบข่าวพิราบ
  const s = `${title} ${desc}`.toLowerCase();
  return s.includes("อาร์เซนอล") || s.includes("arsenal");
}

function buildUrlTH(fromISO: string) {
  const url = new URL("https://newsapi.org/v2/everything");

  // ✅ แม่นสุด: บังคับให้คำอยู่ในหัวข้อข่าว
  // ข่าวไทยส่วนใหญ่ใช้ “อาร์เซนอล”
  url.searchParams.set("qInTitle", 'อาร์เซนอล OR "Arsenal" OR "Arsenal FC"');

  url.searchParams.set("language", "th");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", "20");
  url.searchParams.set("from", fromISO);

  // ✅ ลดข่าวหลุดแนวทั่วไป: ค้นเฉพาะ title/description
  url.searchParams.set("searchIn", "title,description");

  return url;
}

function buildUrlEN(fromISO: string) {
  const url = new URL("https://newsapi.org/v2/everything");
  url.searchParams.set("qInTitle", '"Arsenal" OR "Arsenal FC"');
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", "20");
  url.searchParams.set("from", fromISO);
  url.searchParams.set("searchIn", "title,description");
  return url;
}

async function fetchNews(key: string, url: URL) {
  const res = await fetch(url.toString(), {
    headers: { "X-Api-Key": key },
    next: { revalidate },
  });
  const data = await res.json();
  return { res, data, url: url.toString() };
}

function normalize(articles: NewsApiArticle[]) {
  return (articles || [])
    .filter((a) => a?.title && a?.url)
    .map((a) => {
      const title = a.title;
      const description = a.description || "";
      const tag = pickTag(title, description);
      const readMin = estimateReadMinutes(`${title} ${description}`);

      return {
        title,
        description,
        url: a.url,
        image: a.urlToImage,
        publishedAt: a.publishedAt,
        timeAgo: timeAgoTH(a.publishedAt),
        readMin,
        source: a.source?.name || "",
        tag,
      };
    })
    .filter((x) => isArsenalRelated(x.title, x.description)); // ✅ กันหลุดอีกรอบ
}

export async function GET() {
  const key = process.env.NEWSAPI_KEY;
  if (!key) {
    return NextResponse.json({ error: "Missing NEWSAPI_KEY in .env.local" }, { status: 500 });
  }

  // ✅ เอาเฉพาะข่าวใหม่ใน 14 วัน (ช่วยลดข่าวหลุด + ได้ข่าวสด)
  const from = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

  // 1) TH
  const th = await fetchNews(key, buildUrlTH(from));
  if (!th.res.ok) {
    return NextResponse.json(
      { error: th.data?.message || "NewsAPI error", debug: { url: th.url, status: th.res.status, lang: "th" } },
      { status: th.res.status }
    );
  }

  let items = normalize(th.data?.articles || []);
  let usedLang: "th" | "en" = "th";

  // 2) ถ้า TH ว่าง -> fallback ไป EN
  if (items.length === 0) {
    const en = await fetchNews(key, buildUrlEN(from));
    if (!en.res.ok) {
      return NextResponse.json(
        { error: en.data?.message || "NewsAPI error", debug: { url: en.url, status: en.res.status, lang: "en" } },
        { status: en.res.status }
      );
    }
    items = normalize(en.data?.articles || []);
    usedLang = "en";
  }

  return NextResponse.json({
    items,
    debug: {
      usedLang,
      count: items.length,
      from,
      note: usedLang === "th" ? "Using TH qInTitle + filters" : "TH empty; fallback to EN",
    },
  });
}
