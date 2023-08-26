module.exports = (router) => {
  const path = require("path");
  const commonRoute = "/api/v1";
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");

  const uploadsDirectory = path.join(__dirname, "uploads");

  // API mở file ảnh hoặc video
  router.get("/uploads/:name", (req, res) => {
    console.log(req.params);
    const fileName = req.params.name;
    const options = {
      root: "uploads",
      headers: {
        "Content-Type": fileName.endsWith(".mp4") ? "video/mp4" : "image",
      },
    };
    res.sendFile(fileName, options, (err) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  });

  // API danh sách các chuyến chuyến đi
  router.post(`${commonRoute}/trip`, controller.tripCT);

  // API thêm chuyến đi
  router.post(`${commonRoute}/trip/create`, controller.tripCreateCT);

  // API thêm chuyến đi
  router.put(`${commonRoute}/trip/update`, controller.tripUpdateCT);

  // API xóa chuyến đi
  router.delete(`${commonRoute}/trip/delete?:ids`, controller.tripDeleteCT);
};
