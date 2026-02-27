import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const scenarios = [
    {
        situation: 'Năm 1936: Chủ nghĩa phát xít trỗi dậy, Mặt trận Nhân dân Pháp lên nắm quyền và nới lỏng chính sách thuộc địa. Lực lượng Đảng mới phục hồi sau đợt khủng bố trắng. Bạn sẽ chọn sách lược nào?',
        options: [
            {
                text: '🗡️ Phát động khởi nghĩa vũ trang ngay lập tức để giành chính quyền',
                correct: false,
                feedback: 'SAI! Lực lượng vũ trang gần như chưa tồn tại, hệ thống tổ chức Đảng mới phục hồi mỏng manh. Khởi nghĩa lúc này là "manh động tiểu tư sản", quần chúng sẽ bị cỗ máy chiến tranh thực dân nghiền nát. Cần bảo toàn lực lượng!',
            },
            {
                text: '📢 Chuyển sang đấu tranh dân sinh, dân chủ công khai, tận dụng không gian pháp lý',
                correct: true,
                feedback: 'CHÍNH XÁC! Đây là quyết định kiệt tác của Đảng. Tận dụng khe hở pháp lý để tuyên truyền, giáo dục quần chúng, xây dựng "đạo quân chính trị" hàng triệu người - chuẩn bị cho Cách mạng Tháng Tám 1945.',
            },
            {
                text: '🏳️ Giải tán Đảng, chấp nhận ách thống trị của Pháp, chờ thêm vài chục năm',
                correct: false,
                feedback: 'SAI! Đây là tư tưởng đầu hàng, phản bội lý tưởng cách mạng. Đảng không bao giờ từ bỏ mục tiêu chiến lược giải phóng dân tộc, mà chỉ linh hoạt thay đổi sách lược phù hợp tình hình.',
            },
        ],
    },
    {
        situation: 'Trong phong trào dân chủ 1936-1939, bạn cần quyết định cách tập hợp lực lượng. Trước đó (1930-1935), Luận cương chỉ tập trung liên minh Công-Nông. Bạn sẽ làm gì?',
        options: [
            {
                text: '👷 Chỉ tập hợp công nhân và nông dân, loại bỏ mọi tầng lớp khác',
                correct: false,
                feedback: 'SAI! Đây chính là hạn chế "tả khuynh" của Luận cương 10/1930. Thu hẹp lực lượng sẽ cô lập Đảng và làm yếu phong trào cách mạng.',
            },
            {
                text: '🤝 Thành lập Mặt trận Dân chủ rộng rãi, kéo cả tiểu tư sản, tư sản dân tộc, địa chủ yêu nước',
                correct: true,
                feedback: 'CHÍNH XÁC! Mặt trận Dân chủ Đông Dương tập hợp MỌI giai cấp tiến bộ. Đây là bước nhảy vọt về tư duy, tạo ra cơn bão táp chính trị lôi cuốn hàng triệu người!',
            },
            {
                text: '💰 Chỉ hợp tác với tư sản và trí thức giàu có, bỏ qua công nông',
                correct: false,
                feedback: 'SAI! Công nhân và nông dân là "gốc" của cách mạng. Không thể xây dựng lực lượng cách mạng mà bỏ qua nền tảng giai cấp công nhân.',
            },
        ],
    }
];

export default function DecisionSimulator() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleSelect = (idx) => {
        if (selected !== null) return;
        setSelected(idx);
        if (scenarios[currentQ].options[idx].correct) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQ < scenarios.length - 1) {
            setCurrentQ(q => q + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return (
            <div className="decision-card" style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--color-surface-dark)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent-gold)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Kết quả: {score}/{scenarios.length}
                </h3>
                <p style={{ color: 'var(--color-background-light)', opacity: 0.8, fontSize: '0.9rem' }}>
                    {score === scenarios.length
                        ? 'Xuất sắc! Bạn có tư duy chiến lược sắc bén như các nhà lãnh đạo Đảng!'
                        : 'Hãy tìm hiểu thêm về nghệ thuật linh hoạt trong phương pháp cách mạng.'}
                </p>
                <button
                    onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); }}
                    style={{
                        marginTop: '1rem', padding: '0.7rem 2rem', borderRadius: 8,
                        background: 'var(--color-primary)', color: 'white', fontWeight: 700,
                        border: 'none', cursor: 'pointer', fontSize: '0.9rem'
                    }}
                >Chơi lại</button>
            </div>
        );
    }

    const q = scenarios[currentQ];

    return (
        <div className="decision-card" style={{ background: 'var(--color-surface-dark)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-accent-gold)', fontWeight: 700, fontSize: '0.8rem' }}>
                    CÂU HỎI {currentQ + 1}/{scenarios.length}
                </span>
                <span style={{ color: 'var(--color-background-light)', opacity: 0.5, fontSize: '0.75rem' }}>
                    Điểm: {score}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: 'var(--color-accent-gold)', marginTop: 3 }} />
                <p style={{ color: 'var(--color-background-light)', fontSize: '0.92rem', lineHeight: 1.7 }}>{q.situation}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((opt, i) => (
                    <div
                        key={i}
                        className={`decision-option ${selected === i ? (opt.correct ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleSelect(i)}
                        style={{ cursor: selected !== null ? 'default' : 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {selected === i && opt.correct && <CheckCircle2 className="w-5 h-5" style={{ color: '#22c55e', flexShrink: 0 }} />}
                            {selected === i && !opt.correct && <XCircle className="w-5 h-5" style={{ color: '#ef4444', flexShrink: 0 }} />}
                            <span style={{ color: 'var(--color-background-light)', fontSize: '0.85rem' }}>{opt.text}</span>
                        </div>
                        {selected !== null && selected === i && (
                            <p style={{
                                marginTop: '0.75rem', padding: '0.75rem', borderRadius: 8,
                                background: opt.correct ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                color: opt.correct ? '#86efac' : '#fca5a5', fontSize: '0.8rem', lineHeight: 1.6
                            }}>{opt.feedback}</p>
                        )}
                    </div>
                ))}
            </div>

            {selected !== null && (
                <button
                    onClick={handleNext}
                    style={{
                        marginTop: '1.25rem', padding: '0.6rem 2rem', borderRadius: 8,
                        background: 'var(--color-accent-gold)', color: 'var(--color-background-dark)',
                        fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem'
                    }}
                >{currentQ < scenarios.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}</button>
            )}
        </div>
    );
}
