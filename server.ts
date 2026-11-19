import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters).').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  subject: z.string().trim().min(3, 'Please provide a brief subject.').max(180),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.').max(4000),
  website: z.string().optional().default(''),
});

// Simple IP rate limiter (5 requests per 15 minutes)
const rateBuckets = new Map<string, number[]>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = (rateBuckets.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (prev.length >= RATE_MAX_REQUESTS) {
    rateBuckets.set(ip, prev);
    return true;
  }
  prev.push(now);
  rateBuckets.set(ip, prev);
  return false;
}

function pdfEscape(text: string): string {
  return text
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '\u2013' || ch === '\u2014') return '-';
      if (ch === '\u2022') return '*';
      return ' ';
    })
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

interface PdfLine {
  text: string;
  size: number;
  bold?: boolean;
  gapAfter?: number;
  indent?: number;
}

function buildResumePdf(): Buffer {
  const lines: PdfLine[] = [
    { text: 'DARSHAN KUMAR J', size: 18, bold: true, gapAfter: 4 },
    { text: 'Python Full-Stack Developer  |  Bengaluru, India', size: 10.5, gapAfter: 3 },
    { text: 'Email: darshuachar4@gmail.com   |   Phone: +91 7090223302', size: 9.5, gapAfter: 12 },

    { text: 'SUMMARY', size: 11.5, bold: true, gapAfter: 4 },
    ...wrapText(
      'Python Full-Stack Developer with 3 years of professional experience building scalable web applications, backend services, responsive interfaces, and database-driven systems across enterprise platforms, e-commerce, healthcare, and data-driven projects.',
      88,
    ).map((t) => ({ text: t, size: 9.5, gapAfter: 2 })),
    { text: '', size: 6, gapAfter: 6 },

    { text: 'PROFESSIONAL EXPERIENCE', size: 11.5, bold: true, gapAfter: 4 },
    { text: 'Analyst — CirrusLabs.io, Bangalore (October 2023 - Present)', size: 10, bold: true, gapAfter: 3 },
    ...[
      'Develop and maintain full-stack applications using Django and PostgreSQL.',
      'Design database schemas supporting business logic and optimize application and database performance.',
      'Develop RESTful APIs and build responsive HTML and CSS interfaces in collaboration with UI/UX designers.',
      'Perform code reviews, conduct testing and debugging, document technical processes, and support deployment.',
      'Collaborate in Agile teams through sprint planning, stand-ups, and retrospectives.',
    ].flatMap((item) =>
      wrapText(`- ${item}`, 84).map((t, idx) => ({
        text: idx === 0 ? t : `  ${t}`,
        size: 9.2,
        indent: 8,
        gapAfter: 2,
      })),
    ),
    { text: '', size: 6, gapAfter: 6 },

    { text: 'FEATURED PROJECTS', size: 11.5, bold: true, gapAfter: 4 },
    { text: 'Skein Scene — E-Commerce & Custom Order Platform (https://skeinscene.in)', size: 9.8, bold: true, gapAfter: 2 },
    ...wrapText(
      'React 19, TypeScript, Node.js, Express, Supabase PostgreSQL, Tailwind CSS v4. Built a 14-route SPA, 35+ REST endpoints, Razorpay HMAC-SHA256 verification, 11-stage custom-order workflow, slot scheduler with anti-double-booking checks, Supabase RLS, 9 SECURITY DEFINER RPCs, scrypt hashing, and HTTP-only signed cookies.',
      85,
    ).map((t) => ({ text: t, size: 9, indent: 8, gapAfter: 2 })),
    { text: '', size: 4, gapAfter: 3 },

    { text: 'IPP - Internal Platforms Portal (Illustrative Enterprise Demo)', size: 9.8, bold: true, gapAfter: 2 },
    ...wrapText(
      'React 19, TypeScript, Express, FastAPI, PostgreSQL 16, Redis, Gemini API, Docker. Built 11 application modules, API marketplace, 5-step producer onboarding, React Flow dependency graphs, 17-table PostgreSQL schema with RLS, 4-role RBAC, HTTP-only JWT cookies, immutable audit logs, and SSE Gemini assistant.',
      85,
    ).map((t) => ({ text: t, size: 9, indent: 8, gapAfter: 2 })),
    { text: '', size: 4, gapAfter: 3 },

    { text: 'Raghan Dental and Implant Care — Clinic & Appointment Platform', size: 9.8, bold: true, gapAfter: 2 },
    ...wrapText(
      'React 19, TypeScript, Express, SQLite, Supabase PostgreSQL, Tailwind CSS v4. Built a 6-step booking flow, IST scheduling engine with atomic SQLite locking, Supabase synchronization with RLS, 29-endpoint REST API, 8-tab admin dashboard, scrypt auth, rate limiting, and honeypot spam protection.',
      85,
    ).map((t) => ({ text: t, size: 9, indent: 8, gapAfter: 2 })),
    { text: '', size: 4, gapAfter: 3 },

    { text: 'Academic & Additional Projects', size: 9.8, bold: true, gapAfter: 2 },
    { text: '- Accident Severity Intelligence System (MCA Research): Association rule mining across accident and injury correlations.', size: 9, indent: 8, gapAfter: 2 },
    { text: '- Integrated Device for Blind, Deaf & Speech-Impaired Individuals (Final Year Academic Project).', size: 9, indent: 8, gapAfter: 2 },
    { text: '- Exercise Tracker (MERN Stack): Tracks distance walked/run, calories consumed, and heartbeat.', size: 9, indent: 8, gapAfter: 6 },

    { text: 'TECHNICAL SKILLS', size: 11.5, bold: true, gapAfter: 4 },
    { text: 'Programming: Python (Basics), R (Basics), TypeScript, JavaScript', size: 9.2, gapAfter: 2 },
    { text: 'Frontend: React, HTML, CSS, Tailwind CSS, Jinja2', size: 9.2, gapAfter: 2 },
    { text: 'Backend & APIs: Django, Node.js, Express, FastAPI, REST APIs', size: 9.2, gapAfter: 2 },
    { text: 'Databases: PostgreSQL, Supabase, SQLite, Redis, Basic SQL Queries', size: 9.2, gapAfter: 2 },
    { text: 'DevOps, Cloud & AI/Data: Docker, AWS (EC2, VPC, EBS, S3), Gemini API, Databricks, Power BI, Excel', size: 9.2, gapAfter: 6 },

    { text: 'EDUCATION & CERTIFICATIONS', size: 11.5, bold: true, gapAfter: 4 },
    { text: 'Master of Computer Applications (MCA) — M S Ramaiah Institute of Technology, Bengaluru (2022-2023) | CGPA: 8.35', size: 9.2, gapAfter: 2 },
    { text: 'Bachelor of Computer Applications (BCA) — SBRR Mahajana First Grade Degree College, Mysuru (2018-2021) | CGPA: 7.49', size: 9.2, gapAfter: 2 },
    { text: 'Certifications: Data Analyst Skillpath: Zero to Hero in Excel, SQL & Python (Udemy, Oct 2024) | MS Power BI Desktop (Udemy, 2025)', size: 9.2, gapAfter: 2 },
  ];

  // Paginate lines across A4 pages (595 x 842 pt)
  const pages: string[] = [];
  let y = 790;
  let stream = '';

  const flushPage = () => {
    if (stream) {
      pages.push(stream);
      stream = '';
    }
    y = 790;
  };

  for (const line of lines) {
    const lineHeight = line.size + (line.gapAfter ?? 3);
    if (y - lineHeight < 52) {
      flushPage();
    }
    if (line.text.length > 0) {
      const fontRef = line.bold ? '/F2' : '/F1';
      const x = 48 + (line.indent ?? 0);
      stream += `BT ${fontRef} ${line.size} Tf 1 0 0 1 ${x} ${y.toFixed(1)} Tm (${pdfEscape(line.text)}) Tj ET\n`;
    }
    y -= lineHeight;
  }
  flushPage();

  // Assemble PDF objects
  const objects: string[] = [];
  // 1: Catalog, 2: Pages, 3: Font Regular, 4: Font Bold
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  const pageObjectIds: number[] = [];
  let nextObjId = 5;
  const pageAndContentObjects: string[] = [];

  for (const pageStream of pages) {
    const pageId = nextObjId++;
    const contentId = nextObjId++;
    pageObjectIds.push(pageId);
    pageAndContentObjects.push(
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`,
    );
    pageAndContentObjects.push(
      `${contentId} 0 obj\n<< /Length ${Buffer.byteLength(pageStream, 'utf8')} >>\nstream\n${pageStream}endstream\nendobj\n`,
    );
  }

  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjectIds.length} >>\nendobj\n`,
  );
  objects.push('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');
  objects.push(...pageAndContentObjects);

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, 'utf8');
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.get('/api/resume.pdf', (_req, res) => {
    const buffer = buildResumePdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Darshan_Kumar_J_Resume.pdf"');
    res.setHeader('Content-Length', String(buffer.length));
    res.send(buffer);
  });

  app.post('/api/contact', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many messages sent recently. Please wait a few minutes or email darshuachar4@gmail.com directly.',
      });
      return;
    }

    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      res.status(400).json({
        ok: false,
        error: firstIssue?.message || 'Please check the form fields and try again.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, subject, message, website } = parsed.data;

    // Honeypot spam protection
    if (website && website.trim().length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Submission flagged by automated spam protection.',
      });
      return;
    }

    const submission = {
      id: `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    };

    try {
      const dataDir = path.join(__dirname, 'data');
      await fs.promises.mkdir(dataDir, { recursive: true });
      const logPath = path.join(dataDir, 'contact-submissions.json');
      let existing: unknown[] = [];
      if (fs.existsSync(logPath)) {
        try {
          const raw = await fs.promises.readFile(logPath, 'utf8');
          const parsedLog = JSON.parse(raw);
          if (Array.isArray(parsedLog)) existing = parsedLog;
        } catch {
          existing = [];
        }
      }
      existing.push(submission);
      await fs.promises.writeFile(logPath, JSON.stringify(existing, null, 2), 'utf8');

      // Optional webhook / email forwarder if configured in environment
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission),
        }).catch(() => undefined);
      }

      res.status(201).json({
        ok: true,
        id: submission.id,
        receivedAt: submission.receivedAt,
        message: 'Your inquiry has been validated and recorded on the server.',
      });
    } catch {
      res.status(500).json({
        ok: false,
        error: 'Unable to record your message right now. Please reach out directly at darshuachar4@gmail.com.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
