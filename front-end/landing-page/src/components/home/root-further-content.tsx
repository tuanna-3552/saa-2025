const BODY_TEXT_1 = `Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ khách hàng, Sun* lựa chọn chiến lược đa dạng hóa năng lực để không chỉ nỗ lực trở thành tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, nơi mọi Sunner đều là "problem-solver" - chuyên gia trong việc giải quyết mọi vấn đề, tìm lời giải cho mọi bài toán của dự án, khách hàng và xã hội.\nLấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt cùng tinh thần đào sâu để bứt phá trong kỷ nguyên AI, "Root Further" đã được chọn để trở thành chủ đề chính thức của Lễ trao giải Sun* Annual Awards 2025.\nVượt ra khỏi nét nghĩa bề mặt, "Root Further" chính là hành trình chúng ta không ngừng vươn xa hơn, cắm rễ mạnh hơn, chạm đến những tầng "địa chất" ẩn sâu để tiếp tục tồn tại, vươn lên và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*. Mượn hình ảnh bộ rễ liên tục đâm sâu vào lòng đất, mạnh mẽ len lỏi qua từng lớp "trầm tích" để thẩm thấu những gì tinh tuý nhất, người Sun* cũng đang "hấp thụ" dưỡng chất từ thời đại và những thử thách của thị trường để làm mới mình mỗi ngày, mở rộng năng lực và mạnh mẽ "bén rễ" vào kỷ nguyên AI - một tầng "địa chất" hoàn toàn mới, phức tạp và khó đoán, nhưng cũng hội tụ vô vàn tiềm năng cùng cơ hội.`;

const QUOTE_TEXT = `"A tree with deep roots fears no storm"\n(Cây sâu bén rễ, bão giông chẳng nề - Ngạn ngữ Anh)`;

const BODY_TEXT_2 = `Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức với những cá nhân tự tin vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách, làm chủ sự thay đổi là tổ chức không chỉ vững vàng trước biến động, mà còn khai thác được mọi lợi thế, chinh phục các thách thức của thời cuộc. Không đơn thuần là tên gọi của chương mới trên hành trình phát triển tổ chức, "Root Further" còn như một lời cổ vũ, động viên mỗi chúng ta hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám phá bỏ giới hạn, dám trở thành phiên bản đa nhiệm và xuất sắc nhất của mình. Bởi trong thời đại AI, đa dạng năng lực và tận dụng sức mạnh thời cuộc chính là điều kiện tiên quyết để trường tồn.\nKhông ai biết trước ẩn sâu trong "lòng đất" của ngành công nghệ và thị trường hiện đại còn biết bao tầng "địa chất" bí ẩn. Chỉ biết rằng khi "Root Further" đã trở thành tinh thần cội rễ, chúng ta sẽ không sợ hãi, mà càng thấy háo hức trước bất cứ vùng vô định nào trên hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận đó, là bao điều kỳ diệu và cơ hội vươn mình đang chờ ta.`;

export default function RootFurtherContent() {
  return (
    <section
      id="root-further"
      style={{
        width: "100%",
        padding: "0 144px",
        boxSizing: "border-box",
      }}
    >
      {/* Outer card — 1152×1219, bg dark, border-radius 8, padding 120 104 */}
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1152px",
          width: "100%",
          borderRadius: "8px",
          padding: "120px 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Decorative ROOT FURTHER text — two-layer image stack */}
        {/* Group 434: 290×134, centered */}
        <div
          style={{
            position: "relative",
            width: "290px",
            height: "134px",
            flexShrink: 0,
          }}
        >
          {/* MM_MEDIA_Root Text — top half (189×67) */}
          <img
            src="/home/root-text.png"
            alt="ROOT"
            style={{
              position: "absolute",
              top: 0,
              left: "51px", // (290-189)/2 ≈ 50.5 => offset from group container
              width: "189px",
              height: "67px",
              objectFit: "contain",
            }}
          />
          {/* MM_MEDIA_Further Text — bottom half (290×67) */}
          <img
            src="/home/further-text.png"
            alt="FURTHER"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "290px",
              height: "67px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Content block — mms_B4_content */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {/* Body paragraph 1 */}
          <p
            style={{
              margin: 0,
              marginBottom: "32px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              textAlign: "justify",
              color: "rgba(255,255,255,1)",
              whiteSpace: "pre-line",
            }}
          >
            {BODY_TEXT_1}
          </p>

          {/* Quote */}
          <p
            style={{
              margin: 0,
              marginBottom: "32px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "32px",
              textAlign: "center",
              color: "rgba(255,255,255,1)",
              whiteSpace: "pre-line",
            }}
          >
            {QUOTE_TEXT}
          </p>

          {/* Body paragraph 2 */}
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              textAlign: "justify",
              color: "rgba(255,255,255,1)",
              whiteSpace: "pre-line",
            }}
          >
            {BODY_TEXT_2}
          </p>
        </div>
      </div>
    </section>
  );
}
