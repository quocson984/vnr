import { useEffect, useState } from 'react';

const milestones = [
  { id: 'hero', year: '1858', label: 'Pháp xâm lược' },
  { id: 'phan-boicang', year: '1930', label: 'Thành lập Đảng' },
  { id: 'xoviet', year: '1930-31', label: 'Xô viết Nghệ Tĩnh' },
  { id: 'khoiphuc', year: '1932-35', label: 'Khôi phục tổ chức' },
  { id: 'chuyenhuong', year: '1936', label: 'Chuyển hướng CL' },
  { id: 'danchu', year: '1936-39', label: 'Phong trào Dân chủ' },
  { id: 'lienhe', year: 'Nay', label: 'Liên hệ hiện tại' },
  { id: 'ketluan', year: 'Kết', label: 'Kết luận' },
];

export default function TimelineTrack() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let newIdx = 0;
      for (let i = 0; i < milestones.length; i++) {
        const el = document.getElementById(milestones[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            newIdx = i;
          }
        }
      }
      setActiveIdx(newIdx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="timeline-track">
      {milestones.map((m, i) => (
        <div key={m.id}>
          <div
            className={`timeline-dot ${i <= activeIdx ? 'active' : ''}`}
            onClick={() => scrollTo(m.id)}
            title={m.label}
          >
            <span className="timeline-label">{m.year}</span>
          </div>
          {i < milestones.length - 1 && (
            <div className={`timeline-line ${i < activeIdx ? 'active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}
