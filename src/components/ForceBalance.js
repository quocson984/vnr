import { useState } from 'react';

const frenchForces = [
    { icon: '🏰', label: 'Bộ máy hành chính', detail: 'Toàn bộ hệ thống Toàn quyền, Thống sứ, Khâm sứ, Công sứ vẫn vận hành nguyên vẹn tại 3 kỳ Bắc – Trung – Nam.', level: 'full' },
    { icon: '⚔️', label: 'Quân đội viễn chinh', detail: 'Hàng chục nghìn lính Pháp và lính khố xanh, khố đỏ bản xứ, trang bị vũ khí hiện đại, huấn luyện bài bản theo quân đội chính quy châu Âu.', level: 'full' },
    { icon: '🕵️', label: 'Sở Mật thám Đông Dương', detail: 'Sûreté — mạng lưới chỉ điểm, do thám dày đặc, từng phá tan toàn bộ cơ sở Đảng giai đoạn 1931-1935. Năng lực tình báo vượt trội.', level: 'full' },
    { icon: '💰', label: 'Kinh tế – Tài chính', detail: 'Kiểm soát toàn bộ ngân sách Đông Dương, hệ thống ngân hàng, đồn điền cao su, hầm mỏ than, toàn bộ nguồn thuế.', level: 'full' },
    { icon: '📡', label: 'Truyền thông – Kiểm duyệt', detail: 'Độc quyền hệ thống báo chí, kiểm duyệt chặt chẽ, định hướng dư luận theo ý thực dân.', level: 'high' },
    { icon: '⚖️', label: 'Tư pháp thực dân', detail: 'Quyền bắt bớ giam cầm không cần xét xử (chế độ Indigénat). Tòa án phục vụ lợi ích thực dân.', level: 'high' },
];

const vietForces = [
    { icon: '🔴', label: 'Tổ chức Đảng', detail: 'Hệ thống mới được phục hồi từ 1932-1935, cơ sở còn mỏng manh; nhiều cán bộ kinh nghiệm vẫn đang bị giam cầm.', level: 'low' },
    { icon: '👥', label: 'Quần chúng giác ngộ', detail: 'Phong trào đang trong giai đoạn tạm lắng sau khủng bố trắng; chưa được tổ chức lại một cách đồng bộ.', level: 'low' },
    { icon: '🔨', label: 'Lực lượng vũ trang', detail: 'Gần như CHƯA TỒN TẠI — không có đơn vị vũ trang nào, không vũ khí, không kinh nghiệm tác chiến.', level: 'none' },
    { icon: '📰', label: 'Truyền thông', detail: 'Chưa có báo chí công khai; toàn bộ hoạt động tuyên truyền đều bí mật, quy mô rất nhỏ, dễ bị phát hiện.', level: 'none' },
    { icon: '💵', label: 'Tài chính', detail: 'Ngân quỹ Đảng cạn kiệt; phụ thuộc hoàn toàn vào đóng góp nhỏ lẻ từ đảng viên và quần chúng yêu nước.', level: 'none' },
];

const levelColors = { full: '#3b82f6', high: '#60a5fa', medium: '#f59e0b', low: '#f87171', none: '#ef4444' };
const levelLabels = { full: 'Mạnh', high: 'Khá mạnh', medium: 'Trung bình', low: 'Yếu', none: 'Không có' };

function ForceColumn({ title, emoji, forces, accentColor }) {
    const [expanded, setExpanded] = useState(null);
    return (
        <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '0.25rem', lineHeight: 1 }}>{emoji}</div>
                <h4 style={{ fontFamily: "'Newsreader', serif", fontWeight: 700, fontSize: '1.1rem', color: accentColor }}>{title}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {forces.map((f, i) => (
                    <div key={i}
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        style={{
                            background: expanded === i ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${expanded === i ? `${accentColor}55` : 'rgba(255,255,255,0.06)'}`,
                            borderRadius: 10, padding: '0.75rem 1rem', cursor: 'pointer', transition: 'all 0.3s',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontSize: '1.15rem' }}>{f.icon}</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', flex: 1 }}>{f.label}</span>
                            <span style={{
                                fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.5rem',
                                borderRadius: 999, background: `${levelColors[f.level]}22`,
                                color: levelColors[f.level], border: `1px solid ${levelColors[f.level]}44`,
                            }}>{levelLabels[f.level]}</span>
                        </div>
                        {expanded === i && (
                            <p style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic', borderLeft: `3px solid ${accentColor}`, paddingLeft: '0.75rem', animation: 'slideUp 0.25s ease-out' }}>
                                {f.detail}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ForceBalance() {
    return (
        <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <ForceColumn title="Thực dân Pháp" emoji={<svg width="40" height="28" viewBox="0 0 3 2" style={{ borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}><rect width="1" height="2" fill="#002395" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#ED2939" /></svg>} forces={frenchForces} accentColor="#60a5fa" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 0.25rem' }}>
                    <div style={{ width: 2, flex: 1, background: 'rgba(212,175,55,0.15)' }} />
                    <div style={{ fontFamily: "'Newsreader', serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--color-accent-gold)', padding: '0.75rem 0' }}>VS</div>
                    <div style={{ width: 2, flex: 1, background: 'rgba(212,175,55,0.15)' }} />
                </div>
                <ForceColumn title="Lực lượng Cách mạng" emoji="⭐" forces={vietForces} accentColor="#f87171" />
            </div>

            <div style={{
                marginTop: '1.5rem', padding: '1rem 1.25rem', borderRadius: 12,
                background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center'
            }}>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '0.88rem', color: 'var(--color-accent-gold)', fontWeight: 700 }}>
                    ⚠️ Tương quan lực lượng hoàn toàn bất lợi cho phía cách mạng
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginTop: '0.3rem' }}>
                    Pháp nắm giữ toàn diện sức mạnh quân sự, hành chính, kinh tế, tình báo. Cách mạng mới phục hồi, gần như tay không.
                    <br />→ Không thể phát động khởi nghĩa vũ trang. Sách lược tối ưu: <strong style={{ color: 'var(--color-accent-gold)' }}>đấu tranh dân sinh, dân chủ</strong> để bảo toàn & phát triển lực lượng.
                </p>
            </div>
        </div>
    );
}
