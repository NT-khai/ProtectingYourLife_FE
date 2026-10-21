import Image from "next/image";
import Safety from "../assets/Safety.png";
export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">
            Về Chúng Tôi
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            Protecting Your Life là nền tảng chia sẻ kiến thức, kỹ năng và giải
            pháp giúp người dân ứng phó với các tình huống nguy hiểm trong cuộc
            sống.
          </p>

          <p className="text-gray-300 leading-8">
            Chúng tôi cung cấp thông tin về phòng cháy chữa cháy, thiên tai, cứu
            hộ cứu nạn và kỹ năng sinh tồn để bảo vệ bản thân và cộng đồng.
          </p>
        </div>

        <div className="relative h-[600px]">
          <Image
            src={Safety}
            alt="Safety"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
