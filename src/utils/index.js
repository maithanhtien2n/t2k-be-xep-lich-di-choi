const fs = require("fs");

const checkNull = (body, fields) => {
  const missingFields = [];
  fields.forEach((field) => {
    if (!body[field] || body[field].trim() === "") {
      missingFields.push(field);
    }
  });
  if (missingFields.length > 0) {
    throw {
      statusCode: 240,
      statusValue: "Lỗi code không kiểm tra null!",
    };
  }
};

module.exports = {
  onResponse: async (req, res, onModel, { checkData = [], data }) => {
    try {
      if (checkData[0]) checkNull(req.body, checkData);

      const response = await onModel(data);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        statusValue: "OK",
        data: response,
      });
    } catch (error) {
      return res.json({
        success: false,
        statusCode: error.statusCode ? error.statusCode : 204,
        statusValue: error.statusValue ? error.statusValue : error,
        data: null,
      });
    }
  },

  throwError: (statusCode, statusValue) => {
    throw {
      statusCode,
      statusValue,
    };
  },

  deleteFiles: (listFileName) => {
    listFileName.forEach((fileName) => {
      const filePath = path.resolve(`uploads/${fileName}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(`Không thể xóa tệp ${filePath}: ${err.message}`);
        } else {
          console.log(`Đã xóa tệp ${filePath}`);
        }
      });
    });
  },

  getFileName: (linkImage) =>
    `${linkImage.split("/")[linkImage.split("/").length - 1]}`,
};
