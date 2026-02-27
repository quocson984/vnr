import { useState } from 'react';

const crossroads = [
    {
        year: '1936',
        title: 'Ngã rẽ lịch sử: Lựa chọn sách lược cách mạng',
        context: 'Năm 1936, Mặt trận Nhân dân Pháp lên nắm quyền, nới lỏng chính sách thuộc địa. Chủ nghĩa phát xít đe dọa toàn cầu. Đảng CSĐD vừa phục hồi tổ chức sau khủng bố trắng 1931-1935. Trước mặt là 3 con đường:',
        paths: [
            {
                id: 'armed',
                label: '🗡️ Phát động khởi nghĩa vũ trang',
                color: '#ef4444',
                analysis: {
                    summary: 'Con đường bạo lực trực tiếp — lật đổ chính quyền thực dân bằng sức mạnh quân sự.',
                    strengths: [
                        'Thể hiện rõ ý chí cách mạng triệt để, không thỏa hiệp',
                        'Nếu thắng lợi sẽ giải quyết tận gốc ách thống trị',
                    ],
                    weaknesses: [
                        'Lực lượng vũ trang gần như chưa tồn tại, vũ khí và kinh nghiệm tác chiến đều không có',
                        'Quân đội viễn chinh Pháp, mật thám, cảnh sát vẫn nguyên vẹn — tương quan áp đảo',
                        'Chưa có "tình thế cách mạng" chín muồi (Lênin): chính quyền thực dân chưa khủng hoảng đến mức tê liệt',
                        'Quần chúng chưa được tổ chức đồng bộ, giác ngộ sâu rộng đến mức sẵn sàng hy sinh',
                    ],
                    consequence: 'HẬU QUẢ DỰ KIẾN: Bị đàn áp đẫm máu như Xô viết Nghệ Tĩnh 1930-1931 hoặc khởi nghĩa Yên Bái. Lực lượng nòng cốt vừa phục hồi sẽ bị tiêu diệt. Đây là hành động "manh động tiểu tư sản" — phiêu lưu quân sự khi chưa đủ điều kiện.',
                    verdict: 'KHÔNG KHẢ THI',
                    verdictColor: '#ef4444',
                },
            },
            {
                id: 'democratic',
                label: '📢 Chuyển sang đấu tranh dân sinh, dân chủ',
                color: '#22c55e',
                analysis: {
                    summary: 'Tận dụng không gian pháp lý mà Mặt trận Nhân dân Pháp tạo ra — đấu tranh công khai, hợp pháp để giáo dục, tập hợp lực lượng.',
                    strengths: [
                        'Tận dụng khe hở pháp lý hiếm hoi: tự do báo chí, hội họp, nghị trường',
                        'Bảo toàn và phát triển lực lượng — không hy sinh vô ích',
                        'Biến diễn đàn kẻ thù thành trận địa cách mạng: báo Dân Chúng, Tin Tức, Viện dân biểu',
                        'Xây dựng "đạo quân chính trị" hàng triệu người — nền tảng cho CMT8',
                        'Mở rộng Mặt trận: kéo cả tiểu tư sản, tư sản dân tộc, trí thức vào khối đoàn kết',
                    ],
                    weaknesses: [
                        'Không giải quyết tận gốc ách thống trị thực dân',
                        'Có nguy cơ bị hiểu lầm là "cải lương", "thỏa hiệp" nếu không nắm vững lý luận',
                        'Phụ thuộc vào chính sách của Pháp — khi Pháp thay đổi, không gian pháp lý sẽ mất',
                    ],
                    consequence: 'KẾT QUẢ THỰC TẾ: Đảng đã lựa chọn con đường này. Phong trào 1936-1939 tạo ra khối quần chúng hàng triệu người được giác ngộ. Khi CTTG II bùng nổ (1939-1945), lực lượng này chuyển hóa vào Mặt trận Việt Minh → Tổng khởi nghĩa Tháng Tám 1945 thắng lợi. Đây là "cuộc diễn tập lần thứ hai" mang ý nghĩa quyết định.',
                    verdict: 'PHƯƠNG ÁN TỐI ƯU',
                    verdictColor: '#22c55e',
                },
            },
            {
                id: 'passive',
                label: '⏸️ Án binh bất động, chờ thời cơ',
                color: '#f59e0b',
                analysis: {
                    summary: 'Duy trì hoạt động bí mật, không tận dụng giai đoạn nới lỏng, chờ đợi tình hình thay đổi thuận lợi hơn.',
                    strengths: [
                        'Tránh được rủi ro bị lộ tổ chức khi hoạt động công khai',
                        'Bảo toàn tuyệt đối cơ sở bí mật đã xây dựng',
                    ],
                    weaknesses: [
                        'Bỏ lỡ cơ hội vàng chỉ có 1 lần: chính phủ MT Nhân dân Pháp chỉ cầm quyền thời gian ngắn',
                        'Không mở rộng được lực lượng — mất cơ hội giáo dục và tập hợp hàng triệu quần chúng',
                        'Đảng sẽ tiếp tục cô lập, xa rời thực tiễn, mất ảnh hưởng với nhân dân',
                        'Khi CTTG II bùng nổ, sẽ không có "đạo quân chính trị" sẵn sàng để chuyển hóa',
                    ],
                    consequence: 'HẬU QUẢ DỰ KIẾN: Đảng tự cô lập, lỡ mất thời cơ lịch sử. Khi CTTG II tạo ra tình thế cách mạng thuận lợi (1939-1945), sẽ không đủ lực lượng quần chúng để tiến hành Tổng khởi nghĩa. Nghệ thuật lãnh đạo đòi hỏi phải biết TẠO RA thời cơ, không chỉ chờ đợi.',
                    verdict: 'BỎ LỠ THỜI CƠ',
                    verdictColor: '#f59e0b',
                },
            },
        ],
    },
    {
        year: '1930',
        title: 'Bài toán chiến lược: Dân tộc hay Giai cấp?',
        context: 'Tại Hội nghị BCH TW lần thứ nhất (10/1930), Luận cương chính trị phải giải quyết mối quan hệ giữa nhiệm vụ giải phóng dân tộc và đấu tranh giai cấp. Có 2 quan điểm đối lập:',
        paths: [
            {
                id: 'class-first',
                label: '⚒️ Ưu tiên đấu tranh giai cấp (Luận cương 10/1930)',
                color: '#ef4444',
                analysis: {
                    summary: 'Đặt vấn đề ruộng đất và đấu tranh giai cấp lên hàng đầu. "Vấn đề thổ địa là cái cốt của cách mạng tư sản dân quyền".',
                    strengths: [
                        'Đúng về mặt lý luận Mác-Lênin kinh điển trong xã hội tư bản phát triển',
                        'Xác định rõ động lực cách mạng là liên minh công - nông',
                    ],
                    weaknesses: [
                        'Không phù hợp đặc thù xã hội thuộc địa — nơi mâu thuẫn dân tộc gay gắt hơn mâu thuẫn giai cấp',
                        'Thu hẹp lực lượng: loại bỏ tiểu tư sản, tư sản dân tộc, trí thức, địa chủ yêu nước',
                        'Cô lập Đảng, không xây dựng được khối đại đoàn kết dân tộc',
                        'Chịu ảnh hưởng "tả" khuynh giáo điều từ Quốc tế Cộng sản lúc bấy giờ',
                    ],
                    consequence: 'THỰC TẾ: Luận cương này được áp dụng giai đoạn 1930-1935. Hạn chế lớn nhất là không huy động được sức mạnh toàn dân tộc. Phải đến 1936 mới được uốn nắn qua văn kiện "Chung quanh vấn đề chiến sách mới".',
                    verdict: 'HẠN CHẾ LỊCH SỬ',
                    verdictColor: '#ef4444',
                },
            },
            {
                id: 'nation-first',
                label: '🇻🇳 Ưu tiên giải phóng dân tộc (Cương lĩnh Nguyễn Ái Quốc)',
                color: '#22c55e',
                analysis: {
                    summary: 'Đặt nhiệm vụ chống đế quốc, giải phóng dân tộc lên hàng đầu. Đoàn kết toàn dân tộc, "công nông là gốc" nhưng không loại bỏ các tầng lớp khác.',
                    strengths: [
                        'Phù hợp đặc thù Việt Nam — nước thuộc địa nơi toàn dân bị áp bức bởi ngoại xâm',
                        'Tập hợp được MỌI lực lượng yêu nước: công nhân, nông dân, tiểu tư sản, tư sản dân tộc',
                        'Vận dụng sáng tạo chủ nghĩa Mác-Lênin, không giáo điều máy móc',
                        'Tạo nền tảng cho khối đại đoàn kết dân tộc — sức mạnh cốt lõi của cách mạng VN',
                    ],
                    weaknesses: [
                        'Bị Quốc tế Cộng sản lúc bấy giờ coi là "hữu khuynh" vì không đề cao giai cấp',
                    ],
                    consequence: 'THỰC TẾ: Cương lĩnh này là nền tảng tư tưởng xuyên suốt lịch sử cách mạng VN. Sau khi Luận cương 10/1930 bộc lộ hạn chế, Đảng đã quay lại tinh thần Cương lĩnh của Nguyễn Ái Quốc (từ 1936). Đường lối "dân tộc trên hết" trở thành kim chỉ nam.',
                    verdict: 'ĐƯỜNG LỐI ĐÚNG ĐẮN',
                    verdictColor: '#22c55e',
                },
            },
        ],
    },
];

export default function StrategicPathways() {
    const [activeScenario, setActiveScenario] = useState(0);
    const [expandedPath, setExpandedPath] = useState(null);

    const scenario = crossroads[activeScenario];

    return (
        <div>
            {/* Scenario Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {crossroads.map((cr, i) => (
                    <button key={i}
                        onClick={() => { setActiveScenario(i); setExpandedPath(null); }}
                        style={{
                            padding: '0.6rem 1.25rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700,
                            border: `2px solid ${activeScenario === i ? '#d4af37' : 'rgba(212,175,55,0.2)'}`,
                            background: activeScenario === i ? 'rgba(212,175,55,0.15)' : 'transparent',
                            color: activeScenario === i ? '#d4af37' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.3s',
                            fontFamily: "'Newsreader', serif",
                        }}
                    >
                        📅 {cr.year}: {cr.title.split(':')[0]}
                    </button>
                ))}
            </div>

            {/* Context */}
            <div style={{
                background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem'
            }}>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '1.15rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
                    ⚡ {scenario.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>{scenario.context}</p>
            </div>

            {/* Path Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {scenario.paths.map((path) => {
                    const isExpanded = expandedPath === path.id;
                    const a = path.analysis;
                    return (
                        <div key={path.id} style={{
                            border: `2px solid ${isExpanded ? path.color : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 14, overflow: 'hidden', transition: 'all 0.4s',
                            background: isExpanded ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)',
                        }}>
                            {/* Header */}
                            <button
                                onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                                style={{
                                    width: '100%', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center',
                                    justifyContent: 'space-between', cursor: 'pointer', border: 'none',
                                    background: 'transparent', color: 'inherit', textAlign: 'left',
                                }}
                            >
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: path.color, fontFamily: "'Newsreader', serif" }}>
                                    {path.label}
                                </span>
                                <span style={{
                                    fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.75rem',
                                    borderRadius: 999, background: `${a.verdictColor}22`, color: a.verdictColor,
                                    border: `1px solid ${a.verdictColor}55`,
                                }}>
                                    {a.verdict}
                                </span>
                            </button>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div style={{ padding: '0 1.25rem 1.5rem', animation: 'slideUp 0.3s ease-out' }}>
                                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic', borderLeft: `3px solid ${path.color}`, paddingLeft: '0.75rem' }}>
                                        {a.summary}
                                    </p>

                                    {/* Strengths & Weaknesses */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                                        <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: 10, padding: '1rem', border: '1px solid rgba(34,197,94,0.2)' }}>
                                            <h5 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#86efac', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>✅ ĐIỂM MẠNH</h5>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {a.strengths.map((s, i) => (
                                                    <li key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '0.4rem', paddingLeft: '1rem', position: 'relative' }}>
                                                        <span style={{ position: 'absolute', left: 0, color: '#86efac' }}>•</span>{s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '1rem', border: '1px solid rgba(239,68,68,0.2)' }}>
                                            <h5 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>❌ ĐIỂM YẾU / RỦI RO</h5>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {a.weaknesses.map((w, i) => (
                                                    <li key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '0.4rem', paddingLeft: '1rem', position: 'relative' }}>
                                                        <span style={{ position: 'absolute', left: 0, color: '#fca5a5' }}>•</span>{w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Consequence */}
                                    <div style={{
                                        background: `${a.verdictColor}11`, border: `1px solid ${a.verdictColor}33`,
                                        borderRadius: 10, padding: '1rem',
                                    }}>
                                        <h5 style={{ fontSize: '0.75rem', fontWeight: 700, color: a.verdictColor, marginBottom: '0.4rem', letterSpacing: '0.1em' }}>
                                            📋 {a.consequence.split(':')[0]}:
                                        </h5>
                                        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                                            {a.consequence.split(':').slice(1).join(':')}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.72rem', color: 'rgba(212,175,55,0.5)', fontStyle: 'italic' }}>
                👆 Nhấn vào từng phương án để xem phân tích Điểm mạnh / Điểm yếu / Hậu quả lịch sử
            </p>
        </div>
    );
}
