"use client";

import { useState } from "react";
import {
  BookOpen,
  Search,
  Flame,
  CloudRain,
  Zap,
  Shield,
  LifeBuoy,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedArticle, setExpandedArticle] = useState<number | null>(1);

  const categories = [
    { id: "all", label: "Tất cả chủ đề", icon: BookOpen },
    { id: "fire", label: "PCCC & Thoát hiểm", icon: Flame },
    { id: "disaster", label: "Bão lũ & Thiên tai", icon: CloudRain },
    { id: "electric", label: "An toàn Điện & Gas", icon: Zap },
    { id: "personal", label: "Kỹ năng Sinh tồn", icon: Shield },
  ];

  const articles = [
    {
      id: 1,
      category: "fire",
      categoryName: "PCCC & Thoát hiểm",
      title: "Quy tắc PASS khi sử dụng bình chữa cháy mini và bột ABC",
      readTime: "4 phút đọc",
      summary:
        "Nắm vững 4 bước PASS cơ bản giúp bạn dập tắt đám cháy ban đầu một cách an toàn và dứt khoát trước khi ngọn lửa lan rộng.",
      steps: [
        "P - Pull (Rút chốt an toàn): Đặt bình thẳng đứng, dùng ngón tay giật mạnh chốt niêm phong bằng kim loại ở mỏ vịt.",
        "A - Aim (Hướng vòi phun): Hướng loa phun hoặc vòi vào GỐC đám cháy, không phun vào ngọn lửa.",
        "S - Squeeze (Bóp cò): Bóp chặt van xả mỏ vịt để giải phóng chất chữa cháy với áp lực mạnh.",
        "S - Sweep (Quét qua lại): Quét vòi phun từ bên này sang bên kia gốc lửa cho đến khi đám cháy tắt hoàn toàn.",
      ],
      warning: "Nếu đám cháy lan rộng quá 2m vuông hoặc có tiếng nổ lớn, hãy lập tức sơ tán và gọi 114!",
    },
    {
      id: 2,
      category: "disaster",
      categoryName: "Bão lũ & Thiên tai",
      title: "Kỹ năng chuẩn bị và ứng phó khi có cảnh báo lũ quét & bão lớn",
      readTime: "6 phút đọc",
      summary:
        "Các bước bảo vệ gia đình, chằng chống nhà cửa và nguyên tắc an toàn tuyệt đối khi nước lũ dâng cao đột ngột.",
      steps: [
        "Chủ động ngắt toàn bộ nguồn điện tổng và khóa van bình gas trước khi rời khỏi nhà.",
        "Di chuyển đồ vật có giá trị, lương thực khô và thuốc men lên vị trí cao nhất có thể.",
        "Không lái xe hay lội bộ qua vùng nước đang chảy xiết dù nước chỉ sâu đến đầu gối (dòng nước 30cm có thể cuốn trôi xe ô tô).",
        "Luôn mang theo ba lô sinh tồn (Go-Bag) chứa còi cứu hộ, đèn pin và nước sạch đóng chai.",
      ],
      warning: "Tránh xa các cột điện, trạm biến áp và nắp cống bị bật nắp trong thời gian ngập.",
    },
    {
      id: 3,
      category: "electric",
      categoryName: "An toàn Điện & Gas",
      title: "Xử lý tức thời khi ngửi thấy mùi khí Gas nồng nặc trong nhà",
      readTime: "3 phút đọc",
      summary:
        "Quy tắc sống còn: Một tia lửa nhỏ từ công tắc bật đèn cũng có thể kích nổ toàn bộ không gian phòng kín có gas.",
      steps: [
        "TUYỆT ĐỐI KHÔNG bật hoặc tắt bất kỳ công tắc điện, quạt hay cắm rút phích cắm nào.",
        "KHÔNG bật quẹt gas, diêm hoặc dùng điện thoại ngay trong khu vực rò rỉ gas.",
        "Nhẹ nhàng bịt mũi miệng bằng khăn ẩm, tiếp cận bình gas và khóa chặt van bình gas theo chiều kim đồng hồ.",
        "Mở toàn bộ các cửa sổ và cửa chính nhẹ nhàng để gió lùa phân tán khí gas ra ngoài trời.",
        "Di tản mọi người ra xa ít nhất 20 mét rồi mới gọi điện thoại cho dịch vụ cung cấp gas hoặc 114.",
      ],
      warning: "Nếu ngửi thấy mùi gas kèm tiếng xì lớn, lập tức hô hoán và thoát ra ngoài ngay lập tức!",
    },
    {
      id: 4,
      category: "personal",
      categoryName: "Kỹ năng Sinh tồn",
      title: "Thoát hiểm đám cháy nhà ống và căn hộ chung cư cao tầng",
      readTime: "5 phút đọc",
      summary:
        "Nhà ống và chung cư có đặc thù khói bốc ngược theo giếng trời. Biết chọn hướng thoát hiểm cứu sống cả gia đình.",
      steps: [
        "Xác định hướng khói: Luôn thoát theo lối thang bộ thoát hiểm có cửa chống cháy đóng kín.",
        "Hạ thấp trọng tâm: Khói và khí độc nhẹ hơn không khí sẽ nổi lên trên. Bò sát mặt sàn nơi có lượng oxy trong lành nhất.",
        "Kiểm tra nhiệt độ cửa: Dùng mu bàn tay sờ nhẹ vào tay nắm cửa. Nếu tay nắm nóng rực, KHÔNG mở cửa vì lửa đang chờ bên ngoài.",
        "Tạo phòng trú ẩn an toàn nếu bị kẹt: Đóng chặt cửa, dùng chăn/quần áo ướt chèn kín khe cửa, ra ban công vẫy khăn sáng màu kêu cứu.",
      ],
      warning: "Tuyệt đối không trốn vào nhà vệ sinh vì khói độc sẽ len qua đường ống thông gió gây ngạt.",
    },
  ];

  const goBagItems = [
    "Nước uống đóng chai (3 lít/người)",
    "Lương khô dinh dưỡng hoặc đồ hộp",
    "Đèn pin siêu sáng kèm pin dự phòng",
    "Còi cứu hộ tần số cao",
    "Hộp sơ cứu y tế (băng gạc, sát khuẩn, thuốc cá nhân)",
    "Bản sao ép nhựa CMND/CCCD, sổ hộ khẩu",
    "Sạc dự phòng điện thoại đã sạc đầy 100%",
    "Áo mưa tiện lợi và chăn giữ nhiệt mỏng",
  ];

  const filteredArticles = articles.filter((art) => {
    const matchCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen size={16} />
          Thư Viện Kiến Thức & Cẩm Nang Thực Chiến
        </div>
        <h1 className="text-3xl font-extrabold text-white">Kiến Thức & Kỹ Năng An Toàn</h1>
        <p className="text-slate-300 text-sm mt-1">
          Trang bị kiến thức chuẩn mực giúp bạn bình tĩnh và hành động chuẩn xác trong những giây phút quyết định.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm kỹ năng: 'bình chữa cháy', 'thoát hiểm', 'rò rỉ gas'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:border-red-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  selectedCategory === c.id
                    ? "bg-red-600 text-white border-red-500 shadow-md"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                <Icon size={14} />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Article Accordion / Reader (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-slate-950/60 rounded-3xl border border-slate-800 text-slate-400">
              Không tìm thấy bài viết phù hợp với từ khóa của bạn.
            </div>
          ) : (
            filteredArticles.map((art) => {
              const isExpanded = expandedArticle === art.id;

              return (
                <div
                  key={art.id}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedArticle(isExpanded ? null : art.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] uppercase font-bold text-yellow-400 bg-yellow-950/60 border border-yellow-800/60 px-2.5 py-0.5 rounded-full">
                          {art.categoryName}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock size={12} />
                          {art.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white hover:text-red-400 transition">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <button className="shrink-0 self-end sm:self-center px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-red-600 hover:text-white transition">
                      {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                    </button>
                  </div>

                  {/* Expanded Guide Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Các bước hành động từng bước:
                      </h4>

                      <div className="space-y-2.5">
                        {art.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs text-slate-200 leading-relaxed font-medium">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>

                      {art.warning && (
                        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-3">
                          <span className="text-lg shrink-0">⚠️</span>
                          <span className="font-semibold">{art.warning}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Checklist: Go-Bag (1 col) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <LifeBuoy size={20} className="text-red-500" />
              <h3 className="font-bold text-white text-base">Ba Lô Sinh Tồn Khẩn Cấp (Go-Bag)</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Mỗi gia đình nên chuẩn bị sẵn 1 ba lô gọn nhẹ đặt gần cửa ra vào để mang theo ngay khi có lệnh sơ tán.
            </p>

            <div className="space-y-2">
              {goBagItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-200 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-yellow-400/10 border border-yellow-500/20 text-[11px] text-yellow-300">
              📌 Kiểm tra hạn sử dụng đồ ăn và pin sạc định kỳ mỗi 6 tháng một lần.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
