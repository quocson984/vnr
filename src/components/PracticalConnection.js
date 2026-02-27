import { useState } from 'react';

const topics = [
    {
        id: 1,
        emoji: '🌐',
        tab: 'Thế giới đa cực',
        title: 'Trong bối cảnh thế giới đa cực và cạnh tranh chiến lược',
        color: '#60a5fa',
        image: 'https://baolaichau.vn/uploaded/post/2024/09/23/329216_23-9-ong-to-lam_1727062916204.jpg',
        imageCaption: 'Tổng Bí thư Tô Lâm tại Liên Hợp Quốc — Ngoại giao đa phương',
        currentContext: [
            { label: 'Cạnh tranh Mỹ – Trung', detail: 'Hai siêu cường cạnh tranh trên mọi lĩnh vực: công nghệ, thương mại, quân sự, ảnh hưởng địa chính trị tại Ấn Độ Dương – Thái Bình Dương.' },
            { label: 'Xung đột Nga – Ukraine', detail: 'Chiến tranh kéo dài khiến trật tự an ninh châu Âu rung chuyển, tác động đến chuỗi cung ứng và năng lượng toàn cầu.' },
            { label: 'Bất ổn khu vực & kinh tế', detail: 'Biển Đông, Trung Đông, khủng hoảng nợ công, lạm phát — thế giới chưa bao giờ bất định đến vậy.' },
        ],
        lesson1936: 'Nếu Việt Nam chọn đối đầu trực diện hoặc nghiêng hẳn về một bên → sẽ tự đặt mình vào rủi ro. Giống như năm 1936: không chọn đối đầu vũ trang khi chưa đủ lực, tận dụng môi trường quốc tế thuận lợi để phát triển nội lực.',
        keyword: 'NẮM BẮT THỜI CƠ',
    },
    {
        id: 2,
        emoji: '🤝',
        tab: 'Đường lối đối ngoại',
        title: 'Thực tiễn đường lối đối ngoại hiện nay',
        color: '#34d399',
        image: 'https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf805a77a882fd9b75054f40d589bc45fe3fe0eab864cabb86cea6de4c7858b7fcef02ff3392c3d3b75900578bf10b35cc99f232f8f01d8cd0b0c067ba8d59203aa16e03c5a38a5411cd50c1d3956f6d9b5/doi-tac-chien-luoc-toan-dien1-4698-6800.png.webp',
        imageCaption: 'Việt Nam nâng cấp quan hệ Đối tác chiến lược toàn diện với nhiều cường quốc',
        currentContext: [
            { label: 'Đa phương hóa, đa dạng hóa', detail: 'Thiết lập quan hệ ngoại giao với 193 quốc gia, quan hệ kinh tế với hơn 230 quốc gia & vùng lãnh thổ.' },
            { label: 'Đối tác tin cậy', detail: 'Là bạn, là đối tác tin cậy, là thành viên có trách nhiệm của cộng đồng quốc tế.' },
            { label: 'Đối tác chiến lược toàn diện', detail: 'Nâng cấp quan hệ ĐTCLTD với Mỹ, Trung Quốc, Nhật Bản, Hàn Quốc, Ấn Độ, Úc, Pháp...' },
        ],
        lesson1936: 'Không khép mình trong đối đầu ý thức hệ, mà mở rộng không gian phát triển. Đây chính là biểu hiện hiện đại của tư duy linh hoạt 1936.',
        keyword: 'MỞ RỘNG KHÔNG GIAN',
    },
    {
        id: 3,
        emoji: '🎋',
        tab: 'Ngoại giao cây tre',
        title: 'Ngoại giao "Cây tre Việt Nam"',
        color: '#22c55e',
        image: 'https://resource.kinhtedothi.vn//2024/07/24/anh-thumnail.jpg',
        imageCaption: 'Tổng Bí thư Nguyễn Phú Trọng — Người đề xướng trường phái Ngoại giao cây tre',
        currentContext: [
            { label: '🌱 Gốc vững', detail: 'Nguyên tắc độc lập, tự chủ — kiên định lập trường dân tộc, bảo vệ chủ quyền, toàn vẹn lãnh thổ.' },
            { label: '🎋 Thân chắc', detail: 'Nội lực quốc gia — sức mạnh tổng hợp sau gần 40 năm đổi mới, sự đồng thuận của nhân dân.' },
            { label: '🍃 Cành uyển chuyển', detail: 'Linh hoạt ứng xử — đa phương hóa, tận dụng luật pháp quốc tế, bảo vệ Tổ quốc "từ sớm, từ xa".' },
        ],
        lesson1936: 'Cũng giống như 1936: không thay đổi mục tiêu (độc lập, CNXH), nhưng thay đổi cách tiếp cận để bảo vệ mục tiêu — linh hoạt trong sách lược, kiên định về nguyên tắc.',
        keyword: 'LINH HOẠT – KIÊN ĐỊNH',
    },
    {
        id: 4,
        emoji: '📈',
        tab: 'Phát triển kinh tế',
        title: 'Trong phát triển kinh tế',
        color: '#f59e0b',
        image: 'https://i.ytimg.com/vi/xN-bznZJmRE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGDwgISh_MA8=&rs=AOn4CLBaznNqrz6TRrHeydS00dzPP16YIg',
        imageCaption: 'Việt Nam hội nhập kinh tế quốc tế sâu rộng sau Đổi mới 1986',
        currentContext: [
            { label: 'Kinh tế thị trường', detail: 'Chấp nhận cơ chế thị trường, xóa bỏ bao cấp, khuyến khích kinh tế tư nhân phát triển.' },
            { label: 'Hội nhập WTO & FTA', detail: 'Gia nhập WTO (2007), ký CPTPP, EVFTA, RCEP... — mở cửa thị trường 3 tỷ người.' },
            { label: 'Thu hút FDI', detail: 'Thu hút hàng trăm tỷ USD đầu tư nước ngoài từ Samsung, Intel, LG, Foxconn...' },
        ],
        lesson1936: 'Đổi mới kinh tế nhưng không thay đổi định hướng XHCN. Đây chính là ví dụ rõ ràng nhất: Mục tiêu bất biến – phương pháp linh hoạt.',
        keyword: 'MỤC TIÊU BẤT BIẾN',
    },
];

export default function PracticalConnection() {
    const [activeTab, setActiveTab] = useState(0);
    const topic = topics[activeTab];

    return (
        <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {topics.map((t, i) => (
                    <button key={i}
                        onClick={() => setActiveTab(i)}
                        style={{
                            padding: '0.55rem 1rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700,
                            border: `2px solid ${activeTab === i ? t.color : 'rgba(255,255,255,0.1)'}`,
                            background: activeTab === i ? `${t.color}18` : 'rgba(255,255,255,0.03)',
                            color: activeTab === i ? t.color : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.3s',
                            fontFamily: "'Newsreader', serif",
                        }}
                    >
                        {t.emoji} {t.tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ animation: 'slideUp 0.3s ease-out' }} key={activeTab}>
                {/* Title */}
                <h3 style={{
                    fontFamily: "'Newsreader', serif", fontSize: '1.15rem', fontWeight: 800,
                    color: topic.color, textAlign: 'center', marginBottom: '1.25rem',
                }}>
                    {topic.emoji} {topic.title}
                </h3>

                {/* Image */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={topic.image} alt={topic.imageCaption} loading="lazy"
                            style={{
                                borderRadius: 12, border: `2px solid ${topic.color}44`,
                                maxWidth: 480, width: '100%', height: 260, objectFit: 'cover',
                                boxShadow: `0 8px 30px rgba(0,0,0,0.4)`,
                            }} />
                        <p style={{ fontSize: '0.7rem', color: topic.color, fontStyle: 'italic', marginTop: '0.5rem', opacity: 0.7 }}>
                            {topic.imageCaption}
                        </p>
                    </div>
                </div>

                {/* Current context cards */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem',
                }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                        THỰC TIỄN HIỆN NAY
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {topic.currentContext.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                                padding: '0.7rem 0.85rem', borderRadius: 10,
                                background: `${topic.color}08`, borderLeft: `3px solid ${topic.color}`,
                            }}>
                                <span style={{ fontWeight: 800, color: topic.color, fontSize: '0.82rem', minWidth: 'fit-content', fontFamily: "'Newsreader', serif" }}>
                                    {item.label}
                                </span>
                                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                                    {item.detail}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 1936 connection */}
                <div style={{
                    background: `${topic.color}0D`, border: `1px solid ${topic.color}30`,
                    borderRadius: 12, padding: '1rem 1.25rem', textAlign: 'center',
                }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                        🔗 LIÊN HỆ BÀI HỌC 1936
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontStyle: 'italic' }}>
                        {topic.lesson1936}
                    </p>
                    <div style={{
                        display: 'inline-block', marginTop: '0.75rem',
                        padding: '0.35rem 1rem', borderRadius: 999,
                        background: `${topic.color}20`, border: `1px solid ${topic.color}40`,
                        fontSize: '0.72rem', fontWeight: 800, color: topic.color,
                        letterSpacing: '0.1em',
                    }}>
                        {topic.keyword}
                    </div>
                </div>
            </div>
        </div>
    );
}
