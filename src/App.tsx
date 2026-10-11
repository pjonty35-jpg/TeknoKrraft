import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, PointerEvent, ReactNode } from "react";
import { eventStart, faqs, overlaps, sessions, speakers, tracks } from "./data";
import type { Session } from "./data";
import { createCalendar } from "./calendar";
import { useMotion } from "./useMotion";

type Modal =
  | { type: "track"; id: string }
  | { type: "register" }
  | { type: "venue" | "rules" | "conduct" | "contact" | "sponsor" }
  | null;
function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Storage is optional. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

function Icon({
  name,
  size = 18,
}: {
  name:
    | "arrow"
    | "plus"
    | "minus"
    | "close"
    | "search"
    | "calendar"
    | "check"
    | "menu"
    | "pin"
    | "clock"
    | "download";
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#top"
      aria-label="Tekno Krraft home"
    >
      <svg viewBox="0 0 45 32" width="36" height="26" aria-hidden="true">
        <path d="m17 5-11 9" stroke="#ea4335" />
        <path d="m6 14 11 9" stroke="#4285f4" />
        <path d="m28 5 11 9" stroke="#34a853" />
        <path d="m39 14-11 9" stroke="#fbbc05" />
      </svg>
      <span>GDG ITER</span>
    </a>
  );
}
function Sculpture({
  compact = false,
  variant = 0,
}: {
  compact?: boolean;
  variant?: number;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      className={`sculpture ${compact ? "compact" : ""}`}
      viewBox="0 0 620 620"
      role="img"
      aria-label="Blue and silver folded geometric sculpture"
    >
      <defs>
        <linearGradient id={`${uid}blue`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#67c5ff" />
          <stop offset=".45" stopColor="#0878ff" />
          <stop offset="1" stopColor="#00214c" />
        </linearGradient>
        <linearGradient id={`${uid}silver`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#fffef5" />
          <stop offset=".48" stopColor="#b6c2c9" />
          <stop offset="1" stopColor="#25333e" />
        </linearGradient>
        <linearGradient id={`${uid}deep`}>
          <stop stopColor="#001021" />
          <stop offset="1" stopColor="#1267b6" />
        </linearGradient>
        <filter
          id={`${uid}shadow`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feDropShadow
            dx="-8"
            dy="18"
            stdDeviation="11"
            floodColor="#000"
            floodOpacity=".35"
          />
        </filter>
        <pattern
          id={`${uid}grid`}
          width="45"
          height="45"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M45 0H0v45"
            stroke="#74afff"
            strokeWidth=".55"
            fill="none"
            opacity=".18"
          />
        </pattern>
      </defs>
      <g
        transform={
          compact
            ? `translate(80 45) scale(.78) rotate(${variant % 2 ? -8 : 0} 310 310)`
            : "translate(0 0)"
        }
      >
        {!compact && (
          <>
            <rect
              x="40"
              y="0"
              width="550"
              height="620"
              fill={`url(#${uid}grid)`}
            />
            <g fill="none" stroke="#228bea" strokeWidth=".7" opacity=".65">
              <path d="m35 360 275-310 275 220-255 302Z M75 130l470 325M310 50v522M35 360l550-90M140 36v530M478 78v480" />
              <path d="m75 130 235 135 235-140v330L310 572 75 430Z" />
            </g>
            <g fill="#9dc6e9">
              {Array.from({ length: 9 }, (_, i) => (
                <circle
                  key={i}
                  cx={70 + (i % 3) * 210}
                  cy={100 + Math.floor(i / 3) * 200}
                  r="1.8"
                />
              ))}
            </g>
          </>
        )}
        <g
          filter={`url(#${uid}shadow)`}
          stroke="#85caff"
          strokeWidth=".65"
          strokeLinejoin="round"
        >
          <path d="m305 58 142 83-142 82Z" fill={`url(#${uid}blue)`} />
          <path d="m447 141-142 82 142 82Z" fill={`url(#${uid}deep)`} />
          <path d="m163 141 142 82-142 82Z" fill={`url(#${uid}silver)`} />
          <path d="m163 141 0-82 142 164Z" fill={`url(#${uid}silver)`} />
          <path d="m305 223 142 82-142 82Z" fill={`url(#${uid}blue)`} />
          <path d="m305 223-142 82 142 82Z" fill={`url(#${uid}silver)`} />
          <path d="m163 305 142 82-142 82Z" fill={`url(#${uid}blue)`} />
          <path d="m163 305-89 51 89 52Z" fill={`url(#${uid}blue)`} />
          <path d="m305 387 142 82-142 82Z" fill={`url(#${uid}silver)`} />
          <path d="m305 387-142 82 142 82Z" fill={`url(#${uid}deep)`} />
          <path d="m447 305 88 51-88 52Z" fill={`url(#${uid}silver)`} />
          <path d="m447 141 88 51-88 51Z" fill={`url(#${uid}blue)`} />
          <path d="m163 469 142 82-142-4Z" fill={`url(#${uid}blue)`} />
          <path d="m305 551 0-164 89 164Z" fill={`url(#${uid}silver)`} />
          <path d="m447 305 0 164-142-82Z" fill={`url(#${uid}silver)`} />
        </g>
      </g>
    </svg>
  );
}
function TrackIllustration({ variant }: { variant: number }) {
  const id = useId().replace(/:/g, "");
  const cubes = [
    [
      [78, 22, 1],
      [106, 39, 0],
      [50, 72, 1],
      [78, 89, 0],
      [106, 106, 1],
      [78, 140, 0],
    ],
    [
      [55, 18, 1],
      [83, 35, 1],
      [111, 52, 0],
      [55, 86, 0],
      [83, 103, 0],
      [111, 120, 0],
    ],
    [
      [44, 60, 1],
      [44, 94, 0],
      [72, 128, 1],
      [100, 145, 1],
    ],
    [
      [69, 7, 1],
      [69, 41, 1],
      [41, 92, 1],
      [69, 109, 0],
      [97, 126, 0],
      [69, 143, 1],
    ],
  ][variant];
  return (
    <svg
      className="sculpture compact"
      viewBox="0 0 200 200"
      role="img"
      aria-label={
        [
          "AI geometric building blocks",
          "Cloud architecture cubes",
          "Mobile device and geometric blocks",
          "DevOps geometric tower",
        ][variant]
      }
    >
      <defs>
        <linearGradient id={`${id}b`} x1="0" x2="1" y2="1">
          <stop stopColor="#51b4ff" />
          <stop offset="1" stopColor="#0056e4" />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" x2="1" y2="1">
          <stop stopColor="#fffef7" />
          <stop offset="1" stopColor="#a3b3bc" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#587991" strokeWidth=".6">
        <path d="m27 79 70-42 70 42v81l-70 40-70-40Z M97 37v163M27 79l70 41 70-41M27 160l70-40 70 40" />
      </g>
      {variant === 2 && (
        <g stroke="#6d8a9c" strokeWidth="1">
          <path d="m72 12 55 32v99l-55-32Z" fill="#192832" />
          <path d="m77 22 43 25v79l-43-25Z" fill="#06131e" />
          <path d="m72 12 9-4 55 32-9 4v99l9-4V40" fill="#b3c5d2" />
          <path d="m91 112 15 9" />
        </g>
      )}
      {cubes.map(([x, y, blue], i) => (
        <g key={i} stroke="#67869e" strokeWidth=".6">
          <path
            d={`m${x} ${y} 28 16-28 16-28-16Z`}
            fill={blue ? `url(#${id}b)` : `url(#${id}s)`}
          />
          <path
            d={`m${x - 28} ${y + 16} 28 16v34l-28-16Z`}
            fill={blue ? "#0b68eb" : "#d6dde0"}
          />
          <path
            d={`m${x} ${y + 32} 28-16v34l-28 16Z`}
            fill={blue ? "#003da8" : "#6e8596"}
          />
        </g>
      ))}
    </svg>
  );
}
function tilt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty(
    "--rx",
    `${(-(e.clientY - rect.top - rect.height / 2) / rect.height) * 5}deg`,
  );
  e.currentTarget.style.setProperty(
    "--ry",
    `${((e.clientX - rect.left - rect.width / 2) / rect.width) * 5}deg`,
  );
}
function resetTilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}
function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const seconds = Math.max(
    0,
    Math.floor((new Date(eventStart).getTime() - now) / 1000),
  );
  const values = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
  return (
    <div className="countdown">
      <p className="eyebrow">
        {seconds > 0 ? "THE COUNTDOWN IS ON" : "LET THE IDEAS BEGIN"}
      </p>
      <div
        className="countdown-grid"
        role="timer"
        aria-label={
          seconds > 0
            ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes until October 16, 9 AM India time`
            : "The event start time has arrived"
        }
      >
        {values.map((value, i) => (
          <div className="count-unit" key={i}>
            <div className="count-face">
              <span key={value}>{String(value).padStart(2, "0")}</span>
            </div>
            <span className="count-label">
              {["DAYS", "HOURS", "MINUTES", "SECONDS"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function toCalendar(selected: Session[]) {
  const content = createCalendar(selected);
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "tekno-krraft-my-agenda.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function App() {
  const [motionPaused, setMotionPaused] = useState(false);
  useMotion(motionPaused);
  const [day, setDay] = useState(1),
    [category, setCategory] = useState("All"),
    [search, setSearch] = useState(""),
    [trackFilter, setTrackFilter] = useState("all");
  const [saved, setSaved] = useStored<string[]>("tk26-agenda", []),
    [checked, setChecked] = useStored<string[]>("tk26-readiness", []);
  const [expanded, setExpanded] = useState<string | null>(null),
    [modal, setModal] = useState<Modal>(null),
    [menu, setMenu] = useState(false),
    [notice, setNotice] = useState("");
  const [faq, setFaq] = useState<number | null>(3),
    [participation, setParticipation] = useState("solo"),
    [registrationComplete, setRegistrationComplete] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    readStored("tk26-registration", {}),
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = sessions
    .filter((s) => saved.includes(s.id))
    .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
  const requirements = [
    ...new Set([
      "Laptop and charger",
      "Student ID",
      ...selected.flatMap((s) => s.requirements),
    ]),
  ];
  const ready = requirements.filter((r) => checked.includes(r)).length;
  const filtered = sessions.filter(
    (s) =>
      s.day === day &&
      (category === "All" || s.category === category) &&
      (trackFilter === "all" || s.track === trackFilter) &&
      (s.title + " " + s.speaker + " " + s.venue)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const conflictIds = new Set(
    selected
      .filter((a) => selected.some((b) => a.id !== b.id && overlaps(a, b)))
      .map((s) => s.id),
  );
  const activeTrack =
    modal?.type === "track" ? tracks.find((t) => t.id === modal.id) : undefined;
  const isHack = selected.some((s) => s.category === "Hackathon");
  useEffect(() => {
    if (modal) {
      dialog.current?.showModal();
      document.body.classList.add("dialog-open");
    } else {
      dialog.current?.close();
      document.body.classList.remove("dialog-open");
    }
    return () => document.body.classList.remove("dialog-open");
  }, [modal]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(t);
  }, [notice]);
  function toggleSession(id: string) {
    const s = sessions.find((s) => s.id === id)!;
    const remove = saved.includes(id);
    setSaved((prev) => (remove ? prev.filter((v) => v !== id) : [...prev, id]));
    setNotice(
      remove
        ? `${s.short} removed from your plan`
        : `${s.short} added to your plan`,
    );
  }
  function openRegister() {
    setRegistrationComplete(false);
    setModal({ type: "register" });
  }
  function showSpeaker(name: string) {
    setSearch(name);
    setCategory("All");
    setTrackFilter("all");
    const first = sessions.find((s) => s.speaker === name);
    if (first) setDay(first.day);
    document
      .getElementById("programme")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  function chooseTrack(id: string) {
    setTrackFilter(id);
    setSearch("");
    setCategory("All");
    const first = sessions.find((s) => s.track === id);
    if (first) setDay(first.day);
    setModal(null);
    document
      .getElementById("programme")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>;
    setDraft(data);
    try {
      localStorage.setItem("tk26-registration", JSON.stringify(data));
    } catch {
      /* The review works without storage. */
    }
    setRegistrationComplete(true);
  }
  return (
    <>
      <a className="skip-link" href="#programme">
        Skip to programme
      </a>
      <header className="header">
        <div className="container header-inner">
          <Brand />
          <nav
            className={menu ? "nav is-open" : "nav"}
            aria-label="Main navigation"
          >
            {[
              ["About", "about"],
              ["Programme", "programme"],
              ["Tracks", "tracks"],
              ["Speakers", "speakers"],
              ["Sponsors", "sponsors"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <button className="button small" onClick={openRegister}>
            Register
          </button>
          <button
            className="menu-toggle icon-button"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <main id="top">
        <section className="hero dark">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow event-date">16 TO 18 OCTOBER 2026</p>
              <h1>
                TEKNO
                <br />
                <span className="hero-title-line">
                  KRRAFT <em>2026</em>
                </span>
              </h1>
              <p className="hero-subtitle">
                Three days of code, cloud, AI and ideas.
              </p>
              <p className="hero-location">ITER Campus · Bhubaneswar</p>
              <div className="hero-actions">
                <a className="button" href="#programme">
                  Explore programme
                </a>
                <button className="button outline" onClick={openRegister}>
                  Register for events
                  <Icon name="arrow" size={16} />
                </button>
              </div>
              <Countdown />
              <button
                className="motion-control"
                aria-pressed={motionPaused}
                onClick={() => setMotionPaused(!motionPaused)}
              >
                <span aria-hidden="true" />
                {motionPaused
                  ? "Resume ambient motion"
                  : "Pause ambient motion"}
              </button>
            </div>
            <div
              className="hero-art spatial"
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
            >
              <div className="render-scene geometric-hero">
                <div className="orbital-scene" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  {[0, 1, 2].map((i) => (
                    <div className={`satellite satellite-${i}`} key={i}>
                      <div className="cube">
                        {Array.from({ length: 6 }, (_, face) => (
                          <i key={face} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Sculpture />
              </div>
              <div className="art-caption">
                CODE
                <br />
                PEOPLE
                <br />
                IDEAS
                <br />A BRIGHTER
                <br />
                TOMORROW
              </div>
              <span className="art-coordinate">ITER / BHUBANESWAR</span>
            </div>
          </div>
          <div className="hero-edge" aria-hidden="true">
            <span>01 / EXPLORE</span>
            <span>BUILT BY A COMMUNITY. OPEN TO CURIOSITY.</span>
            <span>SCROLL TO DISCOVER ↓</span>
          </div>
        </section>
        <section id="about" className="section ivory overview">
          <div className="container">
            <div className="section-heading overview-heading">
              <div>
                <p className="eyebrow">ABOUT TEKNO KRRAFT</p>
                <h2>Built for curious minds.</h2>
              </div>
              <span className="subject-line">
                AI / CLOUD / WEB / MOBILE / OPEN SOURCE
              </span>
            </div>
            <div className="overview-grid">
              {[
                [
                  "Hands-on bootcamps",
                  "Learn by building with expert-led workshops on real-world technologies.",
                ],
                [
                  "24-hour hack sprint",
                  "Collaborative prototyping, problem solving and building ideas that matter.",
                ],
                [
                  "People worth meeting",
                  "Developer conversations, new perspectives and a welcoming community.",
                ],
              ].map(([title, text], i) => (
                <article key={title}>
                  <div className={`overview-mark mark-${i}`} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="programme" className="section dark programme">
          <div className="container">
            <div className="section-heading programme-heading">
              <div>
                <p className="eyebrow">MAIN PROGRAMME</p>
                <h2>Make these three days yours.</h2>
              </div>
              <label className="search">
                <Icon name="search" />
                <input
                  aria-label="Search sessions or speakers"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sessions or speakers"
                />
                {search && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setSearch("")}
                  >
                    <Icon name="close" size={14} />
                  </button>
                )}
              </label>
            </div>
            <div className="programme-controls">
              <div
                className="day-tabs"
                role="tablist"
                aria-label="Festival day"
              >
                {[1, 2, 3].map((d) => (
                  <button
                    key={d}
                    role="tab"
                    id={`day-tab-${d}`}
                    tabIndex={day === d ? 0 : -1}
                    onKeyDown={(e) => {
                      if (
                        ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                          e.key,
                        )
                      ) {
                        e.preventDefault();
                        const next =
                          e.key === "Home"
                            ? 1
                            : e.key === "End"
                              ? 3
                              : ((d - 1 + (e.key === "ArrowRight" ? 1 : 2)) %
                                  3) +
                                1;
                        setDay(next);
                        setExpanded(null);
                        document.getElementById(`day-tab-${next}`)?.focus();
                      }
                    }}
                    aria-selected={day === d}
                    aria-controls="session-list"
                    className={day === d ? "active" : ""}
                    onClick={() => {
                      setDay(d);
                      setExpanded(null);
                    }}
                  >
                    Day 0{d}
                    <span> · {15 + d} Oct</span>
                  </button>
                ))}
              </div>
              <div className="category-tabs" aria-label="Filter session type">
                {[
                  ["All", "All"],
                  ["Workshop", "Workshops"],
                  ["Talk", "Talks"],
                  ["Hackathon", "Hack sprint"],
                  ["Competition", "Competition"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    aria-pressed={category === value}
                    className={category === value ? "active" : ""}
                    onClick={() => setCategory(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {trackFilter !== "all" && (
              <div className="filter-status">
                Showing {tracks.find((t) => t.id === trackFilter)?.title}
                <button onClick={() => setTrackFilter("all")}>
                  Clear track filter <Icon name="close" size={13} />
                </button>
              </div>
            )}
            <div className="programme-layout">
              <div
                className="session-table"
                id="session-list"
                role="tabpanel"
                aria-labelledby={`day-tab-${day}`}
              >
                <div className="table-head" aria-hidden="true">
                  <span>TIME</span>
                  <span>SESSION</span>
                  <span>LEVEL</span>
                  <span>ROOM</span>
                  <span>ACTION</span>
                </div>
                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <h3>No sessions match this view.</h3>
                    <p>Try another day or clear your filters.</p>
                    <button
                      className="text-link"
                      onClick={() => {
                        setSearch("");
                        setCategory("All");
                        setTrackFilter("all");
                      }}
                    >
                      Reset filters <Icon name="arrow" />
                    </button>
                  </div>
                ) : (
                  filtered.map((s) => (
                    <article
                      className={`session ${saved.includes(s.id) ? "saved" : ""} ${expanded === s.id ? "expanded" : ""}`}
                      key={s.id}
                    >
                      <div className="session-row">
                        <time className="session-time">
                          {s.start}
                          <small>{s.end}</small>
                        </time>
                        <div className="session-name">
                          <h3>{s.short}</h3>
                          <span>{s.category}</span>
                          <span className="mobile-session-meta">
                            {s.level} · {s.venue}
                          </span>
                        </div>
                        <span className="session-level">{s.level}</span>
                        <span className="session-room">{s.venue}</span>
                        <div className="session-actions">
                          <button
                            className="details-link"
                            aria-expanded={expanded === s.id}
                            aria-controls={`detail-${s.id}`}
                            onClick={() =>
                              setExpanded(expanded === s.id ? null : s.id)
                            }
                          >
                            Details
                          </button>
                          <button
                            className="save-button icon-button"
                            aria-label={`${saved.includes(s.id) ? "Remove" : "Add"} ${s.short} ${saved.includes(s.id) ? "from" : "to"} your plan`}
                            aria-pressed={saved.includes(s.id)}
                            onClick={() => toggleSession(s.id)}
                          >
                            <Icon
                              name={saved.includes(s.id) ? "minus" : "plus"}
                              size={16}
                            />
                          </button>
                        </div>
                      </div>
                      {expanded === s.id && (
                        <div id={`detail-${s.id}`} className="session-detail">
                          <p>{s.description}</p>
                          <div className="detail-meta">
                            <span>{s.speaker}</span>
                            <span>
                              <Icon name="clock" size={13} />
                              {s.start} to {s.end} IST
                            </span>
                          </div>
                          {s.requirements.length > 0 && (
                            <p className="prerequisites">
                              <strong>Before you come:</strong>{" "}
                              {s.requirements.join(" · ")}
                            </p>
                          )}
                          <button
                            className="text-link"
                            onClick={() => {
                              if (!saved.includes(s.id))
                                setSaved((prev) => [...prev, s.id]);
                              openRegister();
                            }}
                          >
                            Register for this session{" "}
                            <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      )}
                    </article>
                  ))
                )}
              </div>
              <aside className="agenda clay" id="my-plan">
                <div className="agenda-title">
                  <h3>Your event plan</h3>
                  <Icon name="calendar" size={18} />
                </div>
                <p className="agenda-count">
                  {selected.length} session{selected.length !== 1 ? "s" : ""}{" "}
                  saved
                </p>
                {selected.length === 0 ? (
                  <div className="agenda-empty">
                    <span className="agenda-empty-symbol">+</span>
                    <p>
                      A little curiosity.
                      <br />A plan of your own.
                    </p>
                    <small>
                      Add sessions with the + button to build your three days.
                    </small>
                  </div>
                ) : (
                  <div className="agenda-list">
                    {selected.map((s) => (
                      <div
                        className={`agenda-item ${conflictIds.has(s.id) ? "conflict" : ""}`}
                        key={s.id}
                      >
                        <div>
                          <h4>{s.short}</h4>
                          <p>
                            {15 + s.day} Oct · {s.start}
                            <br />
                            {s.venue}
                          </p>
                          {conflictIds.has(s.id) && (
                            <span className="conflict-label">
                              Overlaps another saved session
                            </span>
                          )}
                        </div>
                        <button
                          aria-label={`Remove ${s.short} from plan`}
                          onClick={() => toggleSession(s.id)}
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="button calendar-button"
                  disabled={!selected.length}
                  onClick={() => {
                    toCalendar(selected);
                    setNotice("Your calendar file is ready");
                  }}
                >
                  Export calendar <Icon name="download" size={15} />
                </button>
                {selected.length > 0 && (
                  <a href="#get-ready" className="agenda-ready-link">
                    Check your preparation <Icon name="arrow" size={14} />
                  </a>
                )}
              </aside>
            </div>
            <p className="programme-footnote">
              All times are in India Standard Time (UTC +5:30). Choose the
              sessions that work for you.
            </p>
          </div>
        </section>
        <section id="tracks" className="section ivory tracks">
          <div className="container">
            <p className="eyebrow">TRACKS & SYLLABUS</p>
            <h2>Choose your next skill.</h2>
            <div className="track-grid">
              {tracks.map((t, i) => (
                <article
                  className="track-card clay spatial"
                  key={t.id}
                  onPointerMove={tilt}
                  onPointerLeave={resetTilt}
                >
                  <div className="track-art">
                    <TrackIllustration variant={i} />
                    <span className="track-index">0{i + 1}</span>
                  </div>
                  <div className="track-copy">
                    <h3>{t.title}</h3>
                    <span className="level-tag">{t.level}</span>
                    <p>{t.description}</p>
                    <p className="track-prerequisite">
                      <strong>Prerequisite:</strong> {t.prerequisite}
                    </p>
                    <div className="track-actions">
                      <button
                        className="text-link"
                        onClick={() => setModal({ type: "track", id: t.id })}
                      >
                        View syllabus <Icon name="arrow" size={15} />
                      </button>
                      <button
                        className="button small"
                        onClick={() => chooseTrack(t.id)}
                      >
                        Select track
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div id="get-ready" className="readiness-venue">
              <div className="readiness">
                <p className="eyebrow">GET READY</p>
                <h2>Arrive ready to build.</h2>
                <div className="readiness-body">
                  <div className="checklist">
                    {requirements.map((r) => (
                      <label key={r}>
                        <input
                          type="checkbox"
                          checked={checked.includes(r)}
                          onChange={() =>
                            setChecked((prev) =>
                              prev.includes(r)
                                ? prev.filter((v) => v !== r)
                                : [...prev, r],
                            )
                          }
                        />
                        <span className="checkbox-visual">
                          <Icon name="check" size={12} />
                        </span>
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                  <div className="readiness-progress">
                    <strong>
                      {ready} of {requirements.length} ready
                    </strong>
                    <progress
                      value={ready}
                      max={requirements.length}
                      aria-label="Preparation completed"
                    />
                    <span>
                      {selected.length
                        ? "Tailored to your event plan"
                        : "Add sessions for a personal checklist"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="venue">
                <div>
                  <p className="eyebrow">VENUE</p>
                  <h2>See you at ITER.</h2>
                  <p>Khandagiri, Bhubaneswar</p>
                  <button
                    className="text-link"
                    onClick={() => setModal({ type: "venue" })}
                  >
                    View venue details <Icon name="arrow" size={15} />
                  </button>
                </div>
                <svg
                  className="campus-art"
                  viewBox="0 0 300 170"
                  aria-label="Illustration of a contemporary campus building"
                  role="img"
                >
                  <circle cx="190" cy="75" r="65" fill="#d0e4ff" />
                  <g stroke="#364755" strokeWidth="1.2" fill="#fbfaf4">
                    <path d="M45 155h230M100 155V58l80 20v77M100 58l10-7 80 20v84M180 78l10-7M110 62v93M118 66v89M129 69v86M140 72v83M153 76v79M166 80v75M189 89h51v66M200 95v51h9V95zM219 95v51h9V95zM62 118h37v37M68 123v8h8v-8zM83 123v8h8v-8zM68 138v8h8v-8zM83 138v8h8v-8z" />
                    <path d="M253 155v-40m0 15c-23-4-27-24-12-25-9-12 9-22 13-8 15-12 28 7 13 16 21 6 6 24-14 17M44 154v-23m0 12c-17-2-21-15-9-16-5-10 7-14 10-7 12-8 19 5 10 11 11 3 4 12-11 12" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section id="speakers" className="section dark speakers">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SPEAKERS & MENTORS</p>
                <h2>Meet the people behind the ideas.</h2>
              </div>
              <p className="heading-note">
                Four distinct perspectives
                <br />
                across technology and beyond.
              </p>
            </div>
            <div className="speaker-grid">
              {speakers.map((s) => (
                <article key={s.name} className="speaker">
                  <div className={`speaker-art ${s.colour}`} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{s.initials}</span>
                  </div>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.field}</p>
                    <button
                      className="text-link"
                      onClick={() => showSpeaker(s.name)}
                    >
                      View sessions <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="sponsors" className="section ivory sponsors">
          <div className="container">
            <p className="eyebrow">SPONSORS & ECOSYSTEM</p>
            <h2>Sponsors & ecosystem</h2>
            <div className="sponsor-row">
              <a
                href="https://cloud.google.com/"
                target="_blank"
                rel="noreferrer"
                className="sponsor-logo cloud"
              >
                <svg viewBox="0 0 36 30" aria-hidden="true">
                  <path d="M9 23a8 8 0 0 1-3-14" stroke="#4285f4" />
                  <path d="M6 9a12 12 0 0 1 21-3" stroke="#ea4335" />
                  <path d="M27 6a8 8 0 0 1 2 17" stroke="#fbbc05" />
                  <path d="M29 23H9" stroke="#34a853" />
                </svg>
                <span>Google Cloud</span>
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="sponsor-logo github"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.59 9.59 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.41.1 2.66.65.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://firebase.google.com/"
                target="_blank"
                rel="noreferrer"
                className="sponsor-logo firebase"
              >
                <svg viewBox="0 0 30 36" aria-hidden="true">
                  <path d="m3 28 5-27 8 15 4-9 8 22-14 7Z" fill="#ffcb2b" />
                  <path d="m3 28 13-12-8-15Z" fill="#ffa000" />
                  <path d="m3 28 25 1-14 7Z" fill="#f57c00" />
                </svg>
                <span>Firebase</span>
              </a>
              <a
                href="https://www.postman.com/"
                target="_blank"
                rel="noreferrer"
                className="sponsor-logo"
              >
                <span className="postman-symbol" aria-hidden="true">
                  ↗
                </span>
                <span>Postman</span>
              </a>
              <a
                href="https://www.jetbrains.com/"
                target="_blank"
                rel="noreferrer"
                className="sponsor-logo"
              >
                <span className="jetbrains-symbol" aria-hidden="true">
                  JB
                </span>
                <span>JetBrains</span>
              </a>
              <button
                className="button outline sponsor-button"
                onClick={() => setModal({ type: "sponsor" })}
              >
                Become a sponsor
              </button>
            </div>
          </div>
        </section>
        <section id="faq" className="section ivory faq">
          <div className="container faq-layout">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2>
                A few things
                <br /> before you come.
              </h2>
              <p className="faq-contact">
                Have another question?
                <br />
                <button
                  className="text-link"
                  onClick={() => setModal({ type: "contact" })}
                >
                  Get in touch <Icon name="arrow" size={15} />
                </button>
              </p>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <div className={`faq-item ${faq === i ? "open" : ""}`} key={q}>
                  <h3>
                    <button
                      aria-expanded={faq === i}
                      aria-controls={`faq-${i}`}
                      onClick={() => setFaq(faq === i ? null : i)}
                    >
                      {q}
                      <Icon name={faq === i ? "minus" : "plus"} size={16} />
                    </button>
                  </h3>
                  {faq === i && (
                    <div id={`faq-${i}`}>
                      <p>{a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="container final-inner">
            <div>
              <p className="eyebrow">READY TO BE A PART OF IT?</p>
              <h2>
                Bring your curiosity.
                <br />
                Build something.
              </h2>
            </div>
            <div className="final-actions">
              <button className="button white" onClick={openRegister}>
                Register for Tekno Krraft <Icon name="arrow" size={17} />
              </button>
              <a className="button outline" href="#my-plan">
                Review your event plan
              </a>
            </div>
          </div>
          <div className="cta-wireframe" aria-hidden="true" />
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <a href="#top" className="footer-wordmark">
            TEKNO KRRAFT 2026<span>GDG ITER Chapter</span>
          </a>
          <div className="footer-links">
            <button onClick={() => setModal({ type: "conduct" })}>
              Code of conduct
            </button>
            <button onClick={() => setModal({ type: "rules" })}>
              Event rules
            </button>
            <button onClick={() => setModal({ type: "contact" })}>
              Contact
            </button>
          </div>
          <span className="copyright">© 2026 GDG ITER Chapter</span>
        </div>
      </footer>
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Icon name="check" size={16} />
            {notice}
          </>
        )}
      </div>
      <dialog
        ref={dialog}
        className="modal"
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setModal(null);
        }}
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close icon-button"
          aria-label="Close dialog"
          onClick={() => setModal(null)}
        >
          <Icon name="close" />
        </button>
        {activeTrack && (
          <>
            <p className="eyebrow">
              TRACK 0{tracks.indexOf(activeTrack) + 1} / {activeTrack.level}
            </p>
            <h2 id="modal-title">{activeTrack.title}</h2>
            <p>{activeTrack.description}</p>
            <h3>What you will explore</h3>
            <ol className="module-list">
              {activeTrack.modules.map((m, i) => (
                <li key={m}>
                  <span>0{i + 1}</span>
                  {m}
                </li>
              ))}
            </ol>
            <h3>Before you come</h3>
            <p>{activeTrack.prerequisite}</p>
            <button
              className="button"
              onClick={() => chooseTrack(activeTrack.id)}
            >
              Explore track sessions <Icon name="arrow" />
            </button>
          </>
        )}
        {modal?.type === "register" &&
          (registrationComplete ? (
            <>
              <p className="eyebrow">REGISTRATION DRAFT SAVED</p>
              <h2 id="modal-title">Your next three days.</h2>
              <p>
                Thanks, {draft.name?.split(" ")[0]}. Your details and event plan
                are saved on this device.
              </p>
              <div className="registration-note">
                <strong>This is a prototype registration.</strong>
                <p>
                  No official booking has been made. Contact GDG ITER to confirm
                  the registration process.
                </p>
              </div>
              <div className="review-details">
                <span>{draft.email}</span>
                <span>{draft.college}</span>
                <span>{selected.length} sessions in your event plan</span>
              </div>
              <button
                className="button"
                onClick={() => {
                  setModal(null);
                  document
                    .getElementById("my-plan")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Back to my event plan <Icon name="arrow" />
              </button>
              <button
                className="clear-draft text-link"
                onClick={() => {
                  try {
                    localStorage.removeItem("tk26-registration");
                  } catch {}
                  setDraft({});
                  setRegistrationComplete(false);
                  setNotice("Registration draft cleared");
                }}
              >
                Clear saved draft
              </button>
            </>
          ) : (
            <>
              <p className="eyebrow">TEKNO KRRAFT 2026 / GDG ITER</p>
              <h2 id="modal-title">Make it your event.</h2>
              <p>Review your interests and create a registration draft.</p>
              <div className="registration-selection">
                {selected.length ? (
                  <>
                    <strong>Your selected sessions</strong>
                    <ul>
                      {selected.map((s) => (
                        <li key={s.id}>
                          <span>{s.short}</span>
                          <small>
                            {15 + s.day} Oct · {s.start}
                          </small>
                        </li>
                      ))}
                    </ul>
                    {conflictIds.size > 0 && (
                      <p className="registration-warning">
                        Some selected sessions overlap. You can adjust your
                        agenda before attending.
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    Your plan is empty. You can explore and add sessions after
                    saving your details.
                  </p>
                )}
              </div>
              <form onSubmit={register}>
                <div className="form-grid">
                  <label>
                    Full name
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      defaultValue={draft.name}
                      placeholder="Your full name"
                      maxLength={100}
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      defaultValue={draft.email}
                      placeholder="you@college.edu"
                    />
                  </label>
                  <label className="full">
                    College / institution
                    <input
                      name="college"
                      required
                      autoComplete="organization"
                      defaultValue={draft.college}
                      placeholder="Your college or institution"
                      maxLength={160}
                    />
                  </label>
                  <label>
                    Academic year / status
                    <select
                      name="year"
                      defaultValue={draft.year || ""}
                      required
                    >
                      <option value="" disabled>
                        Select your year
                      </option>
                      {[
                        "1st year",
                        "2nd year",
                        "3rd year",
                        "4th year",
                        "Postgraduate",
                        "Working professional",
                      ].map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Primary interest
                    <select
                      name="interest"
                      defaultValue={
                        draft.interest ||
                        tracks.find((t) => t.id === selected[0]?.track)
                          ?.title ||
                        ""
                      }
                    >
                      <option value="">Still exploring</option>
                      {tracks.map((t) => (
                        <option key={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </label>
                  {isHack && (
                    <>
                      <label className="full">
                        Hack sprint participation
                        <select
                          name="participation"
                          value={participation}
                          onChange={(e) => setParticipation(e.target.value)}
                        >
                          <option value="solo">Solo participant</option>
                          <option value="team">With a team</option>
                        </select>
                      </label>
                      {participation === "team" && (
                        <label className="full">
                          Team name
                          <input
                            name="team"
                            required
                            defaultValue={draft.team}
                            placeholder="Your team's name"
                            maxLength={100}
                          />
                        </label>
                      )}
                    </>
                  )}
                </div>
                <p className="form-note">
                  Prototype only. Details stay in this browser and are not sent
                  to event organisers.
                </p>
                <button className="button" type="submit">
                  Save registration draft <Icon name="arrow" />
                </button>
              </form>
            </>
          ))}
        {modal?.type === "venue" && (
          <>
            <p className="eyebrow">THE VENUE</p>
            <h2 id="modal-title">See you at ITER.</h2>
            <p>
              Siksha 'O' Anusandhan, ITER Campus
              <br />
              Khandagiri Square, Bhubaneswar
              <br />
              Odisha 751030
            </p>
            <div className="venue-rooms">
              <h3>Your session rooms</h3>
              {[
                ...new Set(
                  (selected.length ? selected : sessions).map((s) => s.venue),
                ),
              ].map((v) => (
                <p key={v}>
                  <Icon name="pin" size={15} />
                  {v}
                </p>
              ))}
            </div>
            <p>
              Check with the event desk for room directions and any programme
              changes.
            </p>
            <a
              className="button"
              href="https://www.google.com/maps/search/?api=1&query=ITER+SOA+Khandagiri+Bhubaneswar"
              target="_blank"
              rel="noreferrer"
            >
              Open campus in Maps <Icon name="arrow" />
            </a>
          </>
        )}
        {modal?.type === "rules" && (
          <>
            <p className="eyebrow">BEFORE YOU JOIN</p>
            <h2 id="modal-title">Event essentials.</h2>
            <ul className="plain-list">
              <li>
                Check the prerequisites of each workshop and bring your laptop,
                charger, and student ID.
              </li>
              <li>
                Hack sprint participation is open to solo participants and teams
                of 2 to 4.
              </li>
              <li>
                Some competitions are for shortlisted participants. Confirm your
                eligibility with the event team.
              </li>
              <li>
                The final hack sprint judging criteria, submission rules, and
                deadlines will be shared by the organisers.
              </li>
            </ul>
            <a className="text-link" href="mailto:gdg@iter.ac.in">
              Ask the event team <Icon name="arrow" />
            </a>
          </>
        )}
        {modal?.type === "conduct" && (
          <>
            <p className="eyebrow">A COMMUNITY FOR EVERYONE</p>
            <h2 id="modal-title">Build with respect.</h2>
            <p>
              Make room for different perspectives, help fellow participants,
              and respect the people, equipment, and spaces around you.
            </p>
            <p>
              Follow the organisers' instructions and report any concerns to the
              event team.
            </p>
            <a
              className="button"
              href="https://developers.google.com/community/gdg"
              target="_blank"
              rel="noreferrer"
            >
              Read GDG community guidance <Icon name="arrow" />
            </a>
          </>
        )}
        {(modal?.type === "contact" || modal?.type === "sponsor") && (
          <>
            <p className="eyebrow">GDG ITER CHAPTER</p>
            <h2 id="modal-title">
              {modal.type === "sponsor"
                ? "Support the next idea."
                : "Let’s talk Tekno Krraft."}
            </h2>
            <p>
              {modal.type === "sponsor"
                ? "Connect with the event team about supporting workshops, developer learning, and the hack sprint."
                : "For registration, accessibility, venue, or programme questions, get in touch with the event team."}
            </p>
            <a
              className="contact-address"
              href={`mailto:gdg@iter.ac.in${modal.type === "sponsor" ? "?subject=Tekno%20Krraft%202026%20sponsorship" : ""}`}
            >
              gdg@iter.ac.in <Icon name="arrow" />
            </a>
          </>
        )}
      </dialog>
    </>
  );
}
