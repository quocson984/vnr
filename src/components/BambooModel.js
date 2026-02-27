import { useState } from 'react';

const bambooData = {
    root: {
        label: '🌱 Gốc vững',
        color: '#2d5016',
        detail: 'Kiên định lập trường giai cấp công nhân, hướng tới mục tiêu độc lập dân tộc và CNXH. Hiện nay: nền tảng Mác - Lênin, tư tưởng Hồ Chí Minh, bảo vệ lợi ích quốc gia - dân tộc, độc lập, tự chủ và toàn vẹn lãnh thổ.'
    },
    trunk: {
        label: '🎋 Thân chắc',
        color: '#4a7c29',
        detail: 'Năm 1936, Đảng khơi dậy sức mạnh đại đoàn kết qua Mặt trận Dân chủ Đông Dương. Ngày nay: sức mạnh ngoại giao dựa trên thế và lực sau gần 40 năm đổi mới, sự đồng thuận của nhân dân và sức mạnh tổng hợp quốc gia.'
    },
    branch: {
        label: '🍃 Cành uyển chuyển',
        color: '#6db33f',
        detail: 'Như Đảng tận dụng chính sách Mặt trận Nhân dân Pháp để đấu tranh công khai thay vì cứng nhắc dùng bạo lực. Ngoại giao hiện đại: đa phương hóa, đa dạng hóa, làm bạn với tất cả, tận dụng luật pháp quốc tế, bảo vệ Tổ quốc "từ sớm, từ xa".'
    }
};

export default function BambooModel() {
    const [active, setActive] = useState(null);

    const handleClick = (key) => setActive(active === key ? null : key);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            {/* Bamboo Visual */}
            <div className="bamboo-container">
                {/* Branch/Leaves */}
                <div className="bamboo-segment" onClick={() => handleClick('branch')}>
                    <div className="bamboo-branch">
                        <div className="bamboo-leaf" style={{ '--r': '-30deg' }}></div>
                        <div className="bamboo-leaf" style={{ '--r': '15deg' }}></div>
                        <div className="bamboo-leaf" style={{ '--r': '-10deg' }}></div>
                        <div className="bamboo-leaf" style={{ '--r': '25deg' }}></div>
                        <div className="bamboo-leaf" style={{ '--r': '-20deg' }}></div>
                    </div>
                </div>
                {/* Trunk */}
                <div className="bamboo-segment" onClick={() => handleClick('trunk')}>
                    <div className="bamboo-trunk"></div>
                </div>
                {/* Root */}
                <div className="bamboo-segment" onClick={() => handleClick('root')}>
                    <div className="bamboo-root"></div>
                </div>
            </div>

            {/* Info Panel */}
            <div style={{ maxWidth: 360, minWidth: 260, flex: 1 }}>
                {active ? (
                    <div style={{
                        background: 'var(--color-background-dark)', border: '1px solid var(--color-accent-gold)',
                        borderRadius: 12, padding: '1.5rem', color: 'var(--color-background-light)',
                        animation: 'fadeInRight 0.3s ease-out'
                    }}>
                        <h4 style={{ color: 'var(--color-accent-gold)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                            {bambooData[active].label}
                        </h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.7, opacity: 0.9 }}>{bambooData[active].detail}</p>
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center', color: 'var(--color-accent-gold)', opacity: 0.6,
                        fontFamily: 'var(--font-display)', fontSize: '1rem', padding: '2rem'
                    }}>
                        👆 Nhấn vào các phần của cây tre để tìm hiểu triết lý "Ngoại giao Cây tre Việt Nam"
                    </div>
                )}
            </div>
        </div>
    );
}
