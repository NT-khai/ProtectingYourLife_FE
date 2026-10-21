import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Chính sách bảo mật | Protecting Your Life",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-700 to-yellow-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <ShieldCheck size={60} className="mx-auto mb-4 text-white" />

          <h1 className="text-5xl font-bold mb-4">Chính Sách Bảo Mật</h1>

          <p className="max-w-3xl mx-auto text-lg text-white/90">
            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của
            người dùng khi sử dụng nền tảng Protecting Your Life.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Section 1 */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-yellow-400" />
              <h2 className="text-2xl font-bold">
                1. Thông Tin Chúng Tôi Thu Thập
              </h2>
            </div>

            <p className="text-slate-300 leading-8">
              Khi sử dụng website, chúng tôi có thể thu thập các thông tin như
              họ tên, địa chỉ email, nội dung phản hồi và các dữ liệu kỹ thuật
              cần thiết nhằm cải thiện trải nghiệm người dùng.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-red-500" />
              <h2 className="text-2xl font-bold">
                2. Cách Chúng Tôi Sử Dụng Thông Tin
              </h2>
            </div>

            <ul className="space-y-3 text-slate-300 list-disc pl-5">
              <li>Cung cấp và cải thiện dịch vụ.</li>
              <li>Phản hồi yêu cầu hỗ trợ của người dùng.</li>
              <li>Gửi thông báo quan trọng liên quan đến hệ thống.</li>
              <li>Phân tích dữ liệu nhằm nâng cao chất lượng nội dung.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-yellow-400" />
              <h2 className="text-2xl font-bold">3. Chia Sẻ Thông Tin</h2>
            </div>

            <p className="text-slate-300 leading-8">
              Chúng tôi không bán, trao đổi hoặc chia sẻ thông tin cá nhân của
              bạn cho bên thứ ba ngoại trừ trường hợp được yêu cầu bởi pháp luật
              hoặc nhằm đảm bảo an toàn cho người dùng và cộng đồng.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-500">
              4. Bảo Mật Dữ Liệu
            </h2>

            <p className="text-slate-300 leading-8">
              Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý phù hợp để bảo
              vệ dữ liệu khỏi truy cập trái phép, mất mát hoặc lạm dụng thông
              tin.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              5. Quyền Của Người Dùng
            </h2>

            <p className="text-slate-300 leading-8">
              Người dùng có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin
              cá nhân mà chúng tôi đang lưu trữ theo quy định của pháp luật hiện
              hành.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-500">6. Liên Hệ</h2>

            <p className="text-slate-300 leading-8">
              Nếu có câu hỏi liên quan đến chính sách bảo mật, vui lòng liên hệ:
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-yellow-400 font-semibold">
                support@protectingyourlife.com
              </p>

              <p className="text-slate-400">TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
