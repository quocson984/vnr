import { useEffect, useRef } from 'react';
import { Star, Shield } from 'lucide-react';
import './BaoCao.css';
import TimelineTrack from './components/TimelineTrack';
import FlipCards from './components/FlipCards';

import ForceBalance from './components/ForceBalance';
import StrategicPathways from './components/StrategicPathways';

import KnowledgeGraph from './components/KnowledgeGraph';
import PracticalConnection from './components/PracticalConnection';

/* ---- Fade-in on scroll hook ---- */
function useFadeIn() {
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) e.target.classList.add('visible');
        }, { threshold: 0.12 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return ref;
}
function FadeSection({ children, className = '', style = {} }) {
    const ref = useFadeIn();
    return <div ref={ref} className={`fade-in-section ${className}`} style={style}>{children}</div>;
}

/* ---- Parallax Quote ---- */
function ParallaxQuote({ text, bgUrl }) {
    return (
        <div className="parallax-quote" style={{ backgroundImage: `url(${bgUrl})` }}>
            <blockquote>{text}</blockquote>
        </div>
    );
}

/* ---- Section Header ---- */
function SectionHeader({ icon, title, subtitle, light = false }) {
    return (
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
            <h2 className="bc-heading" style={{ fontSize: '1.8rem', color: light ? 'var(--color-accent-gold)' : 'var(--color-primary)' }}>{title}</h2>
            {subtitle && <p style={{ fontSize: '0.95rem', opacity: 0.7, color: light ? 'var(--color-background-light)' : 'var(--color-background-dark)', maxWidth: 700, margin: '0 auto' }}>{subtitle}</p>}
            <div className="bc-divider" style={{ margin: '1rem auto' }}></div>
        </div>
    );
}

/* ======== MAIN COMPONENT ======== */
export default function BaoCaoNghienCuu() {

    return (
        <div style={{ transition: 'all 0.5s' }}>
            {/* Timeline sidebar */}
            <TimelineTrack />



            {/* ===== HERO ===== */}
            <header id="hero" className="bc-section" style={{ background: 'linear-gradient(135deg, #0f0506, #221012 50%, #1a0a0c)', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '4px solid var(--color-primary)' }}>
                <div style={{ textAlign: 'center', maxWidth: 850, padding: '0 1rem' }}>

                    <h1 className="bc-heading" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'var(--color-accent-gold)', lineHeight: 1.3, marginBottom: '1.5rem' }}>
                        Tiến trình định hình tư duy chiến lược<br />
                        <span style={{ color: 'var(--color-background-light)', fontSize: '0.7em' }}>của Đảng Cộng sản Việt Nam (1930–1939)</span>
                    </h1>
                    <p className="bc-text" style={{ maxWidth: 650, margin: '0 auto', fontSize: '1rem' }}>
                        Giá trị thực tiễn của nghệ thuật linh hoạt trong phương pháp cách mạng — và bài học cho sự nghiệp đổi mới hội nhập quốc tế hiện nay.
                    </p>

                </div>
            </header>

            {/* ===== PHẦN 1: BỐI CẢNH & SỰ RA ĐỜI ===== */}
            <section id="phan-boicang" className="bc-section" style={{ background: 'var(--color-parchment)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <img src="https://daknong.1cdn.vn/2020/12/23/baolamdong.vn-file-e7837c02845ffd04018473e6df282e92-dataimages-202012-original-_images2335718_t2.jpg" alt="Nguyễn Ái Quốc tại Đại hội Tours 1920" loading="lazy"
                                    style={{ borderRadius: 14, border: '3px solid rgba(212,175,55,0.3)', maxWidth: 500, width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' }} />
                                <p style={{ fontSize: '0.75rem', color: '#8b7355', fontStyle: 'italic', marginTop: '0.75rem' }}>
                                    Nguyễn Ái Quốc tại Đại hội Tours (1920) — Bỏ phiếu gia nhập Quốc tế III
                                </p>
                            </div>
                        </div>
                    </FadeSection>
                    <FadeSection>
                        <SectionHeader icon="" title="Bối cảnh lịch sử & Sự ra đời của Đảng" subtitle="Từ bế tắc của phong trào yêu nước đến bước ngoặt vĩ đại" />
                    </FadeSection>
                    <FadeSection>
                        <div className="bc-text bc-text-dark" style={{ columnCount: window.innerWidth > 768 ? 2 : 1, columnGap: '2rem' }}>
                            <p style={{ marginBottom: '1rem' }}>Từ nửa sau thế kỷ XIX, thực dân Pháp đã từng bước thôn tính Việt Nam, biến quốc gia phong kiến độc lập thành xứ thuộc địa nửa phong kiến. Qua hai cuộc khai thác thuộc địa (1897-1914 và 1919-1929), cấu trúc kinh tế - xã hội Việt Nam bị biến dạng sâu sắc, nảy sinh mâu thuẫn giai cấp và dân tộc vô cùng gay gắt.</p>
                            <p style={{ marginBottom: '1rem' }}>Các phong trào yêu nước từ Cần Vương, Phan Bội Châu, Phan Châu Trinh đến khởi nghĩa Yên Bái đều thất bại do thiếu đường lối chính trị khoa học và tổ chức tiên phong đủ sức gánh vác sứ mệnh lịch sử.</p>
                            <p style={{ marginBottom: '1rem' }}>Lãnh tụ <strong>Nguyễn Ái Quốc</strong> đã tìm ra con đường cứu nước đúng đắn: cách mạng vô sản. Thông qua Hội Việt Nam Cách mạng Thanh niên (6/1925) và tác phẩm "Đường Kách mệnh", Người truyền bá chủ nghĩa Mác-Lênin vào phong trào công nhân và phong trào yêu nước.</p>
                            <p>Ngày <strong>6/1/1930 – 7/2/1930</strong>, tại Hương Cảng (Trung Quốc), Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất thành <strong>Đảng Cộng sản Việt Nam</strong>, thông qua Cương lĩnh chính trị đầu tiên — chấm dứt hoàn toàn sự khủng hoảng về đường lối cứu nước.</p>
                        </div>
                    </FadeSection>

                </div>
            </section>

            {/* Parallax Quote 1 */}
            <ParallaxQuote
                text="Đảng Cộng sản Việt Nam ra đời là sản phẩm của sự kết hợp chủ nghĩa Mác - Lênin với phong trào công nhân và phong trào yêu nước Việt Nam."
                bgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Flag_of_the_Communist_Party_of_Vietnam.svg/1200px-Flag_of_the_Communist_Party_of_Vietnam.svg.png"
            />

            {/* ===== PHẦN 2: XÔ VIỆT NGHỆ TĨNH ===== */}
            <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--color-background-dark)', padding: '2rem 1rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                    <img src="https://cdn.baohatinh.vn/images/4ab6fef76a6ced68bdd666edf239af087d04be11770303063eb2bba07ac1ab09612b4bac8fad7ffc006932b8312fef2009f30210703764074c987dc91516691a27531a15dc8e1825296d2918eb09e561d26c11d7cf27cb5008dea0e6cda52235/tranh-ve-cao-trao-xo-viet-nghe-tinh-cua-tac-gia-nguyen-duc-nung.png" alt="Phong trào Xô Viết Nghệ Tĩnh" loading="lazy"
                        style={{ borderRadius: 12, border: '3px solid rgba(212,175,55,0.2)', maxWidth: 550, width: '100%', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }} />
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-accent-gold)', fontStyle: 'italic', marginTop: '0.75rem', opacity: 0.6 }}>
                        Tranh vẽ tái hiện phong trào Xô Viết Nghệ Tĩnh 1930-1931
                    </p>
                </div>
            </div>
            <section id="xoviet" className="bc-section" style={{ background: 'var(--color-background-dark)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <SectionHeader icon="⚔️" title="Cao trào 1930–1931 & Xô viết Nghệ Tĩnh" subtitle="Cuộc diễn tập đầu tiên và những bài học đắt giá" light />
                    </FadeSection>
                    <FadeSection>
                        <div className="bc-text">
                            <p style={{ marginBottom: '1rem' }}>Ngay sau khi thành lập, Đảng lãnh đạo cao trào 1930-1931 với đỉnh cao là <strong style={{ color: 'var(--color-accent-gold)' }}>Xô viết Nghệ - Tĩnh</strong>. Lần đầu tiên, liên minh công - nông được hình thành trong thực tiễn. Quần chúng phá bộ máy chính quyền địch, lập ủy ban tự quản, thực hiện quyền tự do dân chủ.</p>
                            <p style={{ marginBottom: '1rem' }}>Tuy nhiên, <strong style={{ color: '#fca5a5' }}>Luận cương chính trị (10/1930)</strong> do đồng chí Trần Phú khởi thảo mắc hạn chế "tả" khuynh: không đặt giải phóng dân tộc lên hàng đầu, thu hẹp lực lượng chỉ vào công-nông, không đánh giá đúng khả năng của tầng lớp tiểu tư sản và tư sản dân tộc.</p>
                            <p>Sau đàn áp đẫm máu (1931-1935), các chiến sĩ biến nhà tù thành trường học. Đại hội I (3/1935) tại Ma Cao đánh dấu sự phục hồi tổ chức, nhưng <em>chưa khắc phục được hạn chế của Luận cương</em>.</p>
                        </div>
                    </FadeSection>
                </div>
            </section>

            {/* ===== PHẦN 2B: KHỦNG BỐ TRẮNG 1931-1935 ===== */}
            <section id="khoiphuc" className="bc-section" style={{ background: 'linear-gradient(180deg, #1a0505, #0f0506)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <SectionHeader icon="" title="Khủng bố trắng & Phục hồi tổ chức (1931–1935)" subtitle="Giai đoạn đen tối nhất — khi máu và nước mắt trở thành lò rèn ý chí" light />
                    </FadeSection>
                    <FadeSection>
                        <div className="bc-text">
                            <p style={{ marginBottom: '1rem' }}>Sau Xô viết Nghệ Tĩnh, thực dân Pháp tiến hành <strong style={{ color: '#fca5a5' }}>khủng bố trắng</strong> trên quy mô chưa từng có. Hàng nghìn người bị bắt, tra tấn dã man, giam cầm trong các nhà tù khét tiếng: Hỏa Lò, Côn Đảo, Sơn La, Lao Bảo, Ban Mê Thuột...</p>
                        </div>
                    </FadeSection>
                    <FadeSection>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', margin: '1rem 0 1.5rem' }}>
                            <div style={{ textAlign: 'center', flex: '0 1 280px' }}>
                                <img src="https://icdn.dantri.com.vn/thumb_w/960/075af8604d/2017/11/03/img20171103162521210-c1680.jpg" alt="Chuồng cọp nhà tù Côn Đảo" loading="lazy"
                                    style={{ borderRadius: 10, border: '2px solid rgba(252,165,165,0.3)', width: '100%', height: 200, objectFit: 'cover', boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }} />
                                <p style={{ fontSize: '0.68rem', color: '#fca5a5', fontStyle: 'italic', marginTop: '0.5rem', opacity: 0.7 }}>"Chuồng cọp" — Côn Đảo</p>
                            </div>
                            <div style={{ textAlign: 'center', flex: '0 1 200px' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/%E1%BA%A2nh_ch%E1%BB%A5p_L%C3%BD_T%E1%BB%B1_Tr%E1%BB%8Dng_%281914-1931%29.jpg" alt="Lý Tự Trọng" loading="lazy"
                                    style={{ borderRadius: 10, border: '2px solid rgba(252,165,165,0.3)', width: '100%', height: 200, objectFit: 'cover', boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }} />
                                <p style={{ fontSize: '0.68rem', color: '#fca5a5', fontStyle: 'italic', marginTop: '0.5rem', opacity: 0.7 }}>Lý Tự Trọng (1914-1931)</p>
                            </div>
                        </div>
                    </FadeSection>

                    {/* Timeline of repression */}
                    <FadeSection>
                        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                            {[
                                { year: '1931', title: 'Bắt bớ hàng loạt', detail: 'Hàng nghìn cán bộ, đảng viên và quần chúng cách mạng bị bắt. Các cơ sở Đảng ở nhiều nơi bị phá vỡ hoàn toàn. Tổng Bí thư Trần Phú bị bắt và hy sinh trong tù (9/1931).' },
                                { year: '1931-1932', title: 'Hy sinh và tù đày', detail: 'Nhiều nhà lãnh đạo chủ chốt bị xử tử hoặc chết trong tù: Trần Phú, Lý Tự Trọng, Nguyễn Đức Cảnh, Hồ Tùng Mậu bị bắt... Lực lượng nòng cốt gần như bị tiêu diệt.' },
                                { year: '1932-1933', title: 'Tổ chức tan rã', detail: 'Hầu hết Xứ ủy, Tỉnh ủy bị vỡ. Liên lạc với Quốc tế Cộng sản bị cắt đứt. Ban lãnh đạo Trung ương phải tái lập nhiều lần. Phong trào cách mạng lắng xuống mức thấp nhất.' },
                                { year: '1933-1935', title: 'Nhà tù — Trường học cách mạng', detail: 'Các chiến sĩ biến ngục tù thành trường học: Lớp lý luận Mác-Lênin, học ngoại ngữ, rèn luyện ý chí. Côn Đảo trở thành "trường Đại học cách mạng". Từ đây rèn luyện ra thế hệ lãnh đạo tương lai.' },
                                { year: '3/1935', title: 'Đại hội I — Phục hồi', detail: 'Đại hội đại biểu lần I tại Ma Cao (Trung Quốc). Bầu BCH Trung ương mới, khôi phục liên lạc với Quốc tế Cộng sản. Đánh dấu sự phục hồi tổ chức sau 4 năm đen tối, nhưng chưa khắc phục được hạn chế của Luận cương 10/1930.' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                                    background: 'rgba(255,255,255,0.03)', borderRadius: 12,
                                    padding: '1rem 1.25rem', border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60 }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fca5a5', fontFamily: "'Newsreader', serif", padding: '0.3rem 0.5rem', borderRadius: 6, background: 'rgba(252,165,165,0.1)', border: '1px solid rgba(252,165,165,0.2)' }}>{item.year}</span>
                                    </div>
                                    <div>
                                        <h4 style={{ fontFamily: "'Newsreader', serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-accent-gold)', marginBottom: '0.3rem' }}>{item.title}</h4>
                                        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeSection>

                    <FadeSection>
                        <div style={{
                            marginTop: '1.5rem', padding: '1rem 1.25rem', borderRadius: 12,
                            background: 'rgba(252,165,165,0.08)', border: '1px solid rgba(252,165,165,0.2)',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontFamily: "'Newsreader', serif", fontSize: '0.88rem', color: '#fca5a5', fontWeight: 700 }}>
                                Kết cục: Phong trào cách mạng bị dìm trong biển máu. Nhưng chính giai đoạn đen tối này đã rèn luyện ra thế hệ cán bộ "thép" — những con người kiên trung sẽ dẫn dắt Cách mạng Tháng Tám.
                            </p>
                        </div>
                    </FadeSection>
                </div>
            </section>

            {/* ===== PHẦN 3: SỰ CHUYỂN HƯỚNG 1936-1939 ===== */}
            <section id="chuyenhuong" className="bc-section" style={{ background: 'var(--color-parchment)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <SectionHeader icon="🔄" title="Sự chuyển hướng chiến lược 1936–1939" subtitle="Từ bạo động vũ trang sang đấu tranh dân sinh, dân chủ" />
                    </FadeSection>
                    <FadeSection>
                        <div className="bc-text bc-text-dark">
                            <p style={{ marginBottom: '1rem' }}>Giữa thập niên 1930, chủ nghĩa phát xít trỗi dậy tại Đức, Ý, Nhật. Đại hội VII Quốc tế Cộng sản (7/1935) chỉ đạo thành lập <strong>Mặt trận Nhân dân</strong> rộng rãi chống phát xít. Mặt trận Nhân dân Pháp thắng cử, nới lỏng chính sách thuộc địa.</p>
                            <p style={{ marginBottom: '1.5rem' }}>Tháng 7/1936, Hội nghị BCH Trung ương Đảng tại Thượng Hải đã vạch ra chuyển hướng lịch sử trên 3 phương diện:</p>
                        </div>
                    </FadeSection>

                    {/* INTERACTIVE: Knowledge Graph */}
                    <FadeSection>
                        <div style={{ background: 'var(--color-background-dark)', borderRadius: 16, padding: '2rem 1rem', marginBottom: '2.5rem' }}>
                            <h3 style={{ textAlign: 'center', color: 'var(--color-accent-gold)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1rem' }}>🔗 Chuỗi Nhân – Quả: Từ Quốc tế đến Đông Dương</h3>
                            <KnowledgeGraph />
                        </div>
                    </FadeSection>

                    {/* INTERACTIVE: Flip Cards */}
                    <FadeSection>
                        <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>🃏 So sánh Chiến lược: Lật thẻ để thấy sự thay đổi</h3>
                        <FlipCards />
                    </FadeSection>
                </div>
            </section>

            {/* Parallax Quote 2 */}
            <ParallaxQuote
                text="Cuộc dân tộc giải phóng không nhất thiết phải kết chặt với cuộc cách mạng điền địa. Phải chọn kẻ thù chính, nguy hiểm nhất để tập trung lực lượng toàn dân tộc đánh đổ."
                bgUrl="https://i.makeagif.com/media/10-26-2020/0AAwg8.gif"
            />

            {/* ===== PHẦN 4: PHÂN TÍCH - VÌ SAO DÂN CHỦ? ===== */}
            <section id="danchu" className="bc-section" style={{ background: 'var(--color-surface-dark)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <SectionHeader icon="🧠" title="Vì sao con đường Dân chủ 1936-1939 là tối ưu?" subtitle="Phân tích chuyên sâu 4 yếu tố nền tảng" light />
                    </FadeSection>

                    {/* INTERACTIVE: Force Balance */}
                    <FadeSection>
                        <h3 style={{ color: 'var(--color-accent-gold)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '0.5rem' }}>⚖️ Cán cân Tương quan Lực lượng năm 1936</h3>
                        <ForceBalance />
                    </FadeSection>

                    <FadeSection>
                        <div className="bc-text" style={{ marginTop: '2rem' }}>
                            <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--color-accent-gold)' }}>1. Chênh lệch tuyệt đối về lực lượng quân sự:</strong> Quân đội viễn chinh Pháp, hệ thống mật thám vẫn nguyên vẹn. Lực lượng cách mạng mới phục hồi, chưa có vũ trang.</p>
                            <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--color-accent-gold)' }}>2. Chưa có "tình thế cách mạng" chín muồi:</strong> Chính quyền thực dân chưa suy yếu đến mức tê liệt; quần chúng chưa được tổ chức đồng bộ đến mức sẵn sàng chiến tranh nhân dân.</p>
                            <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--color-accent-gold)' }}>3. Tận dụng dư địa pháp lý:</strong> Chính phủ Mặt trận Nhân dân Pháp nới lỏng tự do báo chí, hội họp — cơ hội hiếm hoi để tuyên truyền Mác-Lênin công khai.</p>
                            <p><strong style={{ color: 'var(--color-accent-gold)' }}>4. Chuẩn bị cho Tổng khởi nghĩa:</strong> Xây dựng "đạo quân chính trị" hàng triệu người — lực lượng nền tảng cho Cách mạng Tháng Tám 1945.</p>
                        </div>
                    </FadeSection>

                    {/* INTERACTIVE: Strategic Pathways Explorer */}
                    <FadeSection style={{ marginTop: '2.5rem' }}>
                        <h3 style={{ color: 'var(--color-accent-gold)', fontFamily: 'var(--font-display)', fontSize: '1.15rem', textAlign: 'center', marginBottom: '1rem' }}>🧭 Phân tích các Hướng đi Chiến lược & Hậu quả Lịch sử</h3>
                        <StrategicPathways />
                    </FadeSection>
                </div>
            </section>


            {/* Historic Image before Statistics */}
            <FadeSection>
                <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--color-background-dark)', padding: '2rem 1rem 0' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Phan_%C4%90%C4%83ng_L%C6%B0u_during_the_democratic_movement_of_1936-1939_in_Hue.jpg" alt="Phong trào dân chủ Đông Dương 1936-1939" loading="lazy"
                            style={{ borderRadius: 12, border: '3px solid rgba(212,175,55,0.2)', maxWidth: 520, width: '100%', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }} />
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-accent-gold)', fontStyle: 'italic', marginTop: '0.75rem', opacity: 0.7 }}>
                            Quần chúng nhân dân mít tinh đòi dân sinh, dân chủ (1936-1939)
                        </p>
                    </div>
                </div>
            </FadeSection>

            {/* ===== THÀNH TỰU PHONG TRÀO 1936-1939 ===== */}
            <section className="bc-section" style={{ background: 'var(--color-background-dark)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <SectionHeader icon="📊" title="Thành tựu Phong trào Dân chủ 1936–1939" subtitle="Những con số chứng minh sức mạnh của nghệ thuật linh hoạt" light />
                    </FadeSection>
                    <FadeSection>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                            {[
                                { number: '600+', label: 'Cuộc đấu tranh', detail: 'Bãi công, biểu tình, mít tinh đòi dân sinh dân chủ trên toàn Đông Dương', icon: '✊' },
                                { number: '500.000+', label: 'Người tham gia', detail: 'Quần chúng trực tiếp tham gia phong trào tại Bắc Kỳ, Trung Kỳ, Nam Kỳ', icon: '👥' },
                                { number: '40+', label: 'Tờ báo công khai', detail: 'Dân Chúng, Tin Tức, Lao Động, Notre Voix, Le Peuple... bằng tiếng Việt và tiếng Pháp', icon: '📰' },
                                { number: '3', label: 'Cuộc vận động lớn', detail: 'Đón phái đoàn J. Godart, Đại hội Đông Dương, Đòi triệu tập Hội nghị Dân nguyện', icon: '🏛️' },
                                { number: '20+', label: 'Hội quần chúng', detail: 'Hội Ái hữu, Tương tế, Hội đọc sách, Hội thể thao... tổ chức công khai, hợp pháp', icon: '🤝' },
                                { number: '2', label: 'Đảng viên vào Viện Dân biểu', detail: 'Đảng đưa người ra ứng cử vào Viện Dân biểu Trung Kỳ, biến nghị trường thành trận địa', icon: '🗳️' },
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)',
                                    borderRadius: 14, padding: '1.5rem 1rem', textAlign: 'center',
                                    transition: 'all 0.3s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.12)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.06)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; }}
                                >
                                    <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{stat.icon}</div>
                                    <div style={{ fontFamily: "'Newsreader', serif", fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-accent-gold)', lineHeight: 1 }}>{stat.number}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', marginTop: '0.3rem', marginBottom: '0.4rem' }}>{stat.label}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{stat.detail}</div>
                                </div>
                            ))}
                        </div>
                    </FadeSection>
                    <FadeSection>
                        <div style={{
                            padding: '1rem 1.25rem', borderRadius: 12,
                            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontFamily: "'Newsreader', serif", fontSize: '0.88rem', color: '#86efac', fontWeight: 700 }}>
                                🌟 Ý nghĩa: Phong trào 1936-1939 đã rèn luyện "đạo quân chính trị" hàng triệu người — lực lượng nòng cốt chuyển hóa vào Mặt trận Việt Minh, tiến tới Tổng khởi nghĩa Tháng Tám 1945.
                            </p>
                        </div>
                    </FadeSection>
                </div>
            </section>

            {/* Parallax Quote 3 */}
            <ParallaxQuote
                text="Kiên định về nguyên tắc, linh hoạt về sách lược — Bài học mang tính quy luật xuyên suốt lịch sử cách mạng Việt Nam."
                bgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ho_Chi_Minh_1946.jpg/440px-Ho_Chi_Minh_1946.jpg"
            />

            {/* ===== PHẦN: LIÊN HỆ THỰC TIỄN HIỆN NAY ===== */}
            <section id="lienhe" className="bc-section" style={{ background: 'var(--color-surface-dark)' }}>
                <div className="bc-container">
                    <FadeSection>
                        <SectionHeader icon="🌍" title="Liên hệ thực tiễn hiện nay" subtitle="Tư duy 1936 trong thời đại mới — Kiên định mục tiêu, linh hoạt phương pháp" light />
                    </FadeSection>
                    <FadeSection>
                        <PracticalConnection />
                    </FadeSection>
                </div>
            </section>
            <section id="ketluan" className="bc-section" style={{ background: 'linear-gradient(135deg, #7f1d1d, var(--color-primary) 60%, #dc2626)', textAlign: 'center' }}>
                <div className="bc-container">
                    <FadeSection>
                        <Shield className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--color-accent-gold)' }} />
                        <h2 className="bc-heading" style={{ fontSize: '1.8rem', color: 'var(--color-background-light)' }}>Kết luận</h2>
                        <div className="bc-divider" style={{ margin: '1rem auto', background: 'var(--color-accent-gold)' }}></div>
                        <div className="bc-text" style={{ maxWidth: 750, margin: '0 auto', textAlign: 'left' }}>
                            <p style={{ marginBottom: '1rem' }}>Sự chuyển hướng chiến lược 1936-1939 không mang tính ngẫu nhiên hay thỏa hiệp, mà là kết tinh của phân tích khoa học về tương quan lực lượng, nhận diện chính xác kẻ thù, và tận dụng tối đa không gian pháp lý.</p>
                            <p style={{ marginBottom: '1rem' }}>Cao trào dân chủ 1936-1939 — <strong style={{ color: 'var(--color-accent-gold)' }}>cuộc diễn tập bản lề</strong> — đã xây dựng "đạo quân chính trị" hàng triệu người, dọn đường cho thắng lợi vĩ đại Cách mạng Tháng Tám 1945.</p>
                            <p style={{ fontStyle: 'italic', color: 'var(--color-accent-gold)' }}>Bài học "nắm bắt thời cơ, linh hoạt trong phương pháp cách mạng" đang được vận dụng sinh động qua trường phái Ngoại giao cây tre — bảo đảm vững chắc để Việt Nam bảo vệ Tổ quốc từ sớm, từ xa, vươn tới mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh.</p>
                        </div>
                    </FadeSection>
                    <FadeSection>
                        <Star className="w-10 h-10 mx-auto mt-8" style={{ color: 'var(--color-accent-gold)', fill: 'var(--color-accent-gold)' }} />
                    </FadeSection>
                </div>
            </section>
        </div>
    );
}
