// Skyline silhouette: each building has a width, height, base colour and a
// "lit window" pattern (see tailwind.config.js `backgroundImage`). Class names
// are kept as complete literal strings so Tailwind's JIT can detect them.
const BUILDINGS = [
  { size: 'w-[7%] h-[130px]', color: 'bg-[#0a1330]', windows: 'bg-bldg-blue-a' },
  { size: 'w-[5%] h-[200px]', color: 'bg-[#0b1126]', windows: 'bg-bldg-amber-a' },
  { size: 'w-[9%] h-[95px]', color: 'bg-[#0a1330]', windows: 'bg-bldg-blue-b' },
  { size: 'w-[6%] h-[250px]', color: 'bg-[#0b1228]', windows: 'bg-bldg-blue-c' },
  { size: 'w-[4%] h-[320px]', color: 'bg-[#0a1024]', windows: 'bg-bldg-amber-b' },
  { size: 'w-[8%] h-[160px]', color: 'bg-[#0a1330]', windows: 'bg-bldg-blue-b' },
  { size: 'w-[5%] h-[280px]', color: 'bg-[#0b1228]', windows: 'bg-bldg-blue-c' },
  { size: 'w-[7%] h-[110px]', color: 'bg-[#0a1330]', windows: 'bg-bldg-amber-c' },
  { size: 'w-[5%] h-[210px]', color: 'bg-[#0b1126]', windows: 'bg-bldg-blue-a' },
  { size: 'w-[9%] h-[150px]', color: 'bg-[#0a1330]', windows: 'bg-bldg-blue-b' },
  { size: 'w-[4%] h-[300px]', color: 'bg-[#0a1024]', windows: 'bg-bldg-amber-d' },
  { size: 'w-[6%] h-[175px]', color: 'bg-[#0b1228]', windows: 'bg-bldg-blue-a' },
];

/** Bottom-of-screen skyline plus the dark gradient that fades into it. */
export default function CitySkyline() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-center opacity-[0.85]">
        {BUILDINGS.map((b, i) => (
          <div key={i} className={`${b.color} ${b.windows} ${b.size}`} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[340px] bg-[linear-gradient(180deg,transparent,rgba(20,30,80,.35)_60%,rgba(8,10,25,.7))]" />
    </>
  );
}
