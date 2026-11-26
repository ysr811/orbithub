import Image from "next/image";

export default function Loading() {
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none gap-12"
    >
      <Image
        src="/logo/logo-light.svg"
        alt="Orbit Logo"
        width={96}
        height={96}
        loading="eager"
        className="size-20 animate-spin object-contain select-none"
      />
      <p className="font-cairo text-sm text-muted-foreground animate-pulse font-medium">
        جاري الدخول إلى المدار...
      </p>
    </div>
  );
}
