export const runtime = "edge";

import CountdownTimer from "@/components/countdown-timer";

export default function HomePage() {
  const targetDate = process.env.NEXT_PUBLIC_EVENT_DATE ?? "";
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#00101a]">
      {/* Background art — flipped vertically per Figma design */}
      <div className="absolute inset-0 -scale-y-100 rotate-180 opacity-50">
        <img
          src="/images/prelaunch-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(13.3deg, rgb(0,16,26) 15.5%, rgba(0,18,29,0.46) 52.1%, rgba(0,19,32,0) 63.4%)",
        }}
      />

      {/* Countdown content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6">
        <p
          className="text-[36px] font-bold leading-12 text-white"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Sự kiện sẽ bắt đầu sau
        </p>
        <CountdownTimer targetDate={targetDate} />
      </div>
    </main>
  );
}
