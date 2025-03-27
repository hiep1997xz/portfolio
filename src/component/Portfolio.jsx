import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { images } from "../assets/images";

const projects = [
  {
    title: "Vtruyện",
    description:
      "Nền tảng đọc truyện tranh trực tuyến với hơn 10,000+ tác phẩm. Tích hợp tính năng đọc offline, bookmark và theo dõi truyện yêu thích. Hỗ trợ đa nền tảng với giao diện thân thiện.",
    image: images.image1,
    tags: ["React", "Node.js", "MongoDB"],
    features: [
      "Đọc offline",
      "Bookmark",
      "Theo dõi truyện",
      "Tìm kiếm nâng cao",
    ],
    stats: "10,000+ tác phẩm, 50,000+ người dùng hàng tháng",
  },
  {
    title: "Family Voice",
    description:
      "Ứng dụng kết nối gia đình qua tin nhắn thoại và hình ảnh. Tích hợp album ảnh gia đình, chia sẻ khoảnh khắc và tạo nhật ký chung. Bảo mật cao với xác thực hai lớp.",
    image: images.image2,
    tags: ["React", "Firebase", "Cloud Storage"],
    features: ["Chat nhóm", "Album ảnh", "Nhật ký", "Thông báo"],
    stats: "20,000+ gia đình đang sử dụng",
  },
  {
    title: "Movies VMS",
    description:
      "Hệ thống quản lý rạp chiếu phim hiện đại với tính năng đặt vé trực tuyến, quản lý suất chiếu và thống kê doanh thu. Tích hợp thanh toán điện tử và hệ thống khuyến mãi.",
    image: images.image3,
    tags: ["Vue", "MongoDB", "Express"],
    features: ["Đặt vé online", "Quản lý suất chiếu", "Báo cáo doanh thu"],
    stats: "Phục vụ 5 cụm rạp lớn",
  },
  {
    title: "IniStory",
    description:
      "Nền tảng sáng tạo và chia sẻ truyện tương tác. Người dùng có thể tạo các câu chuyện với nhiều nhánh kết thúc khác nhau. Hỗ trợ tích hợp hình ảnh và âm thanh.",
    image: images.image5,
    tags: ["Vue", "MongoDB", "AWS"],
    features: ["Tạo truyện tương tác", "Thư viện media", "Thống kê tương tác"],
    stats: "1,000+ tác giả hoạt động",
  },
  {
    title: "IniStory App",
    description:
      "Ứng dụng di động cho nền tảng IniStory với trải nghiệm đọc truyện mượt mà trên thiết bị di động. Hỗ trợ đọc offline và đồng bộ dữ liệu đa thiết bị.",
    image: images.image6,
    tags: ["Vue Native", "MongoDB", "React Native"],
    features: ["Đọc offline", "Đồng bộ đa thiết bị", "Tùy chỉnh giao diện"],
    stats: "100,000+ lượt tải về",
  },
];

// Tạo component Page riêng cho từng trang
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page-wrapper" ref={ref}>
      <div className="page">
        <div className="page-content">
          <div className="gradient-background"></div>
          <div className="project-container">
            <div className="project-image-container">
              <img
                src={props.project.image}
                alt={props.project.title}
                className="project-image"
              />
            </div>
            <div className="project-details">
              <h3 className="project-title">{props.project.title}</h3>
              <p className="project-description">{props.project.description}</p>
              <div className="features-list">
                <h4>Tính năng chính:</h4>
                <ul>
                  {props.project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="project-stats">
                <strong>Thống kê: </strong>
                {props.project.stats}
              </div>
              <div className="tags-container">
                {props.project.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="page-number">{props.number}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Portfolio() {
  const [search, setSearch] = useState("");
  const bookRef = useRef();

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("My Project Portfolio", 10, 20);

    filteredProjects.forEach((p, index) => {
      const yPos = 40 + index * 30;
      doc.setFontSize(16);
      doc.text(`${index + 1}. ${p.title}`, 10, yPos);
      doc.setFontSize(12);
      doc.text(p.description, 10, yPos + 10);
      doc.text(`Tags: ${p.tags.join(", ")}`, 10, yPos + 20);
    });
    doc.save("portfolio.pdf");
  };

  return (
    <div className="container">
      <div className="inner-container">
        <div className="fixed-controls">
          <button
            onClick={() => bookRef.current.pageFlip().flipPrev()}
            className="control-button"
          >
            ←
          </button>
          <button
            onClick={() => bookRef.current.pageFlip().flipNext()}
            className="control-button"
          >
            →
          </button>
          <input
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="control-button" onClick={exportPDF}>
            📑
          </button>
        </div>
        <div className="book-container">
          <HTMLFlipBook
            width={700}
            height={1000}
            size="stretch"
            showCover={false}
            mobileScrollSupport={true}
            className="book-container"
            ref={bookRef}
            style={{
              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              background: "#e6e7e8",
            }}
            flippingTime={800}
            usePortrait={true}
            startPage={0}
            drawShadow={true}
            useMouseEvents={true}
            renderOnlyPageLengths={true}
            swipeDistance={0}
            showPageCorners={true}
            disableFlipByClick={false}
            maxShadowOpacity={0.7}
            autoSize={true}
            clickEventForward={true}
            onFlip={(e) => {
              const pages = document.querySelectorAll(".page");
              pages.forEach((page) => {
                page.classList.remove("--turning");
              });
              if (e.data) {
                const currentPage = pages[e.data];
                if (currentPage) {
                  currentPage.classList.add("--turning");
                }
              }
            }}
          >
            <div
              className="company-info"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <div style={{ position: "absolute", top: "40%", left: "20%" }}>
                <h1>Công ty cổ phần INISOFT</h1>
                <p>Chuyên cung cấp các giải pháp phần mềm</p>
              </div>
            </div>
            {filteredProjects.map((project, index) => (
              <Page key={index} project={project} number={`${index + 1}`} />
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}
