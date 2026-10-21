import Image from "next/image";
import Safety from "@/app/assets/Safety.png";
import { ShieldCheck, Flame, HeartPulse, TriangleAlert } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block bg-red-600/20 text-red-400 px-4 py-2 rounded-full mb-6">
            Protecting Your Life
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Chung Tay Vì Một
            <span className="text-red-500"> Cuộc Sống An Toàn</span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-300 text-lg leading-8">
            Protecting Your Life là nền tảng cung cấp kiến thức, kỹ năng và
            hướng dẫn thực tiễn giúp mọi người ứng phó với các tình huống nguy
            hiểm, thiên tai, cháy nổ và khẩn cấp trong cuộc sống.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <Image
              src={Safety}
              alt="Safety"
              width={700}
              height={500}
              className="rounded-3xl object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">
              Chúng Tôi Là Ai?
            </h2>

            <p className="text-slate-300 leading-8 mb-5">
              Chúng tôi tin rằng kiến thức về an toàn có thể cứu sống con người.
              Vì vậy, Protecting Your Life được xây dựng nhằm giúp người dân
              tiếp cận nhanh chóng các thông tin liên quan đến phòng chống rủi
              ro và kỹ năng xử lý tình huống khẩn cấp.
            </p>

            <p className="text-slate-300 leading-8">
              Nền tảng hướng đến việc nâng cao nhận thức cộng đồng, giảm thiểu
              tai nạn và giúp mỗi cá nhân chủ động bảo vệ bản thân, gia đình
              cũng như xã hội xung quanh.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Sứ Mệnh Của Chúng Tôi
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl">
              <ShieldCheck className="text-red-500 mb-4" size={42} />

              <h3 className="text-2xl font-semibold mb-4">
                Nâng Cao Nhận Thức
              </h3>

              <p className="text-slate-400">
                Cung cấp kiến thức giúp cộng đồng hiểu và phòng tránh các nguy
                cơ trong cuộc sống hằng ngày.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl">
              <HeartPulse className="text-yellow-400 mb-4" size={42} />

              <h3 className="text-2xl font-semibold mb-4">Bảo Vệ Sức Khỏe</h3>

              <p className="text-slate-400">
                Hỗ trợ kỹ năng sơ cứu, xử lý y tế ban đầu và các hướng dẫn khi
                xảy ra tình huống khẩn cấp.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl">
              <TriangleAlert className="text-orange-400 mb-4" size={42} />

              <h3 className="text-2xl font-semibold mb-4">Giảm Thiểu Rủi Ro</h3>

              <p className="text-slate-400">
                Chia sẻ giải pháp thực tiễn nhằm hạn chế thiệt hại do thiên tai,
                cháy nổ và tai nạn bất ngờ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          Lĩnh Vực Hỗ Trợ
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-red-700 p-8 rounded-2xl text-center">
            <Flame className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">Phòng Cháy Chữa Cháy</h3>
            <p className="text-slate-400">
              Hướng dẫn phòng tránh cháy nổ và xử lý khi có hỏa hoạn.
            </p>
          </div>

          <div className="border border-yellow-600 p-8 rounded-2xl text-center">
            <ShieldCheck className="mx-auto text-yellow-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">An Toàn Cá Nhân</h3>
            <p className="text-slate-400">
              Các kỹ năng tự bảo vệ bản thân trước nguy cơ tiềm ẩn.
            </p>
          </div>

          <div className="border border-orange-500 p-8 rounded-2xl text-center">
            <HeartPulse className="mx-auto text-orange-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">Sơ Cứu Khẩn Cấp</h3>
            <p className="text-slate-400">
              Kiến thức sơ cứu nhanh trong các tình huống nguy hiểm.
            </p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-gradient-to-r from-red-700 to-yellow-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trang bị kiến thức hôm nay, bảo vệ mạng sống ngày mai.
          </h2>

          <p className="text-lg text-white/90">
            Protecting Your Life luôn đồng hành cùng cộng đồng trên hành trình
            xây dựng môi trường sống an toàn hơn.
          </p>
        </div>
      </section>
    </main>
  );
}
