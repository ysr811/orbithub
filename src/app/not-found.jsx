import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-4"
      >
        <span className="font-museo text-7xl sm:text-[16rem] font-black text-primary/10 select-none">
          404
        </span>
        <h1 className="text-2xl sm:text-4xl font-black font-cairo text-foreground">
          أنت الآن خارج المدار!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-cairo max-w-md leading-relaxed">
          يبدو أنك سلكت مساراً غير موجود، أو تم نقل هذه الصفحة إلى إحداثيات أخرى داخل المنصة.
        </p>
          <Button
            render={<Link href="/" />}
            className="pt-2"
          >
            العودة للرئيسية
          </Button>
      </main>
    </>
  );
}
