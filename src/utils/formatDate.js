const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);

    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) {
      return "Ngày không hợp lệ";
    }

    return date.toLocaleDateString("vi-VN", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Lỗi định dạng";
  }
};

export default formatDate;
