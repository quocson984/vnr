import { useState } from 'react';

const flipCardsData = [
    {
        title: 'Kẻ thù trực tiếp',
        front: 'Giai đoạn 1930–1935: Đế quốc Pháp và phong kiến tay sai. Mục tiêu lật đổ hoàn toàn chế độ thực dân.',
        back: 'Giai đoạn 1936–1939: Bọn phản động thuộc địa Pháp và tay sai không thi hành chính sách dân chủ. Phân hóa kẻ thù.',
        iconFront: '⚔️', iconBack: '🎯',
    },
    {
        title: 'Nhiệm vụ trước mắt',
        front: 'Giành độc lập dân tộc và ruộng đất cho dân cày. Tiến hành bạo động vũ trang giành chính quyền.',
        back: 'Chống phát xít, chống chiến tranh, đòi tự do, dân chủ, cơm áo, hòa bình. Tạm gác khẩu hiệu ruộng đất.',
        iconFront: '🗡️', iconBack: '🕊️',
    },
    {
        title: 'Hình thức tổ chức',
        front: 'Hoàn toàn bí mật, bất hợp pháp. Hoạt động trong khuôn khổ ngầm, tránh sự phát hiện của mật thám.',
        back: 'Kết hợp bí mật và công khai, hợp pháp và nửa hợp pháp. Tận dụng tối đa không gian pháp lý.',
        iconFront: '🔒', iconBack: '📢',
    },
    {
        title: 'Mặt trận tập hợp',
        front: 'Nặng về liên minh Công - Nông. Hạn chế mở rộng đối tượng do ảnh hưởng khuynh hướng "tả" khuynh.',
        back: 'Mặt trận Dân chủ Đông Dương rộng rãi: công nhân, nông dân, tiểu tư sản, tư sản dân tộc, địa chủ yêu nước.',
        iconFront: '👷', iconBack: '🤝',
    },
];

export default function FlipCards() {
    const [flipped, setFlipped] = useState({});

    const toggle = (i) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }));

    return (
        <div className="flip-card-grid">
            {flipCardsData.map((card, i) => (
                <div key={i} className={`flip-card ${flipped[i] ? 'flipped' : ''}`} onClick={() => toggle(i)}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 999, background: 'rgba(212,175,55,0.2)', color: '#d4af37', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                GIAI ĐOẠN 1930–1935
                            </span>
                            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{card.iconFront}</div>
                            <h4>{card.title}</h4>
                            <p>{card.front}</p>
                            <div className="flip-hint">⟳ Click để xem sự thay đổi</div>
                        </div>
                        <div className="flip-card-back">
                            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 999, background: 'rgba(59,130,246,0.25)', color: '#93c5fd', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                CHUYỂN HƯỚNG 1936–1939
                            </span>
                            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{card.iconBack}</div>
                            <h4>{card.title}</h4>
                            <p>{card.back}</p>
                            <div className="flip-hint">⟳ Click để lật lại</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
