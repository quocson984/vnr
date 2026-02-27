export default function MagnifyGallery() {
    const items = [
        {
            src: 'https://upload.wikimedia.org/wikipedia/vi/e/ea/DanChungNewspaper.jpg',
            caption: 'Báo Dân Chúng - Cơ quan ngôn luận của Đảng thời kỳ 1936-1939',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ho_Chi_Minh_1946.jpg/440px-Ho_Chi_Minh_1946.jpg',
            caption: 'Lãnh tụ Nguyễn Ái Quốc - Người tìm ra con đường cứu nước',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Phan_%C4%90%C4%83ng_L%C6%B0u_during_the_democratic_movement_of_1936-1939_in_Hue.jpg',
            caption: 'Phong trào dân chủ 1936-1939 tại Huế',
        },
        {
            src: 'https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf8c9f0799f0314b2408892979adb2b810ca00aaa2341c4ef6cf646fe9f2edba98c7b90039ce2bdb94053fcb33b55087238d0bed7a0628d21f8d0cceed6c58ecfc248b9382a8c3d1e37736b78a1be2bbad7/5f6a5d98dba55ee2dfe4df1b5e44ae7e.jpg.webp',
            caption: 'Xô viết Nghệ Tĩnh 1930 - Cuộc diễn tập đầu tiên',
        },
    ];

    return (
        <div className="mag-gallery">
            {items.map((item, i) => (
                <div key={i} className="mag-item">
                    <img src={item.src} alt={item.caption} loading="lazy" />
                    <div className="mag-caption">{item.caption}</div>
                </div>
            ))}
        </div>
    );
}
