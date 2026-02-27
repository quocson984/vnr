import { useState } from 'react';

const layers = [
    {
        type: 'international',
        label: 'BỐI CẢNH QUỐC TẾ',
        color: '#60a5fa',
        gradientBg: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04))',
        border: 'rgba(59,130,246,0.3)',
        icon: '🌍',
        items: [
            { title: 'Chủ nghĩa phát xít trỗi dậy', detail: 'Đức (Hitler 1933), Ý (Mussolini), Nhật Bản bành trướng — đe dọa hòa bình thế giới, đàn áp phong trào cộng sản quốc tế.', emoji: '⚠️' },
            { title: 'Đại hội VII QTCS (7/1935)', detail: 'Xác định kẻ thù trước mắt là chủ nghĩa phát xít. Chỉ đạo các Đảng CS lập Mặt trận Nhân dân rộng rãi, thay đổi sách lược từ "giai cấp chống giai cấp" sang liên minh chống phát xít.', emoji: '🏴' },
            { title: 'MT Nhân dân Pháp thắng cử', detail: 'Liên minh cánh tả do Léon Blum lãnh đạo lên nắm quyền (6/1936). Ban hành chính sách tiến bộ, nới lỏng tự do tại thuộc địa.', emoji: '🇫🇷' },
            { title: 'Khủng hoảng KT 1929-1933', detail: 'Khủng hoảng kinh tế tư bản chủ nghĩa lan toàn cầu. Tại Đông Dương: giá gạo, cao su sụp đổ; công nhân, nông dân bị bần cùng hóa cùng cực.', emoji: '📉' },
        ],
    },
    {
        type: 'decision',
        label: 'QUYẾT SÁCH TRUNG ƯƠNG',
        color: '#f87171',
        gradientBg: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04))',
        border: 'rgba(239,68,68,0.3)',
        icon: '🏛️',
        items: [
            { title: 'HN BCH TW Đảng (7/1936)', detail: 'Do Lê Hồng Phong chủ trì tại Thượng Hải. Vạch ra chuyển hướng chiến lược: xác định kẻ thù trước mắt là bọn phản động thuộc địa; tạm gác khẩu hiệu ruộng đất; chuyển sang đấu tranh dân sinh, dân chủ.', emoji: '📜' },
            { title: 'Nới lỏng chính sách thuộc địa', detail: 'Chính phủ Blum cho phép tự do báo chí, hội họp ở mức nhất định tại Đông Dương. Trả tự do một số tù chính trị. Mở ra không gian pháp lý hiếm hoi.', emoji: '🔓' },
        ],
    },
    {
        type: 'result',
        label: 'KẾT QUẢ & HÀNH ĐỘNG',
        color: '#d4af37',
        gradientBg: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))',
        border: 'rgba(212,175,55,0.3)',
        icon: '⚡',
        items: [
            { title: 'MT Dân chủ Đông Dương', detail: 'Tập hợp MỌI giai cấp tiến bộ: công nhân, nông dân, tiểu tư sản, tư sản dân tộc, trí thức, địa chủ yêu nước. Bước nhảy vọt so với liên minh Công-Nông hẹp hòi trước đó.', emoji: '🤝' },
            { title: 'Đấu tranh công khai', detail: 'Kết hợp bí mật – công khai, hợp pháp – nửa hợp pháp. Biến diễn đàn kẻ thù (báo chí, nghị trường) thành trận địa cách mạng. Xuất bản Dân Chúng, Tin Tức…', emoji: '📰' },
            { title: 'Chuẩn bị nền tảng CMT8', detail: 'Xây dựng "đạo quân chính trị" hàng triệu người được giác ngộ → chuyển hóa vào Mặt trận Việt Minh (1941) → Tổng khởi nghĩa Tháng Tám 1945 thắng lợi.', emoji: '⭐' },
        ],
    },
];

export default function KnowledgeGraph() {
    const [expanded, setExpanded] = useState({});

    const toggle = (layerIdx, itemIdx) => {
        const key = `${layerIdx}-${itemIdx}`;
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {layers.map((layer, li) => (
                <div key={li}>
                    {/* Layer Card */}
                    <div style={{
                        background: layer.gradientBg,
                        border: `1px solid ${layer.border}`,
                        borderRadius: 16, padding: '1.25rem', marginBottom: '0.25rem',
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: `${layer.color}20`, border: `1px solid ${layer.color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                            }}>{layer.icon}</div>
                            <span style={{
                                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em',
                                color: layer.color, fontFamily: "'Newsreader', serif",
                            }}>{layer.label}</span>
                            <div style={{ flex: 1, height: 1, background: `${layer.color}25` }} />
                        </div>

                        {/* Items Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(auto-fit, minmax(${layer.items.length <= 2 ? '260px' : '200px'}, 1fr))`,
                            gap: '0.6rem',
                        }}>
                            {layer.items.map((item, ii) => {
                                const key = `${li}-${ii}`;
                                const isOpen = expanded[key];
                                return (
                                    <div key={ii}
                                        onClick={() => toggle(li, ii)}
                                        style={{
                                            background: isOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${isOpen ? layer.color + '55' : 'rgba(255,255,255,0.06)'}`,
                                            borderRadius: 12, padding: '0.85rem', cursor: 'pointer',
                                            transition: 'all 0.3s',
                                        }}
                                        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                                        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
                                            <h4 style={{
                                                fontFamily: "'Newsreader', serif", fontWeight: 700,
                                                fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', flex: 1,
                                                lineHeight: 1.3,
                                            }}>
                                                {item.title}
                                            </h4>
                                            <span style={{
                                                fontSize: '0.6rem', color: layer.color, opacity: 0.6,
                                                transition: 'transform 0.3s', transform: isOpen ? 'rotate(90deg)' : 'none',
                                            }}>▶</span>
                                        </div>
                                        {isOpen && (
                                            <p style={{
                                                marginTop: '0.6rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
                                                paddingLeft: '1.6rem', animation: 'slideUp 0.25s ease-out',
                                            }}>{item.detail}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Arrow connector */}
                    {li < layers.length - 1 && (
                        <div style={{ textAlign: 'center', padding: '0.15rem 0' }}>
                            <div style={{
                                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                                color: 'rgba(212,175,55,0.35)',
                            }}>
                                <div style={{ width: 2, height: 12, background: 'rgba(212,175,55,0.2)' }} />
                                <span style={{ fontSize: '0.9rem' }}>▼</span>
                                <div style={{ width: 2, height: 6, background: 'rgba(212,175,55,0.2)' }} />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'rgba(212,175,55,0.4)', fontStyle: 'italic', marginTop: '0.5rem' }}>
                👆 Nhấn vào từng mục để xem phân tích chi tiết
            </p>
        </div>
    );
}
