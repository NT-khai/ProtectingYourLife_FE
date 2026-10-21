import Link from "next/link";
import { Phone, Mail, MapPin, ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111827] text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-bold text-red-500">
                Protecting Your Life
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              Chia sẻ kiến thức về an toàn, phòng chống thiên tai, cháy nổ và
              các kỹ năng ứng phó trong tình huống khẩn cấp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Liên Kết Nhanh
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-red-400 transition">
                  Trang Chủ
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-red-400 transition">
                  Giới Thiệu
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-red-400 transition">
                  Liên Hệ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-red-400 transition"
                >
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Liên Hệ
            </h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="text-red-500" size={18} />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-red-500" size={18} />
                <span>0123 456 789</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-red-500" size={18} />
                <span>support@protectingyourlife.com</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700">
            <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2026 Protecting Your Life. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
