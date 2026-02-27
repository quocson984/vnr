import { useState } from 'react';

const classes = [
    { id: 'congNhan', label: '👷 Công nhân', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
    { id: 'nongDan', label: '🌾 Nông dân', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    { id: 'tieuTuSan', label: '📚 Tiểu tư sản', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    { id: 'tuSanDanToc', label: '🏭 Tư sản dân tộc', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
    { id: 'diaChuyenNuoc', label: '🏠 Địa chủ yêu nước', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    { id: 'triThuc', label: '🎓 Trí thức', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
];

export default function DragDropUnity() {
    const [placed, setPlaced] = useState([]);
    const [dragOver, setDragOver] = useState(false);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        if (!placed.includes(id)) {
            setPlaced(prev => [...prev, id]);
        }
        setDragOver(false);
    };

    const handleClick = (id) => {
        if (!placed.includes(id)) {
            setPlaced(prev => [...prev, id]);
        }
    };

    const isComplete = placed.length === classes.length;

    return (
        <div>
            {/* Source chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {classes.map(c => (
                    <div
                        key={c.id}
                        draggable={!placed.includes(c.id)}
                        onDragStart={(e) => handleDragStart(e, c.id)}
                        onClick={() => handleClick(c.id)}
                        className={`dnd-chip ${placed.includes(c.id) ? 'placed' : ''}`}
                        style={{
                            background: c.bg, color: c.color, borderColor: c.color,
                            border: `2px solid ${placed.includes(c.id) ? 'transparent' : c.color}`
                        }}
                    >
                        {c.label}
                    </div>
                ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-accent-gold)', opacity: 0.6, marginBottom: '1rem' }}>
                👆 Kéo thả (hoặc nhấn) các giai cấp vào Mặt trận bên dưới
            </p>

            {/* Drop zone */}
            <div
                className={`dnd-zone ${dragOver ? 'drag-over' : ''} ${isComplete ? 'complete glow-success' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                {placed.length === 0 ? (
                    <span style={{ color: 'var(--color-accent-gold)', opacity: 0.4, fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>
                        🏛️ MẶT TRẬN DÂN CHỦ ĐÔNG DƯƠNG
                    </span>
                ) : (
                    <>
                        {placed.map(id => {
                            const c = classes.find(x => x.id === id);
                            return (
                                <div key={id} className="dnd-chip" style={{ background: c.bg, color: c.color, borderColor: c.color, border: `2px solid ${c.color}`, animation: 'slideUp 0.3s ease-out' }}>
                                    {c.label}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {isComplete && (
                <div style={{
                    textAlign: 'center', marginTop: '1.5rem', padding: '1.25rem', borderRadius: 12,
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                    animation: 'slideUp 0.4s ease-out'
                }}>
                    <p style={{ color: '#86efac', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        🎉 Tập hợp thành công Mặt trận Dân chủ Đông Dương!
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                        Đây chính là bước nhảy vọt: từ chỉ tập trung liên minh Công-Nông sang xây dựng khối đại đoàn kết toàn dân tộc, lôi cuốn hàng triệu người vào phong trào cách mạng!
                    </p>
                </div>
            )}
        </div>
    );
}
